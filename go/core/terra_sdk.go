package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/terra-sdk/go/utility/struct"
)

type TerraSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewTerraSDK(options map[string]any) *TerraSDK {
	sdk := &TerraSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *TerraSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *TerraSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *TerraSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *TerraSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *TerraSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *TerraSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *TerraSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("TerraSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *TerraSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// Raw GraphQL access: the pressure valve that makes the generated surface's
// deliberate omissions (per-call selection sets, typed filter builders,
// batching, subscriptions) livable — the whole schema stays reachable.
//
// Thin wrapper over the same prepare/fetch path Direct uses, with the one
// thing raw Direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
// as a top-level `errors` array, so status alone would report a failed query
// as ok.
//
// NOTE: like Direct, this bypasses the feature pipeline — no retry,
// ratelimit or paging features apply.
func (sdk *TerraSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath([]any{"data", "errors"}, res).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("TerraSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Activity returns a Activity entity bound to this client.
// Idiomatic usage: client.Activity(nil).List(nil, nil) or
// client.Activity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Activity(data map[string]any) TerraEntity {
	return NewActivityEntityFunc(sdk, data)
}


// Athlete returns a Athlete entity bound to this client.
// Idiomatic usage: client.Athlete(nil).List(nil, nil) or
// client.Athlete(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Athlete(data map[string]any) TerraEntity {
	return NewAthleteEntityFunc(sdk, data)
}


// Authentication returns a Authentication entity bound to this client.
// Idiomatic usage: client.Authentication(nil).List(nil, nil) or
// client.Authentication(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Authentication(data map[string]any) TerraEntity {
	return NewAuthenticationEntityFunc(sdk, data)
}


// Body returns a Body entity bound to this client.
// Idiomatic usage: client.Body(nil).List(nil, nil) or
// client.Body(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Body(data map[string]any) TerraEntity {
	return NewBodyEntityFunc(sdk, data)
}


// BulkUserInfo returns a BulkUserInfo entity bound to this client.
// Idiomatic usage: client.BulkUserInfo(nil).List(nil, nil) or
// client.BulkUserInfo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) BulkUserInfo(data map[string]any) TerraEntity {
	return NewBulkUserInfoEntityFunc(sdk, data)
}


// Daily returns a Daily entity bound to this client.
// Idiomatic usage: client.Daily(nil).List(nil, nil) or
// client.Daily(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Daily(data map[string]any) TerraEntity {
	return NewDailyEntityFunc(sdk, data)
}


// Integration returns a Integration entity bound to this client.
// Idiomatic usage: client.Integration(nil).List(nil, nil) or
// client.Integration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Integration(data map[string]any) TerraEntity {
	return NewIntegrationEntityFunc(sdk, data)
}


// LabReport returns a LabReport entity bound to this client.
// Idiomatic usage: client.LabReport(nil).List(nil, nil) or
// client.LabReport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) LabReport(data map[string]any) TerraEntity {
	return NewLabReportEntityFunc(sdk, data)
}


// LabReportDelivery returns a LabReportDelivery entity bound to this client.
// Idiomatic usage: client.LabReportDelivery(nil).List(nil, nil) or
// client.LabReportDelivery(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) LabReportDelivery(data map[string]any) TerraEntity {
	return NewLabReportDeliveryEntityFunc(sdk, data)
}


// LabReportFile returns a LabReportFile entity bound to this client.
// Idiomatic usage: client.LabReportFile(nil).List(nil, nil) or
// client.LabReportFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) LabReportFile(data map[string]any) TerraEntity {
	return NewLabReportFileEntityFunc(sdk, data)
}


// Menstruation returns a Menstruation entity bound to this client.
// Idiomatic usage: client.Menstruation(nil).List(nil, nil) or
// client.Menstruation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Menstruation(data map[string]any) TerraEntity {
	return NewMenstruationEntityFunc(sdk, data)
}


// Nutrition returns a Nutrition entity bound to this client.
// Idiomatic usage: client.Nutrition(nil).List(nil, nil) or
// client.Nutrition(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Nutrition(data map[string]any) TerraEntity {
	return NewNutritionEntityFunc(sdk, data)
}


// PlannedWorkout returns a PlannedWorkout entity bound to this client.
// Idiomatic usage: client.PlannedWorkout(nil).List(nil, nil) or
// client.PlannedWorkout(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) PlannedWorkout(data map[string]any) TerraEntity {
	return NewPlannedWorkoutEntityFunc(sdk, data)
}


// Sleep returns a Sleep entity bound to this client.
// Idiomatic usage: client.Sleep(nil).List(nil, nil) or
// client.Sleep(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Sleep(data map[string]any) TerraEntity {
	return NewSleepEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) User(data map[string]any) TerraEntity {
	return NewUserEntityFunc(sdk, data)
}


// Workout returns a Workout entity bound to this client.
// Idiomatic usage: client.Workout(nil).List(nil, nil) or
// client.Workout(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *TerraSDK) Workout(data map[string]any) TerraEntity {
	return NewWorkoutEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *TerraSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewTerraSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
