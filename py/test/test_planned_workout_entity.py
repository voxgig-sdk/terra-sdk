# PlannedWorkout entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from terra_sdk import TerraSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPlannedWorkoutEntity:

    def test_should_create_instance(self):
        testsdk = TerraSDK.test(None, None)
        ent = testsdk.PlannedWorkout(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "planned_workout": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = TerraSDK.test(seed, None)
        seen = list(base.PlannedWorkout(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = TerraSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.PlannedWorkout(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _planned_workout_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "planned_workout." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set TERRA_TEST_PLANNED_WORKOUT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        planned_workout_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.planned_workout")))
        planned_workout_ref01_data = None
        if len(planned_workout_ref01_data_raw) > 0:
            planned_workout_ref01_data = helpers.to_map(planned_workout_ref01_data_raw[0][1])

        # LIST
        planned_workout_ref01_ent = client.PlannedWorkout(None)
        planned_workout_ref01_match = {}

        planned_workout_ref01_list_result = planned_workout_ref01_ent.list(planned_workout_ref01_match, None)
        assert isinstance(planned_workout_ref01_list_result, list)

        # UPDATE
        planned_workout_ref01_data_up0_up = {
        }

        planned_workout_ref01_markdef_up0_name = "coercion_warnings"
        planned_workout_ref01_markdef_up0_value = "Mark01-planned_workout_ref01_" + str(setup["now"])
        planned_workout_ref01_data_up0_up[planned_workout_ref01_markdef_up0_name] = planned_workout_ref01_markdef_up0_value

        planned_workout_ref01_resdata_up0 = helpers.to_map(planned_workout_ref01_ent.update(planned_workout_ref01_data_up0_up, None))
        assert planned_workout_ref01_resdata_up0 is not None
        assert planned_workout_ref01_resdata_up0[planned_workout_ref01_markdef_up0_name] == planned_workout_ref01_markdef_up0_value

        # LOAD
        planned_workout_ref01_match_dt0 = {}
        planned_workout_ref01_data_dt0_loaded = planned_workout_ref01_ent.load(planned_workout_ref01_match_dt0, None)
        assert planned_workout_ref01_data_dt0_loaded is not None



def _planned_workout_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/planned_workout/PlannedWorkoutTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = TerraSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["planned_workout01", "planned_workout02", "planned_workout03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "TERRA_TEST_PLANNED_WORKOUT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "TERRA_TEST_PLANNED_WORKOUT_ENTID": idmap,
        "TERRA_TEST_LIVE": "FALSE",
        "TERRA_TEST_EXPLAIN": "FALSE",
        "TERRA_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("TERRA_TEST_PLANNED_WORKOUT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("TERRA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("TERRA_APIKEY"),
            },
            extra or {},
        ])
        client = TerraSDK(helpers.to_map(merged_opts))

    _live = env.get("TERRA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("TERRA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
