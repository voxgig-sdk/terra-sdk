# Terra SDK utility: make_context

from projectname_sdk.core.context import TerraContext


def make_context_util(ctxmap, basectx):
    return TerraContext(ctxmap, basectx)
