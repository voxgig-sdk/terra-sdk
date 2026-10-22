# Terra Ruby SDK



The Ruby SDK for the Terra API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Activity` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/terra-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/terra-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-terra-sdk", path: "./terra-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `x-api-key` header.

### 1. Create a client

```ruby
require_relative "Terra_sdk"

client = TerraSDK.new({
  "apikey" => ENV["TERRA_APIKEY"],
})
```

### 3. Load an activity

```ruby
begin
  # load returns the ENTITY — call data_get for the Activity record (raises on error).
  activity = client.Activity.load({ "start_date" => "example_start_date", "user_id" => "example_user_id" })
  puts activity.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  integrations = client.Integration.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = TerraSDK.test

# list returns an Array of Integration entities, one per mock record (raises on
# error); data_get reads each record.
integrations = client.Integration.list()
integrations.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = TerraSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### TerraSDK

```ruby
require_relative "Terra_sdk"
client = TerraSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = TerraSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TerraSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Activity` | `(data) -> ActivityEntity` | Create an Activity entity instance. |
| `Athlete` | `(data) -> AthleteEntity` | Create an Athlete entity instance. |
| `Authentication` | `(data) -> AuthenticationEntity` | Create an Authentication entity instance. |
| `Body` | `(data) -> BodyEntity` | Create a Body entity instance. |
| `BulkUserInfo` | `(data) -> BulkUserInfoEntity` | Create a BulkUserInfo entity instance. |
| `Daily` | `(data) -> DailyEntity` | Create a Daily entity instance. |
| `Integration` | `(data) -> IntegrationEntity` | Create an Integration entity instance. |
| `LabReport` | `(data) -> LabReportEntity` | Create a LabReport entity instance. |
| `LabReportDelivery` | `(data) -> LabReportDeliveryEntity` | Create a LabReportDelivery entity instance. |
| `LabReportFile` | `(data) -> LabReportFileEntity` | Create a LabReportFile entity instance. |
| `LabReportSession` | `(data) -> LabReportSessionEntity` | Create a LabReportSession entity instance. |
| `Menstruation` | `(data) -> MenstruationEntity` | Create a Menstruation entity instance. |
| `Nutrition` | `(data) -> NutritionEntity` | Create a Nutrition entity instance. |
| `PlannedWorkout` | `(data) -> PlannedWorkoutEntity` | Create a PlannedWorkout entity instance. |
| `Sleep` | `(data) -> SleepEntity` | Create a Sleep entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `Workout` | `(data) -> WorkoutEntity` | Create a Workout entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`TerraError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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
| `auth_failure_redirect_url` |  |
| `auth_success_redirect_url` |  |
| `auth_url` | authentication URL the user must be redirected to in order to link their account |
| `expires_in` |  |
| `language` |  |
| `reference_id` |  |
| `sdk_app` | Which Terra reference app an SDK authentication link hands the end user to. |
| `status` | indicates that the request was successful |
| `token` |  |
| `user_id` | User ID for the user being created |

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
| `bulk_user_infos` | List of user IDs to get information for |

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
| `providers` |  |
| `sdk_providers` | Providers available through Terra's mobile SDKs rather than cloud connections |
| `status` |  |

Operations: List.

API path: `/integrations`

#### LabReport

| Field | Description |
| --- | --- |
| `current_status` | Processing status as a clean lowercase string. |
| `file` | A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image. |
| `id` |  |
| `upload_id` | Durable correlation key for the upload; every resulting session and webhook carries it. |

Operations: Create, Load, Remove.

API path: `/lab-reports/{session_id}/reprocess`

#### LabReportDelivery

| Field | Description |
| --- | --- |
| `attempt_count` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` |  |
| `destination_type` | The destination's type (e.g. |
| `id` |  |
| `last_error` | Most recent delivery error; omitted when delivered. |
| `status` | pending, delivered, or failed. |

Operations: List.

API path: `/lab-reports/{session_id}/deliveries`

#### LabReportFile

| Field | Description |
| --- | --- |
| `content_type` | An uploaded file's content type. |
| `filename` |  |
| `id` |  |
| `presigned_url` |  |

Operations: List.

API path: `/lab-reports/{session_id}/files`

#### LabReportSession

