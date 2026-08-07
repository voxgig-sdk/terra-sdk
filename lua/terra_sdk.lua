-- Terra SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("terra_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local TerraSDK = {}
TerraSDK.__index = TerraSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

TerraSDK._make_feature = _make_feature


function TerraSDK.new(options)
  local self = setmetatable({}, TerraSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: test


  return self
end


function TerraSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function TerraSDK:get_utility()
  return Utility.copy(self._utility)
end


function TerraSDK:get_root_ctx()
  return self._rootctx
end


function TerraSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function TerraSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Activity():list() / client:Activity():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Activity(data)
  local EntityMod = require("entity.activity_entity")
  if data == nil then
    if self._activity == nil then
      self._activity = EntityMod.new(self, nil)
    end
    return self._activity
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Athlete():list() / client:Athlete():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Athlete(data)
  local EntityMod = require("entity.athlete_entity")
  if data == nil then
    if self._athlete == nil then
      self._athlete = EntityMod.new(self, nil)
    end
    return self._athlete
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Authentication():list() / client:Authentication():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Authentication(data)
  local EntityMod = require("entity.authentication_entity")
  if data == nil then
    if self._authentication == nil then
      self._authentication = EntityMod.new(self, nil)
    end
    return self._authentication
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Body():list() / client:Body():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Body(data)
  local EntityMod = require("entity.body_entity")
  if data == nil then
    if self._body == nil then
      self._body = EntityMod.new(self, nil)
    end
    return self._body
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BulkUserInfo():list() / client:BulkUserInfo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:BulkUserInfo(data)
  local EntityMod = require("entity.bulk_user_info_entity")
  if data == nil then
    if self._bulk_user_info == nil then
      self._bulk_user_info = EntityMod.new(self, nil)
    end
    return self._bulk_user_info
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Daily():list() / client:Daily():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Daily(data)
  local EntityMod = require("entity.daily_entity")
  if data == nil then
    if self._daily == nil then
      self._daily = EntityMod.new(self, nil)
    end
    return self._daily
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Integration():list() / client:Integration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Integration(data)
  local EntityMod = require("entity.integration_entity")
  if data == nil then
    if self._integration == nil then
      self._integration = EntityMod.new(self, nil)
    end
    return self._integration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LabReport():list() / client:LabReport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:LabReport(data)
  local EntityMod = require("entity.lab_report_entity")
  if data == nil then
    if self._lab_report == nil then
      self._lab_report = EntityMod.new(self, nil)
    end
    return self._lab_report
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LabReportDelivery():list() / client:LabReportDelivery():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:LabReportDelivery(data)
  local EntityMod = require("entity.lab_report_delivery_entity")
  if data == nil then
    if self._lab_report_delivery == nil then
      self._lab_report_delivery = EntityMod.new(self, nil)
    end
    return self._lab_report_delivery
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LabReportFile():list() / client:LabReportFile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:LabReportFile(data)
  local EntityMod = require("entity.lab_report_file_entity")
  if data == nil then
    if self._lab_report_file == nil then
      self._lab_report_file = EntityMod.new(self, nil)
    end
    return self._lab_report_file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Menstruation():list() / client:Menstruation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Menstruation(data)
  local EntityMod = require("entity.menstruation_entity")
  if data == nil then
    if self._menstruation == nil then
      self._menstruation = EntityMod.new(self, nil)
    end
    return self._menstruation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Nutrition():list() / client:Nutrition():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Nutrition(data)
  local EntityMod = require("entity.nutrition_entity")
  if data == nil then
    if self._nutrition == nil then
      self._nutrition = EntityMod.new(self, nil)
    end
    return self._nutrition
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PlannedWorkout():list() / client:PlannedWorkout():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:PlannedWorkout(data)
  local EntityMod = require("entity.planned_workout_entity")
  if data == nil then
    if self._planned_workout == nil then
      self._planned_workout = EntityMod.new(self, nil)
    end
    return self._planned_workout
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Sleep():list() / client:Sleep():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Sleep(data)
  local EntityMod = require("entity.sleep_entity")
  if data == nil then
    if self._sleep == nil then
      self._sleep = EntityMod.new(self, nil)
    end
    return self._sleep
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:User():list() / client:User():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:User(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Workout():list() / client:Workout():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function TerraSDK:Workout(data)
  local EntityMod = require("entity.workout_entity")
  if data == nil then
    if self._workout == nil then
      self._workout = EntityMod.new(self, nil)
    end
    return self._workout
  end
  return EntityMod.new(self, data)
end




function TerraSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = TerraSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return TerraSDK
