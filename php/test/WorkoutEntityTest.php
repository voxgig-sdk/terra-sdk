<?php
declare(strict_types=1);

// Workout entity test

require_once __DIR__ . '/../terra_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WorkoutEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TerraSDK::test(null, null);
        $ent = $testsdk->Workout(null);
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
                "workout" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = TerraSDK::test($seed, null);
        $seen = iterator_to_array($base->Workout(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = TerraConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = TerraSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Workout(null)->stream("list", null, null) as $item) {
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
        $setup = workout_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "workout." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TERRA_TEST_WORKOUT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $workout_ref01_ent = $client->Workout(null);
        $workout_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.workout"), "workout_ref01"));

        $workout_ref01_data_result = $workout_ref01_ent->create($workout_ref01_data, null);
        $workout_ref01_data = Helpers::to_map(is_object($workout_ref01_data_result) && method_exists($workout_ref01_data_result, 'data_get') ? $workout_ref01_data_result->data_get() : $workout_ref01_data_result);
        $this->assertNotNull($workout_ref01_data);

        // LIST
        $workout_ref01_match = [];

        $workout_ref01_list_result = $workout_ref01_ent->list($workout_ref01_match, null);
        $this->assertIsArray($workout_ref01_list_result);

        // LOAD
        $workout_ref01_match_dt0 = [];
        $workout_ref01_data_dt0_loaded = $workout_ref01_ent->load($workout_ref01_match_dt0, null);
        $this->assertNotNull($workout_ref01_data_dt0_loaded);


        // LIST
        $workout_ref01_match_rt0 = [];

        $workout_ref01_list_rt0_result = $workout_ref01_ent->list($workout_ref01_match_rt0, null);
        $this->assertIsArray($workout_ref01_list_rt0_result);

    }
}

function workout_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/workout/WorkoutTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TerraSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["workout01", "workout02", "workout03", "planned_workout01", "planned_workout02", "planned_workout03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TERRA_TEST_WORKOUT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TERRA_TEST_WORKOUT_ENTID" => $idmap,
        "TERRA_TEST_LIVE" => "FALSE",
        "TERRA_TEST_EXPLAIN" => "FALSE",
        "TERRA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TERRA_TEST_WORKOUT_ENTID"]);
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