| Field | Description |
| --- | --- |
| `collection_date` | Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | Current status as a clean lowercase string (open enum — handle unknown values gracefully). |
| `error` | Why the report failed: the same object the lab_report.failed webhook carries. |
| `file_count` |  |
| `input_bytes` |  |
| `lab_name` |  |
| `output_bytes` |  |
| `panels` | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | Patient age in years; omitted if unknown. |
| `patient_sex` | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | Your external reference; omitted if not set. |
| `report_date` | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` |  |
| `report_notes` |  |
| `report_time` | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | The layered biomarker results. |
| `results_count` |  |
| `session_id` |  |
| `status_history` |  |
| `updated_at` |  |
| `upload_id` |  |
| `uploaded_at` |  |

Operations: Create, Load.

API path: `/reports/{session_id}/reprocess`

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
| `athlete_metrics` |  |
| `coercion_warnings` | Deprecated; use warnings. |
| `completed_at` | Time the session was reported complete by the user's device. |
| `created_at` | Creation time (RFC 3339). |
| `details` | Deprecated. |
| `id` |  |
| `is_external` | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | Last update time (RFC 3339). |
| `planned_date` | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | Terra identifier of the planned workout. |
| `provider_workout_id` | Identifier assigned by the provider, once pushed. |
| `warnings` | Adjustments made when the template could not be represented exactly on the provider. |
| `workout` | The workout body, as on the list. |
| `workout_id` | Identifier of the source template. |

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
| `max_page` | Total number of pages available for the requested page size |
| `next` | The next page number, or null if there is no next page |
| `results` |  |
| `status` |  |
| `users` |  |

Operations: List, Load.

API path: `/subscriptions`

#### Workout

| Field | Description |
| --- | --- |
| `description` | Description of the workout |
| `environment` |  |
| `estimated_calories` | Estimated calories burned |
| `estimated_distance_meters` | Estimated total distance in meters |
| `estimated_duration_seconds` | Estimated total duration in seconds |
| `estimated_intensity_factor` | Planned intensity factor (0-5), where the provider or author supplies one. |
| `estimated_tss` | Planned training stress score (0-9999), where the provider or author supplies one. |
| `id` |  |
| `name` | Name of the workout |
| `pool_length_meters` | Pool length in meters, for swim workouts |
| `sport` | Sport a workout template targets. |
| `status` |  |
| `step_blocks` |  |
| `workout_id` | Terra identifier of the stored template. |

Operations: Create, List, Load, Remove.

API path: `/workouts/{workout_id}/plan`



## Entities


### Activity

Create an instance: `activity = client.Activity`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Activity record (raises on error).
activity = client.Activity.load({ "start_date" => "start_date", "user_id" => "user_id" })
```


### Athlete

Create an instance: `athlete = client.Athlete`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Athlete record (raises on error).
athlete = client.Athlete.load({ "user_id" => "user_id" })
```


### Authentication

Create an instance: `authentication = client.Authentication`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_failure_redirect_url` | `String` |  |
| `auth_success_redirect_url` | `String` |  |
| `auth_url` | `String` | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `Integer` |  |
| `language` | `String` |  |
| `reference_id` | `String` |  |
| `sdk_app` | `String` | Which Terra reference app an SDK authentication link hands the end user to. |
| `status` | `String` | indicates that the request was successful |
| `token` | `String` |  |
| `user_id` | `String` | User ID for the user being created |

#### Example: Create

```ruby
authentication = client.Authentication.create({
  "resource" => "example_resource", # String
})
```


### Body

Create an instance: `body = client.Body`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Body record (raises on error).
body = client.Body.load({ "start_date" => "start_date", "user_id" => "user_id" })
```


### BulkUserInfo

Create an instance: `bulk_user_info = client.BulkUserInfo`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bulk_user_infos` | `Array` | List of user IDs to get information for |

#### Example: Create

```ruby
bulk_user_info = client.BulkUserInfo.create({
})
```


### Daily

Create an instance: `daily = client.Daily`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Daily record (raises on error).
daily = client.Daily.load({ "start_date" => "start_date", "user_id" => "user_id" })
```


### Integration

Create an instance: `integration = client.Integration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `providers` | `Array` |  |
| `sdk_providers` | `Array` | Providers available through Terra's mobile SDKs rather than cloud connections |
| `status` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Integration entities, one per record (raises on error).
integrations = client.Integration.list
integrations.each { |item| puts item.data_get }
```


### LabReport

Create an instance: `lab_report = client.LabReport`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current_status` | `String` | Processing status as a clean lowercase string. |
| `file` | `String` | A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image. |
| `id` | `String` |  |
| `upload_id` | `String` | Durable correlation key for the upload; every resulting session and webhook carries it. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LabReport record (raises on error).
lab_report = client.LabReport.load()
```

#### Example: Create

```ruby
lab_report = client.LabReport.create({
  "current_status" => "example_current_status", # String
  "file" => "example_file", # String
  "upload_id" => "example_upload_id", # String
})
```


### LabReportDelivery

Create an instance: `lab_report_delivery = client.LabReportDelivery`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `Integer` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `String` |  |
| `destination_type` | `String` | The destination's type (e.g. |
| `id` | `String` |  |
| `last_error` | `String` | Most recent delivery error; omitted when delivered. |
| `status` | `String` | pending, delivered, or failed. |

#### Example: List

```ruby
# list returns an Array of LabReportDelivery entities, one per record (raises on error).
lab_report_deliverys = client.LabReportDelivery.list({ "id" => "example" })
lab_report_deliverys.each { |item| puts item.data_get }
```


### LabReportFile

Create an instance: `lab_report_file = client.LabReportFile`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_type` | `String` | An uploaded file's content type. |
| `filename` | `String` |  |
| `id` | `String` |  |
| `presigned_url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of LabReportFile entities, one per record (raises on error).
lab_report_files = client.LabReportFile.list({ "id" => "example" })
lab_report_files.each { |item| puts item.data_get }
```


### LabReportSession

