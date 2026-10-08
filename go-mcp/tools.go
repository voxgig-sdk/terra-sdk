package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/terra-sdk/go"
)

// ListArgs is what an agent sends to terra_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: integration | lab_report | lab_report_delivery | lab_report_file | lab_report_session | planned_workout | user | workout"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to terra_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: activity | athlete | body | daily | lab_report | lab_report_session | menstruation | nutrition | planned_workout | sleep | user | workout"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.TerraSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "terra_list",
		Description: "List records from Terra. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("integration", "lab_report", "lab_report_delivery", "lab_report_file", "lab_report_session", "planned_workout", "user", "workout"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "terra_load",
		Description: "Load one record from Terra. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("activity", "athlete", "body", "daily", "lab_report", "lab_report_session", "menstruation", "nutrition", "planned_workout", "sleep", "user", "workout"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.TerraSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.TerraSDK, name string) (sdk.TerraEntity, error) {
	switch strings.ToLower(name) {
	case "activity":
		return client.Activity(nil), nil
	case "athlete":
		return client.Athlete(nil), nil
	case "authentication":
		return client.Authentication(nil), nil
	case "body":
		return client.Body(nil), nil
	case "bulk_user_info":
		return client.BulkUserInfo(nil), nil
	case "daily":
		return client.Daily(nil), nil
	case "integration":
		return client.Integration(nil), nil
	case "lab_report":
		return client.LabReport(nil), nil
	case "lab_report_delivery":
		return client.LabReportDelivery(nil), nil
	case "lab_report_file":
		return client.LabReportFile(nil), nil
	case "lab_report_session":
		return client.LabReportSession(nil), nil
	case "menstruation":
		return client.Menstruation(nil), nil
	case "nutrition":
		return client.Nutrition(nil), nil
	case "planned_workout":
		return client.PlannedWorkout(nil), nil
	case "sleep":
		return client.Sleep(nil), nil
	case "user":
		return client.User(nil), nil
	case "workout":
		return client.Workout(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
