package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/terra-sdk/go"
	"github.com/voxgig-sdk/terra-sdk/go/core"

	vs "github.com/voxgig-sdk/terra-sdk/go/utility/struct"
)

func TestPlannedWorkoutEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PlannedWorkout(nil)
		if ent == nil {
			t.Fatal("expected non-nil PlannedWorkoutEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"planned_workout": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.PlannedWorkout(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.PlannedWorkout(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := planned_workoutBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "planned_workout." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TERRA_TEST_PLANNED_WORKOUT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		plannedWorkoutRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.planned_workout", setup.data)))
		var plannedWorkoutRef01Data map[string]any
		if len(plannedWorkoutRef01DataRaw) > 0 {
			plannedWorkoutRef01Data = core.ToMapAny(plannedWorkoutRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = plannedWorkoutRef01Data

		// LIST
		plannedWorkoutRef01Ent := client.PlannedWorkout(nil)
		plannedWorkoutRef01Match := map[string]any{}

		plannedWorkoutRef01ListResult, err := plannedWorkoutRef01Ent.List(plannedWorkoutRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, plannedWorkoutRef01ListOk := plannedWorkoutRef01ListResult.([]any)
		if !plannedWorkoutRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", plannedWorkoutRef01ListResult)
		}

		// UPDATE
		plannedWorkoutRef01DataUp0Up := map[string]any{
		}

		plannedWorkoutRef01MarkdefUp0Name := "coercion_warnings"
		plannedWorkoutRef01MarkdefUp0Value := fmt.Sprintf("Mark01-planned_workout_ref01_%d", setup.now)
		plannedWorkoutRef01DataUp0Up[plannedWorkoutRef01MarkdefUp0Name] = plannedWorkoutRef01MarkdefUp0Value

		plannedWorkoutRef01ResdataUp0Result, err := plannedWorkoutRef01Ent.Update(plannedWorkoutRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		plannedWorkoutRef01ResdataUp0 := core.ToMapAny(entityData(plannedWorkoutRef01ResdataUp0Result))
		if plannedWorkoutRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if plannedWorkoutRef01ResdataUp0[plannedWorkoutRef01MarkdefUp0Name] != plannedWorkoutRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", plannedWorkoutRef01MarkdefUp0Name, plannedWorkoutRef01ResdataUp0[plannedWorkoutRef01MarkdefUp0Name])
		}

		// LOAD
		plannedWorkoutRef01MatchDt0 := map[string]any{}
		plannedWorkoutRef01DataDt0Loaded, err := plannedWorkoutRef01Ent.Load(plannedWorkoutRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if plannedWorkoutRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func planned_workoutBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "planned_workout", "PlannedWorkoutTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read planned_workout test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse planned_workout test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"planned_workout01", "planned_workout02", "planned_workout03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TERRA_TEST_PLANNED_WORKOUT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TERRA_TEST_PLANNED_WORKOUT_ENTID": idmap,
		"TERRA_TEST_LIVE":      "FALSE",
		"TERRA_TEST_EXPLAIN":   "FALSE",
		"TERRA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TERRA_TEST_PLANNED_WORKOUT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TERRA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TERRA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTerraSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TERRA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TERRA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
