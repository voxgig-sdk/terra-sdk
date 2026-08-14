<?php
declare(strict_types=1);

// Terra SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class TerraSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new TerraUtility();
        $this->_utility = $utility;

        $config = TerraConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = TerraHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = TerraHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, TerraFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return TerraUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = TerraHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = TerraHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = TerraHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new TerraSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new TerraError($op . "_allow",
                "TerraSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = TerraHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = TerraHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new TerraError("graphql_error",
                "TerraSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_activity = null;

    // Canonical facade: $client->Activity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->activity()
    // resolves here too.
    public function Activity($data = null)
    {
        require_once __DIR__ . '/entity/activity_entity.php';
        if ($data === null) {
            if ($this->_activity === null) {
                $this->_activity = new ActivityEntity($this, null);
            }
            return $this->_activity;
        }
        return new ActivityEntity($this, $data);
    }


    private $_athlete = null;

    // Canonical facade: $client->Athlete()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->athlete()
    // resolves here too.
    public function Athlete($data = null)
    {
        require_once __DIR__ . '/entity/athlete_entity.php';
        if ($data === null) {
            if ($this->_athlete === null) {
                $this->_athlete = new AthleteEntity($this, null);
            }
            return $this->_athlete;
        }
        return new AthleteEntity($this, $data);
    }


    private $_authentication = null;

    // Canonical facade: $client->Authentication()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->authentication()
    // resolves here too.
    public function Authentication($data = null)
    {
        require_once __DIR__ . '/entity/authentication_entity.php';
        if ($data === null) {
            if ($this->_authentication === null) {
                $this->_authentication = new AuthenticationEntity($this, null);
            }
            return $this->_authentication;
        }
        return new AuthenticationEntity($this, $data);
    }


    private $_body = null;

    // Canonical facade: $client->Body()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->body()
    // resolves here too.
    public function Body($data = null)
    {
        require_once __DIR__ . '/entity/body_entity.php';
        if ($data === null) {
            if ($this->_body === null) {
                $this->_body = new BodyEntity($this, null);
            }
            return $this->_body;
        }
        return new BodyEntity($this, $data);
    }


    private $_bulk_user_info = null;

    // Canonical facade: $client->BulkUserInfo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bulk_user_info()
    // resolves here too.
    public function BulkUserInfo($data = null)
    {
        require_once __DIR__ . '/entity/bulk_user_info_entity.php';
        if ($data === null) {
            if ($this->_bulk_user_info === null) {
                $this->_bulk_user_info = new BulkUserInfoEntity($this, null);
            }
            return $this->_bulk_user_info;
        }
        return new BulkUserInfoEntity($this, $data);
    }


    private $_daily = null;

    // Canonical facade: $client->Daily()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->daily()
    // resolves here too.
    public function Daily($data = null)
    {
        require_once __DIR__ . '/entity/daily_entity.php';
        if ($data === null) {
            if ($this->_daily === null) {
                $this->_daily = new DailyEntity($this, null);
            }
            return $this->_daily;
        }
        return new DailyEntity($this, $data);
    }


    private $_integration = null;

    // Canonical facade: $client->Integration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->integration()
    // resolves here too.
    public function Integration($data = null)
    {
        require_once __DIR__ . '/entity/integration_entity.php';
        if ($data === null) {
            if ($this->_integration === null) {
                $this->_integration = new IntegrationEntity($this, null);
            }
            return $this->_integration;
        }
        return new IntegrationEntity($this, $data);
    }


    private $_lab_report = null;

    // Canonical facade: $client->LabReport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lab_report()
    // resolves here too.
    public function LabReport($data = null)
    {
        require_once __DIR__ . '/entity/lab_report_entity.php';
        if ($data === null) {
            if ($this->_lab_report === null) {
                $this->_lab_report = new LabReportEntity($this, null);
            }
            return $this->_lab_report;
        }
        return new LabReportEntity($this, $data);
    }


    private $_lab_report_delivery = null;

    // Canonical facade: $client->LabReportDelivery()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lab_report_delivery()
    // resolves here too.
    public function LabReportDelivery($data = null)
    {
        require_once __DIR__ . '/entity/lab_report_delivery_entity.php';
        if ($data === null) {
            if ($this->_lab_report_delivery === null) {
                $this->_lab_report_delivery = new LabReportDeliveryEntity($this, null);
            }
            return $this->_lab_report_delivery;
        }
        return new LabReportDeliveryEntity($this, $data);
    }


    private $_lab_report_file = null;

    // Canonical facade: $client->LabReportFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lab_report_file()
    // resolves here too.
    public function LabReportFile($data = null)
    {
        require_once __DIR__ . '/entity/lab_report_file_entity.php';
        if ($data === null) {
            if ($this->_lab_report_file === null) {
                $this->_lab_report_file = new LabReportFileEntity($this, null);
            }
            return $this->_lab_report_file;
        }
        return new LabReportFileEntity($this, $data);
    }


    private $_menstruation = null;

    // Canonical facade: $client->Menstruation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->menstruation()
    // resolves here too.
    public function Menstruation($data = null)
    {
        require_once __DIR__ . '/entity/menstruation_entity.php';
        if ($data === null) {
            if ($this->_menstruation === null) {
                $this->_menstruation = new MenstruationEntity($this, null);
            }
            return $this->_menstruation;
        }
        return new MenstruationEntity($this, $data);
    }


    private $_nutrition = null;

    // Canonical facade: $client->Nutrition()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nutrition()
    // resolves here too.
    public function Nutrition($data = null)
    {
        require_once __DIR__ . '/entity/nutrition_entity.php';
        if ($data === null) {
            if ($this->_nutrition === null) {
                $this->_nutrition = new NutritionEntity($this, null);
            }
            return $this->_nutrition;
        }
        return new NutritionEntity($this, $data);
    }


    private $_planned_workout = null;

    // Canonical facade: $client->PlannedWorkout()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->planned_workout()
    // resolves here too.
    public function PlannedWorkout($data = null)
    {
        require_once __DIR__ . '/entity/planned_workout_entity.php';
        if ($data === null) {
            if ($this->_planned_workout === null) {
                $this->_planned_workout = new PlannedWorkoutEntity($this, null);
            }
            return $this->_planned_workout;
        }
        return new PlannedWorkoutEntity($this, $data);
    }


    private $_sleep = null;

    // Canonical facade: $client->Sleep()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sleep()
    // resolves here too.
    public function Sleep($data = null)
    {
        require_once __DIR__ . '/entity/sleep_entity.php';
        if ($data === null) {
            if ($this->_sleep === null) {
                $this->_sleep = new SleepEntity($this, null);
            }
            return $this->_sleep;
        }
        return new SleepEntity($this, $data);
    }


    private $_user = null;

    // Canonical facade: $client->User()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user()
    // resolves here too.
    public function User($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }


    private $_workout = null;

    // Canonical facade: $client->Workout()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->workout()
    // resolves here too.
    public function Workout($data = null)
    {
        require_once __DIR__ . '/entity/workout_entity.php';
        if ($data === null) {
            if ($this->_workout === null) {
                $this->_workout = new WorkoutEntity($this, null);
            }
            return $this->_workout;
        }
        return new WorkoutEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new TerraSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
