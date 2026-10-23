# Terra Ruby SDK Reference

Complete API reference for the Terra Ruby SDK.


## TerraSDK

### Constructor

```ruby
require_relative 'Terra_sdk'

client = TerraSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TerraSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = TerraSDK.test
```


### Instance Methods

#### `Activity(data = nil)`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Athlete(data = nil)`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `Authentication(data = nil)`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Body(data = nil)`

Create a new `Body` entity instance. Pass `nil` for no initial data.

#### `BulkUserInfo(data = nil)`

Create a new `BulkUserInfo` entity instance. Pass `nil` for no initial data.

#### `Daily(data = nil)`

Create a new `Daily` entity instance. Pass `nil` for no initial data.

#### `Integration(data = nil)`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `LabReport(data = nil)`

Create a new `LabReport` entity instance. Pass `nil` for no initial data.

#### `LabReportDelivery(data = nil)`

Create a new `LabReportDelivery` entity instance. Pass `nil` for no initial data.

#### `LabReportFile(data = nil)`

Create a new `LabReportFile` entity instance. Pass `nil` for no initial data.

#### `LabReportSession(data = nil)`

Create a new `LabReportSession` entity instance. Pass `nil` for no initial data.

#### `Menstruation(data = nil)`

Create a new `Menstruation` entity instance. Pass `nil` for no initial data.

#### `Nutrition(data = nil)`

Create a new `Nutrition` entity instance. Pass `nil` for no initial data.

#### `PlannedWorkout(data = nil)`

Create a new `PlannedWorkout` entity instance. Pass `nil` for no initial data.

#### `Sleep(data = nil)`

