# Terra SDK utility: prepare_body
require_relative 'media'
module TerraUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TerraUtilities.raw_body(ctx.reqdata) if TerraUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
