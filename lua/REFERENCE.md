# Terra Lua SDK Reference

Complete API reference for the Terra Lua SDK.


## TerraSDK

### Constructor

```lua
local sdk = require("terra_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Activity(data)`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Athlete(data)`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `Authentication(data)`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Body(data)`

Create a new `Body` entity instance. Pass `nil` for no initial data.

#### `BulkUserInfo(data)`

Create a new `BulkUserInfo` entity instance. Pass `nil` for no initial data.

#### `Daily(data)`

Create a new `Daily` entity instance. Pass `nil` for no initial data.

#### `Integration(data)`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `LabReport(data)`

Create a new `LabReport` entity instance. Pass `nil` for no initial data.

#### `LabReportDelivery(data)`

Create a new `LabReportDelivery` entity instance. Pass `nil` for no initial data.

#### `LabReportFile(data)`

Create a new `LabReportFile` entity instance. Pass `nil` for no initial data.

#### `Menstruation(data)`

Create a new `Menstruation` entity instance. Pass `nil` for no initial data.

#### `Nutrition(data)`

Create a new `Nutrition` entity instance. Pass `nil` for no initial data.

#### `PlannedWorkout(data)`

Create a new `PlannedWorkout` entity instance. Pass `nil` for no initial data.

#### `Sleep(data)`

Create a new `Sleep` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Workout(data)`

Create a new `Workout` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ActivityEntity

```lua
local activity = client:Activity(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Activity():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AthleteEntity

```lua
local athlete = client:Athlete(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Athlete():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AuthenticationEntity

```lua
local authentication = client:Authentication(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_failure_redirect_url` | `string` | No | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `string` | No | URL the user is redirected to upon successful authentication |
| `auth_url` | `string` | No | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `number` | No | a number in seconds depicting how long the url is valid for |
| `language` | `string` | No | Display language of the widget |
| `providers` | `string` | No | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `string` | No | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `string` | No | Session ID for the widget authentication session |
| `status` | `string` | No | indicates that the request was successful |
| `token` | `string` | No |  |
| `url` | `string` | No | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `string` | No | User ID for the user being created |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Authentication():create({
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Authentication():remove()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BodyEntity

```lua
local body = client:Body(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Body():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BodyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BulkUserInfoEntity

```lua
local bulk_user_info = client:BulkUserInfo(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:BulkUserInfo():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkUserInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DailyEntity

```lua
local daily = client:Daily(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Daily():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DailyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IntegrationEntity

```lua
local integration = client:Integration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | No | Whether the integration is enabled |
| `icon` | `string` | No | URL for the provider's icon image |
| `name` | `string` | No | Display name of the integration |
| `provider` | `string` | No | Identifier for the provider |
| `setup` | `string` | No | Indicates how the integration is set up |
| `types` | `table` | No | Indicates the types of data available through the provider |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Integration():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LabReportEntity

```lua
local lab_report = client:LabReport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_date` | `string` | No | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `string` | No | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `string` | Yes | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `number` | No |  |
| `input_bytes` | `number` | No |  |
| `lab_name` | `string` | No |  |
| `output_bytes` | `number` | No |  |
| `panels` | `table` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `number` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | No | Your external reference; omitted if not set. |
| `report_date` | `string` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` | No |  |
| `report_notes` | `string` | No |  |
| `report_time` | `string` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Yes | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `table` | No | The layered biomarker results. |
| `results_count` | `number` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `table` | No |  |
| `updated_at` | `string` | No |  |
| `upload_id` | `string` | No |  |
| `uploaded_at` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:LabReport():create({
  current_status = --[[ string ]],
  report_type = --[[ string ]],
  session_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LabReport():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:LabReport():load({ id = "lab_report_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:LabReport():remove({ id = "lab_report_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabReportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LabReportDeliveryEntity

```lua
local lab_report_delivery = client:LabReportDelivery(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt_count` | `number` | Yes | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `string` | Yes |  |
| `destination_type` | `string` | No | The destination's type (e.g. |
| `last_error` | `string` | No | Most recent delivery error; omitted when delivered. |
| `status` | `string` | Yes | pending, delivered, or failed. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LabReportDelivery():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabReportDeliveryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LabReportFileEntity

```lua
local lab_report_file = client:LabReportFile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | `string` | No |  |
| `presigned_url` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LabReportFile():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabReportFileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MenstruationEntity

```lua
local menstruation = client:Menstruation(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Menstruation():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenstruationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NutritionEntity

```lua
local nutrition = client:Nutrition(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Nutrition():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NutritionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlannedWorkoutEntity

```lua
local planned_workout = client:PlannedWorkout(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `any` | No |  |
| `coercion_warnings` | `string` | No | Set when the template could not be represented exactly on the provider. |
| `created_at` | `any` | No | Creation time (RFC 3339) |
| `details` | `any` | No | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `boolean` | No | True when the workout was created on the provider side rather than through Terra. |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PlannedWorkout():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PlannedWorkout():load({ id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:PlannedWorkout():update({
  id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlannedWorkoutEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SleepEntity

```lua
local sleep = client:Sleep(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Sleep():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SleepEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:User():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorkoutEntity

```lua
local workout = client:Workout(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the workout |
| `environment` | `any` | No |  |
| `estimated_calories` | `any` | No | Estimated calories burned |
| `estimated_distance_meters` | `any` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `any` | No | Estimated total duration in seconds |
| `ftp` | `number` | No | Functional Threshold Power in watts |
| `max_heart_rate` | `number` | No | Maximum heart rate in BPM |
| `name` | `string` | Yes | Name of the workout |
| `planned_date` | `string` | Yes | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `any` | No | Pool length in meters, for swim workouts |
| `sport` | `any` | Yes | Sport a workout template targets. |
| `status` | `string` | No |  |
| `step_blocks` | `table` | Yes |  |
| `threshold_heart_rate` | `number` | No | Threshold heart rate in BPM |
| `threshold_speed` | `number` | No | Threshold speed in m/s |
| `workout_id` | `string` | No | Terra identifier of the stored template. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Workout():create({
  name = --[[ string ]],
  planned_date = --[[ string ]],
  sport = --[[ any ]],
  step_blocks = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Workout():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Workout():load({ id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Workout():remove({ planned_workout_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkoutEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

