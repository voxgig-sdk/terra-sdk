# Terra Golang SDK



The Golang SDK for the Terra API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Activity(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/terra-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/terra-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/terra-sdk/go=../terra-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/terra-sdk/go"
)

func main() {
    client := sdk.NewTerraSDK(map[string]any{
        "apikey": os.Getenv("TERRA_APIKEY"),
    })

    // Load a single activity — the value is the loaded record.
    activity, err := client.Activity(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(activity)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
activity, err := client.Activity(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = activity
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

activity, err := client.Activity(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(activity) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewTerraSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TERRA_TEST_LIVE=TRUE
TERRA_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewTerraSDK

```go
func NewTerraSDK(options map[string]any) *TerraSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *TerraSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TerraSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Activity` | `(data map[string]any) TerraEntity` | Create an Activity entity instance. |
| `Athlete` | `(data map[string]any) TerraEntity` | Create an Athlete entity instance. |
| `Authentication` | `(data map[string]any) TerraEntity` | Create an Authentication entity instance. |
| `Body` | `(data map[string]any) TerraEntity` | Create a Body entity instance. |
| `BulkUserInfo` | `(data map[string]any) TerraEntity` | Create a BulkUserInfo entity instance. |
| `Daily` | `(data map[string]any) TerraEntity` | Create a Daily entity instance. |
| `Integration` | `(data map[string]any) TerraEntity` | Create an Integration entity instance. |
| `LabReport` | `(data map[string]any) TerraEntity` | Create a LabReport entity instance. |
| `LabReportDelivery` | `(data map[string]any) TerraEntity` | Create a LabReportDelivery entity instance. |
| `LabReportFile` | `(data map[string]any) TerraEntity` | Create a LabReportFile entity instance. |
| `Menstruation` | `(data map[string]any) TerraEntity` | Create a Menstruation entity instance. |
| `Nutrition` | `(data map[string]any) TerraEntity` | Create a Nutrition entity instance. |
| `PlannedWorkout` | `(data map[string]any) TerraEntity` | Create a PlannedWorkout entity instance. |
| `Sleep` | `(data map[string]any) TerraEntity` | Create a Sleep entity instance. |
| `User` | `(data map[string]any) TerraEntity` | Create an User entity instance. |
| `Workout` | `(data map[string]any) TerraEntity` | Create a Workout entity instance. |

### Entity interface (TerraEntity)

All entities implement the `TerraEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    activity, err := client.Activity(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // activity is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Activity

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/activity`

#### Athlete

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/athlete`

#### Authentication

| Field | Description |
| --- | --- |
| `"auth_failure_redirect_url"` |  |
| `"auth_success_redirect_url"` |  |
| `"auth_url"` |  |
| `"expires_in"` |  |
| `"language"` |  |
| `"provider"` |  |
| `"reference_id"` |  |
| `"session_id"` |  |
| `"status"` |  |
| `"token"` |  |
| `"url"` |  |
| `"user_id"` |  |

Operations: Create, Remove.

API path: `/auth/authenticateUser`

#### Body

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/body`

#### BulkUserInfo

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/bulkUserInfo`

#### Daily

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/daily`

#### Integration

| Field | Description |
| --- | --- |
| `"enabled"` |  |
| `"icon"` |  |
| `"name"` |  |
| `"provider"` |  |
| `"setup"` |  |
| `"type"` |  |

Operations: List.

API path: `/integrations/detailed`

#### LabReport

| Field | Description |
| --- | --- |
| `"collection_date"` |  |
| `"collection_time"` |  |
| `"current_status"` |  |
| `"file_count"` |  |
| `"input_bytes"` |  |
| `"lab_name"` |  |
| `"output_bytes"` |  |
| `"panel"` |  |
| `"patient_age_at_collection"` |  |
| `"patient_sex"` |  |
| `"reference_id"` |  |
| `"report_date"` |  |
| `"report_locale"` |  |
| `"report_notes"` |  |
| `"report_time"` |  |
| `"report_type"` |  |
| `"results"` |  |
| `"results_count"` |  |
| `"session_id"` |  |
| `"status_history"` |  |
| `"updated_at"` |  |
| `"upload_id"` |  |
| `"uploaded_at"` |  |

Operations: Create, List, Load, Remove.

API path: `/lab-reports`

#### LabReportDelivery

| Field | Description |
| --- | --- |
| `"attempt_count"` |  |
| `"destination_id"` |  |
| `"destination_type"` |  |
| `"last_error"` |  |
| `"status"` |  |

Operations: List.

API path: `/lab-reports/{session_id}/deliveries`

#### LabReportFile

| Field | Description |
| --- | --- |
| `"filename"` |  |
| `"presigned_url"` |  |

Operations: List.

API path: `/lab-reports/{session_id}/files`

#### Menstruation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/menstruation`

#### Nutrition

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/nutrition`

#### PlannedWorkout

| Field | Description |
| --- | --- |
| `"athlete_metrics"` |  |
| `"coercion_warnings"` |  |
| `"created_at"` |  |
| `"detail"` |  |
| `"is_external"` |  |
| `"last_updated_at"` |  |
| `"planned_date"` |  |
| `"planned_workout_id"` |  |
| `"provider_workout_id"` |  |
| `"workout_id"` |  |

Operations: List, Load, Update.

API path: `/plannedWorkouts`

#### Sleep

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/sleep`

#### User

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/subscriptions`

#### Workout

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"environment"` |  |
| `"estimated_calories"` |  |
| `"estimated_distance_meters"` |  |
| `"estimated_duration_seconds"` |  |
| `"ftp"` |  |
| `"max_heart_rate"` |  |
| `"name"` |  |
| `"planned_date"` |  |
| `"pool_length_meters"` |  |
| `"sport"` |  |
| `"status"` |  |
| `"step_blocks"` |  |
| `"threshold_heart_rate"` |  |
| `"threshold_speed"` |  |
| `"workout_id"` |  |

Operations: Create, List, Load, Remove.

API path: `/workouts/{workout_id}/plan`



## Entities


### Activity

Create an instance: `activity := client.Activity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
activity, err := client.Activity(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(activity) // the loaded record
```


### Athlete

Create an instance: `athlete := client.Athlete(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
athlete, err := client.Athlete(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(athlete) // the loaded record
```


### Authentication

Create an instance: `authentication := client.Authentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_failure_redirect_url` | `string` |  |
| `auth_success_redirect_url` | `string` |  |
| `auth_url` | `string` |  |
| `expires_in` | `int` |  |
| `language` | `string` |  |
| `provider` | `string` |  |
| `reference_id` | `string` |  |
| `session_id` | `string` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `url` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Body

Create an instance: `body := client.Body(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
body, err := client.Body(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(body) // the loaded record
```


### BulkUserInfo

Create an instance: `bulkUserInfo := client.BulkUserInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.BulkUserInfo(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Daily

Create an instance: `daily := client.Daily(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
daily, err := client.Daily(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(daily) // the loaded record
```


### Integration

Create an instance: `integration := client.Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |
| `icon` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `setup` | `string` |  |
| `type` | `map[string]any` |  |

#### Example: List

```go
integrations, err := client.Integration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(integrations) // the array of records
```


### LabReport

Create an instance: `labReport := client.LabReport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `collection_date` | `string` |  |
| `collection_time` | `string` |  |
| `current_status` | `string` |  |
| `file_count` | `int` |  |
| `input_bytes` | `int` |  |
| `lab_name` | `string` |  |
| `output_bytes` | `int` |  |
| `panel` | `[]any` |  |
| `patient_age_at_collection` | `int` |  |
| `patient_sex` | `string` |  |
| `reference_id` | `string` |  |
| `report_date` | `string` |  |
| `report_locale` | `string` |  |
| `report_notes` | `string` |  |
| `report_time` | `string` |  |
| `report_type` | `string` |  |
| `results` | `[]any` |  |
| `results_count` | `int` |  |
| `session_id` | `string` |  |
| `status_history` | `[]any` |  |
| `updated_at` | `string` |  |
| `upload_id` | `string` |  |
| `uploaded_at` | `string` |  |

#### Example: Load

```go
labReport, err := client.LabReport(nil).Load(map[string]any{"id": "lab_report_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(labReport) // the loaded record
```

#### Example: List

```go
labReports, err := client.LabReport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(labReports) // the array of records
```

#### Example: Create

```go
result, err := client.LabReport(nil).Create(map[string]any{
    "current_status": "example_current_status",
    "report_type": "example_report_type",
    "session_id": "example_session_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### LabReportDelivery

Create an instance: `labReportDelivery := client.LabReportDelivery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `int` |  |
| `destination_id` | `string` |  |
| `destination_type` | `string` |  |
| `last_error` | `string` |  |
| `status` | `string` |  |

#### Example: List

```go
labReportDeliverys, err := client.LabReportDelivery(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(labReportDeliverys) // the array of records
```


### LabReportFile

Create an instance: `labReportFile := client.LabReportFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `filename` | `string` |  |
| `presigned_url` | `string` |  |

#### Example: List

```go
labReportFiles, err := client.LabReportFile(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(labReportFiles) // the array of records
```


### Menstruation

Create an instance: `menstruation := client.Menstruation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
menstruation, err := client.Menstruation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(menstruation) // the loaded record
```


### Nutrition

Create an instance: `nutrition := client.Nutrition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
nutrition, err := client.Nutrition(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nutrition) // the loaded record
```


### PlannedWorkout

Create an instance: `plannedWorkout := client.PlannedWorkout(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `athlete_metrics` | `any` |  |
| `coercion_warnings` | `string` |  |
| `created_at` | `any` |  |
| `detail` | `any` |  |
| `is_external` | `bool` |  |
| `last_updated_at` | `any` |  |
| `planned_date` | `string` |  |
| `planned_workout_id` | `string` |  |
| `provider_workout_id` | `string` |  |
| `workout_id` | `string` |  |

#### Example: Load

```go
plannedWorkout, err := client.PlannedWorkout(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(plannedWorkout) // the loaded record
```

#### Example: List

```go
plannedWorkouts, err := client.PlannedWorkout(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(plannedWorkouts) // the array of records
```


### Sleep

Create an instance: `sleep := client.Sleep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
sleep, err := client.Sleep(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(sleep) // the loaded record
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
user, err := client.User(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```


### Workout

Create an instance: `workout := client.Workout(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `environment` | `any` |  |
| `estimated_calories` | `any` |  |
| `estimated_distance_meters` | `any` |  |
| `estimated_duration_seconds` | `any` |  |
| `ftp` | `float64` |  |
| `max_heart_rate` | `float64` |  |
| `name` | `string` |  |
| `planned_date` | `string` |  |
| `pool_length_meters` | `any` |  |
| `sport` | `any` |  |
| `status` | `string` |  |
| `step_blocks` | `[]any` |  |
| `threshold_heart_rate` | `float64` |  |
| `threshold_speed` | `float64` |  |
| `workout_id` | `string` |  |

#### Example: Load

```go
workout, err := client.Workout(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workout) // the loaded record
```

#### Example: List

```go
workouts, err := client.Workout(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(workouts) // the array of records
```

#### Example: Create

```go
result, err := client.Workout(nil).Create(map[string]any{
    "name": "example_name",
    "planned_date": "example_planned_date",
    "sport": "example_sport",
    "step_blocks": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/terra-sdk/go/
├── terra.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/terra-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
activity := client.Activity(nil)
activity.Load(nil, nil)

// activity.Data() now returns the activity data from the last load
// activity.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
