# Terra SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/secrets_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TerraFeatures
  def self.make_feature(name)
    case name
    when "base"
      TerraBaseFeature.new
    when "debug"
      TerraDebugFeature.new
    when "idempotency"
      TerraIdempotencyFeature.new
    when "metrics"
      TerraMetricsFeature.new
    when "paging"
      TerraPagingFeature.new
    when "ratelimit"
      TerraRatelimitFeature.new
    when "retry"
      TerraRetryFeature.new
    when "secrets"
      TerraSecretsFeature.new
    when "test"
      TerraTestFeature.new
    when "timeout"
      TerraTimeoutFeature.new
    else
      TerraBaseFeature.new
    end
  end
end
