# LabReport entity test

require "minitest/autorun"
require "json"
require_relative "../Terra_sdk"
require_relative "runner"

class LabReportEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = TerraSDK.test(nil, nil)
    ent = testsdk.LabReport(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = TerraConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = TerraSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.LabReport(nil).load({ "cursor" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = lab_report_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "lab_report." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    lab_report_ref01_ent = client.LabReport(nil)
    lab_report_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.lab_report"), "lab_report_ref01"))

    lab_report_ref01_data_result = lab_report_ref01_ent.create(lab_report_ref01_data, nil)
    lab_report_ref01_data = Helpers.to_map(lab_report_ref01_data_result.respond_to?(:data_get) ? lab_report_ref01_data_result.data_get : lab_report_ref01_data_result)
    assert !lab_report_ref01_data.nil?
    assert !lab_report_ref01_data["id"].nil?

    # LOAD
    lab_report_ref01_match_dt0 = {
      "id" => lab_report_ref01_data["id"],
    }
    lab_report_ref01_data_dt0_loaded = lab_report_ref01_ent.load(lab_report_ref01_match_dt0, nil)
    lab_report_ref01_data_dt0_load_result = Helpers.to_map(lab_report_ref01_data_dt0_loaded.respond_to?(:data_get) ? lab_report_ref01_data_dt0_loaded.data_get : lab_report_ref01_data_dt0_loaded)
    assert !lab_report_ref01_data_dt0_load_result.nil?
    assert_equal lab_report_ref01_data_dt0_load_result["id"], lab_report_ref01_data["id"]

    # REMOVE
    lab_report_ref01_match_rm0 = {
      "id" => lab_report_ref01_data["id"],
    }
    lab_report_ref01_ent.remove(lab_report_ref01_match_rm0, nil)

  end
end

def lab_report_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "lab_report", "LabReportTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TerraSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["lab_report01", "lab_report02", "lab_report03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["TERRA_TEST_LAB_REPORT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TERRA_TEST_LAB_REPORT_ENTID" => idmap,
    "TERRA_TEST_LIVE" => "FALSE",
    "TERRA_TEST_EXPLAIN" => "FALSE",
    "TERRA_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["TERRA_TEST_LAB_REPORT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TERRA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["TERRA_APIKEY"],
      },
      extra || {},
    ])
    client = TerraSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TERRA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TERRA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
