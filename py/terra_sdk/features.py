# Terra SDK feature factory

from terra_sdk.feature.base_feature import TerraBaseFeature
from terra_sdk.feature.test_feature import TerraTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TerraBaseFeature(),
        "test": lambda: TerraTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
