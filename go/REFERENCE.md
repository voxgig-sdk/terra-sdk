# Terra Golang SDK Reference

Complete API reference for the Terra Golang SDK.


## TerraSDK

### Constructor

```go
func NewTerraSDK(options map[string]any) *TerraSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *TerraSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *TerraSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Activity(data map[string]any) TerraEntity`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Athlete(data map[string]any) TerraEntity`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `Authentication(data map[string]any) TerraEntity`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Body(data map[string]any) TerraEntity`

Create a new `Body` entity instance. Pass `nil` for no initial data.

#### `BulkUserInfo(data map[string]any) TerraEntity`

Create a new `BulkUserInfo` entity instance. Pass `nil` for no initial data.

#### `Daily(data map[string]any) TerraEntity`

Create a new `Daily` entity instance. Pass `nil` for no initial data.

#### `Integration(data map[string]any) TerraEntity`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `LabReport(data map[string]any) TerraEntity`

Create a new `LabReport` entity instance. Pass `nil` for no initial data.

#### `LabReportDelivery(data map[string]any) TerraEntity`

Create a new `LabReportDelivery` entity instance. Pass `nil` for no initial data.

#### `LabReportFile(data map[string]any) TerraEntity`

Create a new `LabReportFile` entity instance. Pass `nil` for no initial data.

#### `Menstruation(data map[string]any) TerraEntity`

Create a new `Menstruation` entity instance. Pass `nil` for no initial data.

#### `Nutrition(data map[string]any) TerraEntity`

Create a new `Nutrition` entity instance. Pass `nil` for no initial data.

#### `PlannedWorkout(data map[string]any) TerraEntity`

Create a new `PlannedWorkout` entity instance. Pass `nil` for no initial data.

#### `Sleep(data map[string]any) TerraEntity`

Create a new `Sleep` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) TerraEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Workout(data map[string]any) TerraEntity`

Create a new `Workout` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ActivityEntity

```go
activity := client.Activity(nil)
fmt.Println(activity.GetName()) // "activity"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Activity(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AthleteEntity

