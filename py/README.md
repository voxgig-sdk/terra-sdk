# Terra Python SDK



The Python SDK for the Terra API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Activity()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/terra-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from terra_sdk import TerraSDK

client = TerraSDK({
    "apikey": os.environ.get("TERRA_APIKEY"),
})
```

### 3. Load an activity

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    activity = client.Activity().load()
    print(activity)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    activity = client.Activity().load()
    print(activity)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = TerraSDK.test()

# Entity ops return the bare record and raise on error.
activity = client.Activity().load()
# activity contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = TerraSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### TerraSDK

```python
from terra_sdk import TerraSDK

client = TerraSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = TerraSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### TerraSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `activity = client.Activity()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
activity = client.Activity().load()
```


### Athlete

Create an instance: `athlete = client.Athlete()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
athlete = client.Athlete().load()
```


### Authentication

Create an instance: `authentication = client.Authentication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_failure_redirect_url` | `str` |  |
| `auth_success_redirect_url` | `str` |  |
| `auth_url` | `str` |  |
| `expires_in` | `int` |  |
| `language` | `str` |  |
| `provider` | `str` |  |
| `reference_id` | `str` |  |
| `session_id` | `str` |  |
| `status` | `str` |  |
| `token` | `str` |  |
| `url` | `str` |  |
| `user_id` | `str` |  |

#### Example: Create

```python
authentication = client.Authentication().create({
})
```


### Body

Create an instance: `body = client.Body()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
body = client.Body().load()
```


### BulkUserInfo

Create an instance: `bulk_user_info = client.BulkUserInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
bulk_user_info = client.BulkUserInfo().create({
})
```


### Daily

Create an instance: `daily = client.Daily()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
daily = client.Daily().load()
```


### Integration

Create an instance: `integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |
| `icon` | `str` |  |
| `name` | `str` |  |
| `provider` | `str` |  |
| `setup` | `str` |  |
| `type` | `dict` |  |

#### Example: List

```python
integrations = client.Integration().list()
```


### LabReport

Create an instance: `lab_report = client.LabReport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `collection_date` | `str` |  |
| `collection_time` | `str` |  |
| `current_status` | `str` |  |
| `file_count` | `int` |  |
| `input_bytes` | `int` |  |
| `lab_name` | `str` |  |
| `output_bytes` | `int` |  |
| `panel` | `list` |  |
| `patient_age_at_collection` | `int` |  |
| `patient_sex` | `str` |  |
| `reference_id` | `str` |  |
| `report_date` | `str` |  |
| `report_locale` | `str` |  |
| `report_notes` | `str` |  |
| `report_time` | `str` |  |
| `report_type` | `str` |  |
| `results` | `list` |  |
| `results_count` | `int` |  |
| `session_id` | `str` |  |
| `status_history` | `list` |  |
| `updated_at` | `str` |  |
| `upload_id` | `str` |  |
| `uploaded_at` | `str` |  |

#### Example: Load

```python
lab_report = client.LabReport().load({"id": "lab_report_id"})
```

#### Example: List

```python
lab_reports = client.LabReport().list()
```

#### Example: Create

```python
lab_report = client.LabReport().create({
    "current_status": "example_current_status",  # str
    "report_type": "example_report_type",  # str
    "session_id": "example_session_id",  # str
})
```


### LabReportDelivery

Create an instance: `lab_report_delivery = client.LabReportDelivery()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `int` |  |
| `destination_id` | `str` |  |
| `destination_type` | `str` |  |
| `last_error` | `str` |  |
| `status` | `str` |  |

#### Example: List

```python
lab_report_deliverys = client.LabReportDelivery().list()
```


### LabReportFile

Create an instance: `lab_report_file = client.LabReportFile()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `filename` | `str` |  |
| `presigned_url` | `str` |  |

#### Example: List

```python
lab_report_files = client.LabReportFile().list()
```


### Menstruation

Create an instance: `menstruation = client.Menstruation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
menstruation = client.Menstruation().load()
```


### Nutrition

Create an instance: `nutrition = client.Nutrition()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
nutrition = client.Nutrition().load()
```


### PlannedWorkout

Create an instance: `planned_workout = client.PlannedWorkout()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `athlete_metrics` | `Any` |  |
| `coercion_warnings` | `str` |  |
| `created_at` | `Any` |  |
| `detail` | `Any` |  |
| `is_external` | `bool` |  |
| `last_updated_at` | `Any` |  |
| `planned_date` | `str` |  |
| `planned_workout_id` | `str` |  |
| `provider_workout_id` | `str` |  |
| `workout_id` | `str` |  |

#### Example: Load

```python
planned_workout = client.PlannedWorkout().load({"id": 1})
```

#### Example: List

```python
planned_workouts = client.PlannedWorkout().list()
```


### Sleep

Create an instance: `sleep = client.Sleep()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
sleep = client.Sleep().load()
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
user = client.User().load()
```


### Workout

Create an instance: `workout = client.Workout()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `environment` | `Any` |  |
| `estimated_calories` | `Any` |  |
| `estimated_distance_meters` | `Any` |  |
| `estimated_duration_seconds` | `Any` |  |
| `ftp` | `float` |  |
| `max_heart_rate` | `float` |  |
| `name` | `str` |  |
| `planned_date` | `str` |  |
| `pool_length_meters` | `Any` |  |
| `sport` | `Any` |  |
| `status` | `str` |  |
| `step_blocks` | `list` |  |
| `threshold_heart_rate` | `float` |  |
| `threshold_speed` | `float` |  |
| `workout_id` | `str` |  |

#### Example: Load

```python
workout = client.Workout().load({"id": 1})
```

#### Example: List

```python
workouts = client.Workout().list()
```

#### Example: Create

```python
workout = client.Workout().create({
    "name": "example_name",  # str
    "planned_date": "example_planned_date",  # str
    "sport": "example_sport",  # Any
    "step_blocks": [],  # list
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── terra_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`terra_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
activity = client.Activity()
activity.load()

# activity.data_get() now returns the activity data from the last load
# activity.match_get() returns the last match criteria
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
