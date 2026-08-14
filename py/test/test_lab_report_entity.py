# LabReport entity test

import json
import os
import time

import pytest

from terra_sdk.utility.voxgig_struct import voxgig_struct as vs
from terra_sdk import TerraSDK
from terra_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestLabReportEntity:

    def test_should_create_instance(self):
        testsdk = TerraSDK.test(None, None)
        ent = testsdk.LabReport(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "lab_report": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = TerraSDK.test(seed, None)
        seen = list(base.LabReport(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from terra_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = TerraSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.LabReport(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _lab_report_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "lab_report." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set TERRA_TEST_LAB_REPORT_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        lab_report_ref01_ent = client.LabReport(None)
        lab_report_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.lab_report"), "lab_report_ref01"))

        lab_report_ref01_data = helpers.to_map(runner.entity_data(lab_report_ref01_ent.create(lab_report_ref01_data, None)))
        assert lab_report_ref01_data is not None

        # LIST
        lab_report_ref01_match = {}

        lab_report_ref01_list_result = lab_report_ref01_ent.list(lab_report_ref01_match, None)
        assert isinstance(lab_report_ref01_list_result, list)

        # LOAD
        lab_report_ref01_match_dt0 = {}
        lab_report_ref01_data_dt0_loaded = lab_report_ref01_ent.load(lab_report_ref01_match_dt0, None)
        assert lab_report_ref01_data_dt0_loaded is not None


        # LIST
        lab_report_ref01_match_rt0 = {}

        lab_report_ref01_list_rt0_result = lab_report_ref01_ent.list(lab_report_ref01_match_rt0, None)
        assert isinstance(lab_report_ref01_list_rt0_result, list)



def _lab_report_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/lab_report/LabReportTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = TerraSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["lab_report01", "lab_report02", "lab_report03"],
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
        "TERRA_TEST_LAB_REPORT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "TERRA_TEST_LAB_REPORT_ENTID": idmap,
        "TERRA_TEST_LIVE": "FALSE",
        "TERRA_TEST_EXPLAIN": "FALSE",
        "TERRA_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("TERRA_TEST_LAB_REPORT_ENTID"))
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