```go
athlete := client.Athlete(nil)
fmt.Println(athlete.GetName()) // "athlete"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Athlete(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AuthenticationEntity

```go
authentication := client.Authentication(nil)
fmt.Println(authentication.GetName()) // "authentication"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_failure_redirect_url` | `string` | No | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `string` | No | URL the user is redirected to upon successful authentication |
| `auth_url` | `string` | No | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `int` | No | a number in seconds depicting how long the url is valid for |
| `language` | `string` | No | Display language of the widget |
| `providers` | `string` | No | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `string` | No | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `string` | No | Session ID for the widget authentication session |
| `status` | `string` | No | indicates that the request was successful |
| `token` | `string` | No |  |
| `url` | `string` | No | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `string` | No | User ID for the user being created |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Authentication(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BodyEntity

```go
body := client.Body(nil)
fmt.Println(body.GetName()) // "body"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Body(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BodyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BulkUserInfoEntity

```go
bulkUserInfo := client.BulkUserInfo(nil)
fmt.Println(bulkUserInfo.GetName()) // "bulk_user_info"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.BulkUserInfo(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BulkUserInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DailyEntity

```go
daily := client.Daily(nil)
fmt.Println(daily.GetName()) // "daily"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Daily(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DailyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IntegrationEntity

```go
integration := client.Integration(nil)
fmt.Println(integration.GetName()) // "integration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | No | Whether the integration is enabled |
| `icon` | `string` | No | URL for the provider's icon image |
| `name` | `string` | No | Display name of the integration |
| `provider` | `string` | No | Identifier for the provider |
| `setup` | `string` | No | Indicates how the integration is set up |
| `types` | `map[string]any` | No | Indicates the types of data available through the provider |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Integration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LabReportEntity

```go
labReport := client.LabReport(nil)
fmt.Println(labReport.GetName()) // "lab_report"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_date` | `string` | No | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `string` | No | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `string` | Yes | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `int` | No |  |
| `input_bytes` | `int` | No |  |
| `lab_name` | `string` | No |  |
| `output_bytes` | `int` | No |  |
| `panels` | `[]any` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | No | Your external reference; omitted if not set. |
| `report_date` | `string` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` | No |  |
| `report_notes` | `string` | No |  |
| `report_time` | `string` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Yes | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `[]any` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `[]any` | No |  |
| `updated_at` | `string` | No |  |
| `upload_id` | `string` | No |  |
| `uploaded_at` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LabReport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.LabReport(nil).Load(map[string]any{"id": "lab_report_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.LabReport(nil).Remove(map[string]any{"id": "lab_report_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LabReportDeliveryEntity

```go
labReportDelivery := client.LabReportDelivery(nil)
fmt.Println(labReportDelivery.GetName()) // "lab_report_delivery"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt_count` | `int` | Yes | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `string` | Yes |  |
| `destination_type` | `string` | No | The destination's type (e.g. |
| `last_error` | `string` | No | Most recent delivery error; omitted when delivered. |
| `status` | `string` | Yes | pending, delivered, or failed. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LabReportDelivery(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportDeliveryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LabReportFileEntity

```go
labReportFile := client.LabReportFile(nil)
fmt.Println(labReportFile.GetName()) // "lab_report_file"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | `string` | No |  |
| `presigned_url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LabReportFile(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportFileEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MenstruationEntity

```go
menstruation := client.Menstruation(nil)
fmt.Println(menstruation.GetName()) // "menstruation"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Menstruation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MenstruationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NutritionEntity

```go
nutrition := client.Nutrition(nil)
fmt.Println(nutrition.GetName()) // "nutrition"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Nutrition(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NutritionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlannedWorkoutEntity

```go
plannedWorkout := client.PlannedWorkout(nil)
fmt.Println(plannedWorkout.GetName()) // "planned_workout"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `any` | No |  |
| `coercion_warnings` | `string` | No | Set when the template could not be represented exactly on the provider. |
| `created_at` | `any` | No | Creation time (RFC 3339) |
| `details` | `any` | No | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `bool` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `any` | No | Last update time (RFC 3339) |
| `planned_date` | `string` | No | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `string` | No | Terra identifier of the planned workout |
| `provider_workout_id` | `string` | No | Identifier assigned by the provider, once pushed. |
| `workout_id` | `string` | No | Identifier of the source template. |

### Field Usage by Operation

| Field | load | list | update |
| --- | --- | --- | --- |
| `athlete_metrics` | - | - | - |
| `coercion_warnings` | - | - | - |
| `created_at` | - | - | - |
| `details` | - | - | - |
| `is_external` | - | - | - |
| `last_updated_at` | - | - | - |
| `planned_date` | - | - | Yes |
| `planned_workout_id` | - | - | - |
| `provider_workout_id` | - | - | - |
| `workout_id` | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PlannedWorkout(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PlannedWorkout(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.PlannedWorkout(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlannedWorkoutEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SleepEntity

```go
sleep := client.Sleep(nil)
fmt.Println(sleep.GetName()) // "sleep"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Sleep(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SleepEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WorkoutEntity

```go
workout := client.Workout(nil)
fmt.Println(workout.GetName()) // "workout"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the workout |
| `environment` | `any` | No |  |
| `estimated_calories` | `any` | No | Estimated calories burned |
| `estimated_distance_meters` | `any` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `any` | No | Estimated total duration in seconds |
| `ftp` | `float64` | No | Functional Threshold Power in watts |
| `max_heart_rate` | `float64` | No | Maximum heart rate in BPM |
| `name` | `string` | Yes | Name of the workout |
| `planned_date` | `string` | Yes | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `any` | No | Pool length in meters, for swim workouts |
| `sport` | `any` | Yes | Sport a workout template targets. |
| `status` | `string` | No |  |
| `step_blocks` | `[]any` | Yes |  |
| `threshold_heart_rate` | `float64` | No | Threshold heart rate in BPM |
| `threshold_speed` | `float64` | No | Threshold speed in m/s |
| `workout_id` | `string` | No | Terra identifier of the stored template. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Workout(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Workout(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Workout(nil).Remove(map[string]any{"planned_workout_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkoutEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewTerraSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

