# Terra SDK utility: make_context
require_relative '../core/context'
module TerraUtilities
  MakeContext = ->(ctxmap, basectx) {
    TerraContext.new(ctxmap, basectx)
  }
end
