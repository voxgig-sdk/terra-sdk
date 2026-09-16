# Terra SDK feature factory

from terra_sdk.feature.base_feature import TerraBaseFeature
from terra_sdk.feature.debug_feature import TerraDebugFeature
from terra_sdk.feature.idempotency_feature import TerraIdempotencyFeature
from terra_sdk.feature.metrics_feature import TerraMetricsFeature
from terra_sdk.feature.paging_feature import TerraPagingFeature
from terra_sdk.feature.ratelimit_feature import TerraRatelimitFeature
from terra_sdk.feature.retry_feature import TerraRetryFeature
from terra_sdk.feature.test_feature import TerraTestFeature
from terra_sdk.feature.timeout_feature import TerraTimeoutFeature


_FEATURES = {
    "base": lambda: TerraBaseFeature(),
    "debug": lambda: TerraDebugFeature(),
    "idempotency": lambda: TerraIdempotencyFeature(),
    "metrics": lambda: TerraMetricsFeature(),
    "paging": lambda: TerraPagingFeature(),
    "ratelimit": lambda: TerraRatelimitFeature(),
    "retry": lambda: TerraRetryFeature(),
    "test": lambda: TerraTestFeature(),
    "timeout": lambda: TerraTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
