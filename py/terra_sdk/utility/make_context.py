# Terra SDK utility: make_context

from terra_sdk.core.context import TerraContext


def make_context_util(ctxmap, basectx):
    return TerraContext(ctxmap, basectx)
