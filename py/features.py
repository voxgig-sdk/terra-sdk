# Terra SDK feature factory

from feature.base_feature import TerraBaseFeature
from feature.test_feature import TerraTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TerraBaseFeature(),
        "test": lambda: TerraTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