Create an instance: `lab_report_session = client.LabReportSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `collection_date` | `String` | Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `String` | Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `String` | Current status as a clean lowercase string (open enum — handle unknown values gracefully). |
| `error` | `Hash` | Why the report failed: the same object the lab_report.failed webhook carries. |
| `file_count` | `Integer` |  |
| `input_bytes` | `Integer` |  |
| `lab_name` | `String` |  |
| `output_bytes` | `Integer` |  |
| `panels` | `Array` | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `Integer` | Patient age in years; omitted if unknown. |
| `patient_sex` | `String` | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `String` | Your external reference; omitted if not set. |
| `report_date` | `String` | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `String` |  |
| `report_notes` | `String` |  |
| `report_time` | `String` | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `String` | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `Array` | The layered biomarker results. |
| `results_count` | `Integer` |  |
| `session_id` | `String` |  |
| `status_history` | `Array` |  |
| `updated_at` | `String` |  |
| `upload_id` | `String` |  |
| `uploaded_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LabReportSession record (raises on error).
lab_report_session = client.LabReportSession.load({ "session_id" => "session_id" })
```

#### Example: Create

```ruby
lab_report_session = client.LabReportSession.create({
  "session_id" => "example_session_id", # String
  "current_status" => "example_current_status", # String
  "error" => {}, # Hash
  "report_type" => "example_report_type", # String
})
```


### Menstruation

Create an instance: `menstruation = client.Menstruation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Menstruation record (raises on error).
menstruation = client.Menstruation.load({ "start_date" => "start_date", "user_id" => "user_id" })
```


### Nutrition

Create an instance: `nutrition = client.Nutrition`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Nutrition record (raises on error).
nutrition = client.Nutrition.load({ "start_date" => "start_date", "user_id" => "user_id" })
```


### PlannedWorkout

Create an instance: `planned_workout = client.PlannedWorkout`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `athlete_metrics` | `Object` |  |
| `coercion_warnings` | `String` | Deprecated; use warnings. |
| `completed_at` | `Object` | Time the session was reported complete by the user's device. |
| `created_at` | `Object` | Creation time (RFC 3339). |
| `details` | `Object` | Deprecated. |
| `id` | `String` |  |
| `is_external` | `Boolean` | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `Object` | Last update time (RFC 3339). |
| `planned_date` | `String` | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `String` | Terra identifier of the planned workout. |
| `provider_workout_id` | `String` | Identifier assigned by the provider, once pushed. |
| `warnings` | `Array` | Adjustments made when the template could not be represented exactly on the provider. |
| `workout` | `Object` | The workout body, as on the list. |
| `workout_id` | `String` | Identifier of the source template. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PlannedWorkout record (raises on error).
planned_workout = client.PlannedWorkout.load({ "id" => 1, "user_id" => "user_id" })
```

#### Example: List

```ruby
# list returns an Array of PlannedWorkout entities, one per record (raises on error).
planned_workouts = client.PlannedWorkout.list({ "user_id" => "example" })
planned_workouts.each { |item| puts item.data_get }
```


### Sleep

Create an instance: `sleep = client.Sleep`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Sleep record (raises on error).
sleep = client.Sleep.load({ "start_date" => "start_date", "user_id" => "user_id" })
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `max_page` | `Integer` | Total number of pages available for the requested page size |
| `next` | `Object` | The next page number, or null if there is no next page |
| `results` | `Array` |  |
| `status` | `String` |  |
| `users` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the User record (raises on error).
user = client.User.load()
```

#### Example: List

```ruby
# list returns an Array of User entities, one per record (raises on error).
users = client.User.list
users.each { |item| puts item.data_get }
```


### Workout

Create an instance: `workout = client.Workout`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Description of the workout |
| `environment` | `Object` |  |
| `estimated_calories` | `Object` | Estimated calories burned |
| `estimated_distance_meters` | `Object` | Estimated total distance in meters |
| `estimated_duration_seconds` | `Object` | Estimated total duration in seconds |
| `estimated_intensity_factor` | `Object` | Planned intensity factor (0-5), where the provider or author supplies one. |
| `estimated_tss` | `Object` | Planned training stress score (0-9999), where the provider or author supplies one. |
| `id` | `String` |  |
| `name` | `String` | Name of the workout |
| `pool_length_meters` | `Object` | Pool length in meters, for swim workouts |
| `sport` | `Object` | Sport a workout template targets. |
| `status` | `String` |  |
| `step_blocks` | `Array` |  |
| `workout_id` | `String` | Terra identifier of the stored template. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Workout record (raises on error).
workout = client.Workout.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Workout entities, one per record (raises on error).
workouts = client.Workout.list
workouts.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
workout = client.Workout.create({
  "name" => "example_name", # String
  "sport" => "example_sport", # Object
  "step_blocks" => [], # Array
})
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

4 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `planned_workout` | `workout` | 19 | 17 levels |
| `workout` | `step_blocks` | 19 | 13 levels |
| `workout` | `sport` | 15 | 0 levels |
| `workout` | `environment` | 3 | 2 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Terra_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Terra_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
integration = client.Integration
integration.list()

# integration.data_get now returns the integration data from the last list
# integration.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