Create a new `Sleep` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Workout(data = nil)`

Create a new `Workout` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ActivityEntity

```ruby
activity = client.Activity
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Activity.load({ "start_date" => "start_date", "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AthleteEntity

```ruby
athlete = client.Athlete
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Athlete.load({ "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AuthenticationEntity

```ruby
authentication = client.Authentication
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_failure_redirect_url` | `String` | No |  |
| `auth_success_redirect_url` | `String` | No |  |
| `auth_url` | `String` | No | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `Integer` | No |  |
| `language` | `String` | No |  |
| `reference_id` | `String` | No |  |
| `sdk_app` | `String` | No | Which Terra reference app an SDK authentication link hands the end user to. |
| `status` | `String` | No | indicates that the request was successful |
| `token` | `String` | No |  |
| `user_id` | `String` | No | User ID for the user being created |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Authentication.create({
  "resource" => "example_resource", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Authentication.remove({ "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BodyEntity

```ruby
body = client.Body
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Body.load({ "start_date" => "start_date", "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BodyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BulkUserInfoEntity

```ruby
bulk_user_info = client.BulkUserInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulk_user_infos` | `Array` | No | List of user IDs to get information for |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BulkUserInfo.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BulkUserInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DailyEntity

```ruby
daily = client.Daily
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Daily.load({ "start_date" => "start_date", "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DailyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IntegrationEntity

```ruby
integration = client.Integration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `providers` | `Array` | No |  |
| `sdk_providers` | `Array` | No | Providers available through Terra's mobile SDKs rather than cloud connections |
| `status` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Integration.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LabReportEntity

```ruby
lab_report = client.LabReport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LabReport.remove({ "id" => "lab_report_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LabReportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LabReportDeliveryEntity

```ruby
lab_report_delivery = client.LabReportDelivery
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt_count` | `Integer` | Yes | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `String` | Yes |  |
| `destination_type` | `String` | No | The destination's type (e.g. |
| `id` | `String` | No |  |
| `last_error` | `String` | No | Most recent delivery error; omitted when delivered. |
| `status` | `String` | Yes | pending, delivered, or failed. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LabReportDelivery.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LabReportDeliveryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LabReportFileEntity

```ruby
lab_report_file = client.LabReportFile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `String` | No | An uploaded file's content type. |
| `filename` | `String` | No |  |
| `id` | `String` | No |  |
| `presigned_url` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LabReportFile.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LabReportFileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LabReportSessionEntity

```ruby
lab_report_session = client.LabReportSession
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_date` | `String` | No | Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `String` | No | Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `String` | Yes | Current status as a clean lowercase string (open enum — handle unknown values gracefully). |
| `error` | `Hash` | Yes | Why the report failed: the same object the lab_report.failed webhook carries. |
| `file` | `String` | Yes | A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image. |
| `file_count` | `Integer` | No |  |
| `input_bytes` | `Integer` | No |  |
| `lab_name` | `String` | No |  |
| `output_bytes` | `Integer` | No |  |
| `panels` | `Array` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `Integer` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `String` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `String` | No | Your external reference; omitted if not set. |
| `report_date` | `String` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `String` | No |  |
| `report_notes` | `String` | No |  |
| `report_time` | `String` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `String` | Yes | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `Array` | No | The layered biomarker results. |
| `results_count` | `Integer` | No |  |
| `session_id` | `String` | Yes |  |
| `status_history` | `Array` | No |  |
| `updated_at` | `String` | No |  |
| `upload_id` | `String` | No | Durable correlation key for the upload; every resulting session and webhook carries it. |
| `uploaded_at` | `String` | No |  |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `collection_date` | - | - | - |
| `collection_time` | - | - | - |
| `current_status` | - | - | - |
| `error` | - | - | - |
| `file` | - | - | - |
| `file_count` | - | - | - |
| `input_bytes` | - | - | - |
| `lab_name` | - | - | - |
| `output_bytes` | - | - | - |
| `panels` | - | - | - |
| `patient_age_at_collection` | - | - | - |
| `patient_sex` | - | - | - |
| `reference_id` | - | - | - |
| `report_date` | - | - | - |
| `report_locale` | - | - | - |
| `report_notes` | - | - | - |
| `report_time` | - | - | - |
| `report_type` | - | - | - |
| `results` | - | - | - |
| `results_count` | - | - | - |
| `session_id` | - | - | - |
| `status_history` | - | - | - |
| `updated_at` | - | - | - |
| `upload_id` | - | Yes | - |
| `uploaded_at` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LabReportSession.create({
  "current_status" => "example_current_status", # String
  "error" => {}, # Hash
  "file" => "example_file", # String
  "report_type" => "example_report_type", # String
  "session_id" => "example_session_id", # String
  "upload_id" => "example_upload_id", # String
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LabReportSession.load({ "session_id" => "session_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LabReportSession.remove({ "session_id" => "session_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LabReportSessionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MenstruationEntity

```ruby
menstruation = client.Menstruation
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Menstruation.load({ "start_date" => "start_date", "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MenstruationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NutritionEntity

```ruby
nutrition = client.Nutrition
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Nutrition.load({ "start_date" => "start_date", "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NutritionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlannedWorkoutEntity

```ruby
planned_workout = client.PlannedWorkout
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `Object` | Yes |  |
| `coercion_warnings` | `String` | No | Deprecated; use warnings. |
| `completed_at` | `Object` | No | Time the session was reported complete by the user's device. |
| `created_at` | `Object` | Yes | Creation time (RFC 3339). |
| `details` | `Object` | Yes | Deprecated. |
| `id` | `String` | No |  |
| `is_external` | `Boolean` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `Object` | Yes | Last update time (RFC 3339). |
| `planned_date` | `String` | No | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `String` | No | Terra identifier of the planned workout. |
| `provider_workout_id` | `String` | No | Identifier assigned by the provider, once pushed. |
| `warnings` | `Array` | No | Adjustments made when the template could not be represented exactly on the provider. |
| `workout` | `Object` | No | The workout body, as on the list. |
| `workout_id` | `String` | No | Identifier of the source template. |

### Field Usage by Operation

| Field | load | list | update | remove |
| --- | --- | --- | --- | --- |
| `athlete_metrics` | - | - | - | - |
| `coercion_warnings` | - | Yes | - | - |
| `completed_at` | - | Yes | - | - |
| `created_at` | - | - | - | - |
| `details` | - | - | - | - |
| `id` | - | - | - | - |
| `is_external` | - | Yes | - | - |
| `last_updated_at` | - | - | - | - |
| `planned_date` | - | Yes | Yes | - |
| `planned_workout_id` | - | Yes | - | - |
| `provider_workout_id` | - | Yes | - | - |
| `warnings` | - | Yes | - | - |
| `workout` | - | Yes | - | - |
| `workout_id` | - | Yes | - | - |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PlannedWorkout.list({ "user_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PlannedWorkout.load({ "id" => 1, "user_id" => "user_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.PlannedWorkout.remove({ "id" => 1, "user_id" => "user_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.PlannedWorkout.update({
  "id" => 1,
  "user_id" => "user_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlannedWorkoutEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SleepEntity

```ruby
sleep = client.Sleep
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Sleep.load({ "start_date" => "start_date", "user_id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SleepEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `max_page` | `Integer` | No | Total number of pages available for the requested page size |
| `next` | `Object` | No | The next page number, or null if there is no next page |
| `results` | `Array` | No |  |
| `status` | `String` | No |  |
| `users` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.User.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.User.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorkoutEntity

```ruby
workout = client.Workout
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the workout |
| `environment` | `Object` | No |  |
| `estimated_calories` | `Object` | No | Estimated calories burned |
| `estimated_distance_meters` | `Object` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `Object` | No | Estimated total duration in seconds |
| `estimated_intensity_factor` | `Object` | No | Planned intensity factor (0-5), where the provider or author supplies one. |
| `estimated_tss` | `Object` | No | Planned training stress score (0-9999), where the provider or author supplies one. |
| `id` | `String` | No |  |
| `name` | `String` | Yes | Name of the workout |
| `pool_length_meters` | `Object` | No | Pool length in meters, for swim workouts |
| `sport` | `Object` | Yes | Sport a workout template targets. |
| `status` | `String` | No |  |
| `step_blocks` | `Array` | Yes |  |
| `workout_id` | `String` | No | Terra identifier of the stored template. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Workout.create({
  "name" => "example_name", # String
  "sport" => "example_sport", # Object
  "step_blocks" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Workout.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Workout.load({ "id" => 1 })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Workout.remove({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorkoutEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = TerraSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

