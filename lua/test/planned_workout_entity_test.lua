-- PlannedWorkout entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("terra_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("PlannedWorkoutEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:PlannedWorkout(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["planned_workout"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:PlannedWorkout(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:PlannedWorkout(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = planned_workout_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "planned_workout." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set TERRA_TEST_PLANNED_WORKOUT_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local planned_workout_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.planned_workout")))
    local planned_workout_ref01_data = nil
    if #planned_workout_ref01_data_raw > 0 then
      planned_workout_ref01_data = helpers.to_map(planned_workout_ref01_data_raw[1][2])
    end

    -- LIST
    local planned_workout_ref01_ent = client:PlannedWorkout(nil)
    local planned_workout_ref01_match = {}

    local planned_workout_ref01_list_result, err = planned_workout_ref01_ent:list(planned_workout_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(planned_workout_ref01_list_result)

    -- UPDATE
    local planned_workout_ref01_data_up0_up = {
    }

    local planned_workout_ref01_markdef_up0_name = "coercion_warnings"
    local planned_workout_ref01_markdef_up0_value = "Mark01-planned_workout_ref01_" .. tostring(setup.now)
    planned_workout_ref01_data_up0_up[planned_workout_ref01_markdef_up0_name] = planned_workout_ref01_markdef_up0_value

    local planned_workout_ref01_resdata_up0_result, err = planned_workout_ref01_ent:update(planned_workout_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local planned_workout_ref01_resdata_up0 = helpers.to_map(type(planned_workout_ref01_resdata_up0_result) == 'table' and planned_workout_ref01_resdata_up0_result.data_get and planned_workout_ref01_resdata_up0_result:data_get() or planned_workout_ref01_resdata_up0_result)
    assert.is_not_nil(planned_workout_ref01_resdata_up0)
    assert.are.equal(planned_workout_ref01_resdata_up0[planned_workout_ref01_markdef_up0_name], planned_workout_ref01_markdef_up0_value)

    -- LOAD
    local planned_workout_ref01_match_dt0 = {}
    local planned_workout_ref01_data_dt0_loaded, err = planned_workout_ref01_ent:load(planned_workout_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(planned_workout_ref01_data_dt0_loaded)

  end)
end)

function planned_workout_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/planned_workout/PlannedWorkoutTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read planned_workout test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "planned_workout01", "planned_workout02", "planned_workout03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("TERRA_TEST_PLANNED_WORKOUT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["TERRA_TEST_PLANNED_WORKOUT_ENTID"] = idmap,
    ["TERRA_TEST_LIVE"] = "FALSE",
    ["TERRA_TEST_EXPLAIN"] = "FALSE",
    ["TERRA_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["TERRA_TEST_PLANNED_WORKOUT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["TERRA_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["TERRA_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["TERRA_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["TERRA_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
