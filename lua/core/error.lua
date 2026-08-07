-- Terra SDK error

local TerraError = {}
TerraError.__index = TerraError


function TerraError.new(code, msg, ctx)
  local self = setmetatable({}, TerraError)
  self.is_sdk_error = true
  self.sdk = "Terra"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TerraError:error()
  return self.msg
end


function TerraError:__tostring()
  return self.msg
end


return TerraError
