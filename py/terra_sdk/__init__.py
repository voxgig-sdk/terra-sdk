# Terra SDK

from terra_sdk.utility.voxgig_struct import voxgig_struct as vs
from terra_sdk.core.utility_type import TerraUtility
from terra_sdk.core.spec import TerraSpec
from terra_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from terra_sdk.utility import register

# Load features
from terra_sdk.feature.base_feature import TerraBaseFeature
from terra_sdk.features import _make_feature


class TerraSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = TerraUtility()
        self._utility = utility

        from terra_sdk.config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return TerraUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = TerraSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "TerraSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("TerraSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Activity(self, data=None) -> "ActivityEntity":
        """Entity factory: client.Activity().list() / client.Activity().load({"id": ...})."""
        from terra_sdk.entity.activity_entity import ActivityEntity
        return ActivityEntity(self, data)


    def Athlete(self, data=None) -> "AthleteEntity":
        """Entity factory: client.Athlete().list() / client.Athlete().load({"id": ...})."""
        from terra_sdk.entity.athlete_entity import AthleteEntity
        return AthleteEntity(self, data)


    def Authentication(self, data=None) -> "AuthenticationEntity":
        """Entity factory: client.Authentication().list() / client.Authentication().load({"id": ...})."""
        from terra_sdk.entity.authentication_entity import AuthenticationEntity
        return AuthenticationEntity(self, data)


    def Body(self, data=None) -> "BodyEntity":
        """Entity factory: client.Body().list() / client.Body().load({"id": ...})."""
        from terra_sdk.entity.body_entity import BodyEntity
        return BodyEntity(self, data)


    def BulkUserInfo(self, data=None) -> "BulkUserInfoEntity":
        """Entity factory: client.BulkUserInfo().list() / client.BulkUserInfo().load({"id": ...})."""
        from terra_sdk.entity.bulk_user_info_entity import BulkUserInfoEntity
        return BulkUserInfoEntity(self, data)


    def Daily(self, data=None) -> "DailyEntity":
        """Entity factory: client.Daily().list() / client.Daily().load({"id": ...})."""
        from terra_sdk.entity.daily_entity import DailyEntity
        return DailyEntity(self, data)


    def Integration(self, data=None) -> "IntegrationEntity":
        """Entity factory: client.Integration().list() / client.Integration().load({"id": ...})."""
        from terra_sdk.entity.integration_entity import IntegrationEntity
        return IntegrationEntity(self, data)


    def LabReport(self, data=None) -> "LabReportEntity":
        """Entity factory: client.LabReport().list() / client.LabReport().load({"id": ...})."""
        from terra_sdk.entity.lab_report_entity import LabReportEntity
        return LabReportEntity(self, data)


    def LabReportDelivery(self, data=None) -> "LabReportDeliveryEntity":
        """Entity factory: client.LabReportDelivery().list() / client.LabReportDelivery().load({"id": ...})."""
        from terra_sdk.entity.lab_report_delivery_entity import LabReportDeliveryEntity
        return LabReportDeliveryEntity(self, data)


    def LabReportFile(self, data=None) -> "LabReportFileEntity":
        """Entity factory: client.LabReportFile().list() / client.LabReportFile().load({"id": ...})."""
        from terra_sdk.entity.lab_report_file_entity import LabReportFileEntity
        return LabReportFileEntity(self, data)


    def Menstruation(self, data=None) -> "MenstruationEntity":
        """Entity factory: client.Menstruation().list() / client.Menstruation().load({"id": ...})."""
        from terra_sdk.entity.menstruation_entity import MenstruationEntity
        return MenstruationEntity(self, data)


    def Nutrition(self, data=None) -> "NutritionEntity":
        """Entity factory: client.Nutrition().list() / client.Nutrition().load({"id": ...})."""
        from terra_sdk.entity.nutrition_entity import NutritionEntity
        return NutritionEntity(self, data)


    def PlannedWorkout(self, data=None) -> "PlannedWorkoutEntity":
        """Entity factory: client.PlannedWorkout().list() / client.PlannedWorkout().load({"id": ...})."""
        from terra_sdk.entity.planned_workout_entity import PlannedWorkoutEntity
        return PlannedWorkoutEntity(self, data)


    def Sleep(self, data=None) -> "SleepEntity":
        """Entity factory: client.Sleep().list() / client.Sleep().load({"id": ...})."""
        from terra_sdk.entity.sleep_entity import SleepEntity
        return SleepEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from terra_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)


    def Workout(self, data=None) -> "WorkoutEntity":
        """Entity factory: client.Workout().list() / client.Workout().load({"id": ...})."""
        from terra_sdk.entity.workout_entity import WorkoutEntity
        return WorkoutEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "TerraSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from terra_sdk.entity.activity_entity import ActivityEntity
    from terra_sdk.entity.athlete_entity import AthleteEntity
    from terra_sdk.entity.authentication_entity import AuthenticationEntity
    from terra_sdk.entity.body_entity import BodyEntity
    from terra_sdk.entity.bulk_user_info_entity import BulkUserInfoEntity
    from terra_sdk.entity.daily_entity import DailyEntity
    from terra_sdk.entity.integration_entity import IntegrationEntity
    from terra_sdk.entity.lab_report_entity import LabReportEntity
    from terra_sdk.entity.lab_report_delivery_entity import LabReportDeliveryEntity
    from terra_sdk.entity.lab_report_file_entity import LabReportFileEntity
    from terra_sdk.entity.menstruation_entity import MenstruationEntity
    from terra_sdk.entity.nutrition_entity import NutritionEntity
    from terra_sdk.entity.planned_workout_entity import PlannedWorkoutEntity
    from terra_sdk.entity.sleep_entity import SleepEntity
    from terra_sdk.entity.user_entity import UserEntity
    from terra_sdk.entity.workout_entity import WorkoutEntity
