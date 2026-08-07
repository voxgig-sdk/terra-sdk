# Terra Lua SDK



The Lua SDK for the Terra API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Activity()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/terra-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("terra_sdk")

local client = sdk.new({
  apikey = os.getenv("TERRA_APIKEY"),
})
```

### 3. Load an activity

```lua
local activity, err = client:Activity():load()
if err then error(err) end
print(activity)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local activity, err = client:Activity():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Activity():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### TerraSDK

```lua
local sdk = require("terra_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### TerraSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local activity, err = client:Activity():load()
    if err then error(err) end
    -- activity is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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
| `auth_url` |  |
| `expires_in` |  |
| `language` |  |
| `provider` |  |
| `reference_id` |  |
| `session_id` |  |
| `status` |  |
| `token` |  |
| `url` |  |
| `user_id` |  |

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
| `enabled` |  |
| `icon` |  |
| `name` |  |
| `provider` |  |
| `setup` |  |
| `type` |  |

Operations: List.

API path: `/integrations/detailed`

#### LabReport

| Field | Description |
| --- | --- |
| `collection_date` |  |
| `collection_time` |  |
| `current_status` |  |
| `file_count` |  |
| `input_bytes` |  |
| `lab_name` |  |
| `output_bytes` |  |
| `panel` |  |
| `patient_age_at_collection` |  |
| `patient_sex` |  |
| `reference_id` |  |
| `report_date` |  |
| `report_locale` |  |
| `report_notes` |  |
| `report_time` |  |
| `report_type` |  |
| `results` |  |
| `results_count` |  |
| `session_id` |  |
| `status_history` |  |
| `updated_at` |  |
| `upload_id` |  |
| `uploaded_at` |  |

Operations: Create, List, Load, Remove.

API path: `/lab-reports`

#### LabReportDelivery

| Field | Description |
| --- | --- |
| `attempt_count` |  |
| `destination_id` |  |
| `destination_type` |  |
| `last_error` |  |
| `status` |  |

Operations: List.

API path: `/lab-reports/{session_id}/deliveries`

#### LabReportFile

| Field | Description |
| --- | --- |
| `filename` |  |
| `presigned_url` |  |

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
| `athlete_metrics` |  |
| `coercion_warnings` |  |
| `created_at` |  |
| `detail` |  |
| `is_external` |  |
| `last_updated_at` |  |
| `planned_date` |  |
| `planned_workout_id` |  |
| `provider_workout_id` |  |
| `workout_id` |  |

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
| `description` |  |
| `environment` |  |
| `estimated_calories` |  |
| `estimated_distance_meters` |  |
| `estimated_duration_seconds` |  |
| `ftp` |  |
| `max_heart_rate` |  |
| `name` |  |
| `planned_date` |  |
| `pool_length_meters` |  |
| `sport` |  |
| `status` |  |
| `step_blocks` |  |
| `threshold_heart_rate` |  |
| `threshold_speed` |  |
| `workout_id` |  |

Operations: Create, List, Load, Remove.

API path: `/workouts/{workout_id}/plan`



## Entities


### Activity

Create an instance: `local activity = client:Activity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local activity, err = client:Activity():load()
```


### Athlete

Create an instance: `local athlete = client:Athlete(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local athlete, err = client:Athlete():load()
```


### Authentication

Create an instance: `local authentication = client:Authentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_failure_redirect_url` | `string` |  |
| `auth_success_redirect_url` | `string` |  |
| `auth_url` | `string` |  |
| `expires_in` | `number` |  |
| `language` | `string` |  |
| `provider` | `string` |  |
| `reference_id` | `string` |  |
| `session_id` | `string` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `url` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```lua
local authentication, err = client:Authentication():create({
})
```


### Body

Create an instance: `local body = client:Body(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local body, err = client:Body():load()
```


### BulkUserInfo

Create an instance: `local bulk_user_info = client:BulkUserInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local bulk_user_info, err = client:BulkUserInfo():create({
})
```


### Daily

Create an instance: `local daily = client:Daily(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local daily, err = client:Daily():load()
```


### Integration

Create an instance: `local integration = client:Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean` |  |
| `icon` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `setup` | `string` |  |
| `type` | `table` |  |

#### Example: List

```lua
local integrations, err = client:Integration():list()
```


### LabReport

Create an instance: `local lab_report = client:LabReport(nil)`

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
| `collection_date` | `string` |  |
| `collection_time` | `string` |  |
| `current_status` | `string` |  |
| `file_count` | `number` |  |
| `input_bytes` | `number` |  |
| `lab_name` | `string` |  |
| `output_bytes` | `number` |  |
| `panel` | `table` |  |
| `patient_age_at_collection` | `number` |  |
| `patient_sex` | `string` |  |
| `reference_id` | `string` |  |
| `report_date` | `string` |  |
| `report_locale` | `string` |  |
| `report_notes` | `string` |  |
| `report_time` | `string` |  |
| `report_type` | `string` |  |
| `results` | `table` |  |
| `results_count` | `number` |  |
| `session_id` | `string` |  |
| `status_history` | `table` |  |
| `updated_at` | `string` |  |
| `upload_id` | `string` |  |
| `uploaded_at` | `string` |  |

#### Example: Load

```lua
local lab_report, err = client:LabReport():load({ id = "lab_report_id" })
```

#### Example: List

```lua
local lab_reports, err = client:LabReport():list()
```

#### Example: Create

```lua
local lab_report, err = client:LabReport():create({
  current_status = "example_current_status", -- string
  report_type = "example_report_type", -- string
  session_id = "example_session_id", -- string
})
```


### LabReportDelivery

Create an instance: `local lab_report_delivery = client:LabReportDelivery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `number` |  |
| `destination_id` | `string` |  |
| `destination_type` | `string` |  |
| `last_error` | `string` |  |
| `status` | `string` |  |

#### Example: List

```lua
local lab_report_deliverys, err = client:LabReportDelivery():list()
```


### LabReportFile

Create an instance: `local lab_report_file = client:LabReportFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `filename` | `string` |  |
| `presigned_url` | `string` |  |

#### Example: List

```lua
local lab_report_files, err = client:LabReportFile():list()
```


### Menstruation

Create an instance: `local menstruation = client:Menstruation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local menstruation, err = client:Menstruation():load()
```


### Nutrition

Create an instance: `local nutrition = client:Nutrition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local nutrition, err = client:Nutrition():load()
```


### PlannedWorkout

Create an instance: `local planned_workout = client:PlannedWorkout(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `athlete_metrics` | `any` |  |
| `coercion_warnings` | `string` |  |
| `created_at` | `any` |  |
| `detail` | `any` |  |
| `is_external` | `boolean` |  |
| `last_updated_at` | `any` |  |
| `planned_date` | `string` |  |
| `planned_workout_id` | `string` |  |
| `provider_workout_id` | `string` |  |
| `workout_id` | `string` |  |

#### Example: Load

```lua
local planned_workout, err = client:PlannedWorkout():load({ id = 1 })
```

#### Example: List

```lua
local planned_workouts, err = client:PlannedWorkout():list()
```


### Sleep

Create an instance: `local sleep = client:Sleep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local sleep, err = client:Sleep():load()
```


### User

Create an instance: `local user = client:User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local user, err = client:User():load()
```


### Workout

Create an instance: `local workout = client:Workout(nil)`

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
| `description` | `string` |  |
| `environment` | `any` |  |
| `estimated_calories` | `any` |  |
| `estimated_distance_meters` | `any` |  |
| `estimated_duration_seconds` | `any` |  |
| `ftp` | `number` |  |
| `max_heart_rate` | `number` |  |
| `name` | `string` |  |
| `planned_date` | `string` |  |
| `pool_length_meters` | `any` |  |
| `sport` | `any` |  |
| `status` | `string` |  |
| `step_blocks` | `table` |  |
| `threshold_heart_rate` | `number` |  |
| `threshold_speed` | `number` |  |
| `workout_id` | `string` |  |

#### Example: Load

```lua
local workout, err = client:Workout():load({ id = 1 })
```

#### Example: List

```lua
local workouts, err = client:Workout():list()
```

#### Example: Create

```lua
local workout, err = client:Workout():create({
  name = "example_name", -- string
  planned_date = "example_planned_date", -- string
  sport = "example_sport", -- any
  step_blocks = {}, -- table
})
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── terra_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`terra_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local activity = client:Activity()
activity:load()

-- activity:data_get() now returns the activity data from the last load
-- activity:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
