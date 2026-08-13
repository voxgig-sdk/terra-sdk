<?php
declare(strict_types=1);

// PlannedWorkout entity test

require_once __DIR__ . '/../terra_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PlannedWorkoutEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TerraSDK::test(null, null);
        $ent = $testsdk->PlannedWorkout(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "planned_workout" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = TerraSDK::test($seed, null);
        $seen = iterator_to_array($base->PlannedWorkout(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = TerraConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = TerraSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->PlannedWorkout(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = planned_workout_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "planned_workout." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TERRA_TEST_PLANNED_WORKOUT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $planned_workout_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.planned_workout")));
        $planned_workout_ref01_data = null;
        if (count($planned_workout_ref01_data_raw) > 0) {
            $planned_workout_ref01_data = Helpers::to_map($planned_workout_ref01_data_raw[0][1]);
        }

        // LIST
        $planned_workout_ref01_ent = $client->PlannedWorkout(null);
        $planned_workout_ref01_match = [];

        $planned_workout_ref01_list_result = $planned_workout_ref01_ent->list($planned_workout_ref01_match, null);
        $this->assertIsArray($planned_workout_ref01_list_result);

        // UPDATE
        $planned_workout_ref01_data_up0_up = [
        ];

        $planned_workout_ref01_markdef_up0_name = "coercion_warnings";
        $planned_workout_ref01_markdef_up0_value = "Mark01-planned_workout_ref01_" . $setup["now"];
        $planned_workout_ref01_data_up0_up[$planned_workout_ref01_markdef_up0_name] = $planned_workout_ref01_markdef_up0_value;

        $planned_workout_ref01_resdata_up0_result = $planned_workout_ref01_ent->update($planned_workout_ref01_data_up0_up, null);
        $planned_workout_ref01_resdata_up0 = Helpers::to_map(is_object($planned_workout_ref01_resdata_up0_result) && method_exists($planned_workout_ref01_resdata_up0_result, 'data_get') ? $planned_workout_ref01_resdata_up0_result->data_get() : $planned_workout_ref01_resdata_up0_result);
        $this->assertNotNull($planned_workout_ref01_resdata_up0);
        $this->assertEquals($planned_workout_ref01_resdata_up0[$planned_workout_ref01_markdef_up0_name], $planned_workout_ref01_markdef_up0_value);

        // LOAD
        $planned_workout_ref01_match_dt0 = [];
        $planned_workout_ref01_data_dt0_loaded = $planned_workout_ref01_ent->load($planned_workout_ref01_match_dt0, null);
        $this->assertNotNull($planned_workout_ref01_data_dt0_loaded);

    }
}

function planned_workout_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/planned_workout/PlannedWorkoutTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TerraSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["planned_workout01", "planned_workout02", "planned_workout03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TERRA_TEST_PLANNED_WORKOUT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TERRA_TEST_PLANNED_WORKOUT_ENTID" => $idmap,
        "TERRA_TEST_LIVE" => "FALSE",
        "TERRA_TEST_EXPLAIN" => "FALSE",
        "TERRA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TERRA_TEST_PLANNED_WORKOUT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TERRA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["TERRA_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new TerraSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["TERRA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["TERRA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
