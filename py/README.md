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

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
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

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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
| `auth_failure_redirect_url` | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | URL the user is redirected to upon successful authentication |
| `auth_url` | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | a number in seconds depicting how long the url is valid for |
| `language` | Display language of the widget |
| `providers` | Comma separated list of providers to display on the device selection page. |
| `reference_id` | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | Session ID for the widget authentication session |
| `status` | indicates that the request was successful |
| `token` |  |
| `url` | the widget URL the user must be redirected to in order to link their account |
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
| `enabled` | Whether the integration is enabled |
| `icon` | URL for the provider's icon image |
| `name` | Display name of the integration |
| `provider` | Identifier for the provider |
| `setup` | Indicates how the integration is set up |
| `types` | Indicates the types of data available through the provider |

Operations: List.

API path: `/integrations/detailed`

#### LabReport

| Field | Description |
| --- | --- |
| `collection_date` | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | Current status as a clean lowercase string (open enum), e.g. |
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
| `report_type` | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | The layered biomarker results. |
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
| `attempt_count` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` |  |
| `destination_type` | The destination's type (e.g. |
| `last_error` | Most recent delivery error; omitted when delivered. |
| `status` | pending, delivered, or failed. |

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
| `coercion_warnings` | Set when the template could not be represented exactly on the provider. |
| `created_at` | Creation time (RFC 3339) |
| `details` | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | Last update time (RFC 3339) |
| `planned_date` | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | Terra identifier of the planned workout |
| `provider_workout_id` | Identifier assigned by the provider, once pushed. |
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

Operations: Load.

API path: `/subscriptions`

#### Workout

| Field | Description |
| --- | --- |
| `description` | Description of the workout |
| `environment` |  |
| `estimated_calories` | Estimated calories burned |
| `estimated_distance_meters` | Estimated total distance in meters |
| `estimated_duration_seconds` | Estimated total duration in seconds |
| `ftp` | Functional Threshold Power in watts |
| `max_heart_rate` | Maximum heart rate in BPM |
| `name` | Name of the workout |
| `planned_date` | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | Pool length in meters, for swim workouts |
| `sport` | Sport a workout template targets. |
| `status` |  |
| `step_blocks` |  |
| `threshold_heart_rate` | Threshold heart rate in BPM |
| `threshold_speed` | Threshold speed in m/s |
| `workout_id` | Terra identifier of the stored template. |

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
| `auth_failure_redirect_url` | `str` | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `str` | URL the user is redirected to upon successful authentication |
| `auth_url` | `str` | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `int` | a number in seconds depicting how long the url is valid for |
| `language` | `str` | Display language of the widget |
| `providers` | `str` | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `str` | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `str` | Session ID for the widget authentication session |
| `status` | `str` | indicates that the request was successful |
| `token` | `str` |  |
| `url` | `str` | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `str` | User ID for the user being created |

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
| `enabled` | `bool` | Whether the integration is enabled |
| `icon` | `str` | URL for the provider's icon image |
| `name` | `str` | Display name of the integration |
| `provider` | `str` | Identifier for the provider |
| `setup` | `str` | Indicates how the integration is set up |
| `types` | `dict` | Indicates the types of data available through the provider |

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
| `collection_date` | `str` | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `str` | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `str` | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `int` |  |
| `input_bytes` | `int` |  |
| `lab_name` | `str` |  |
| `output_bytes` | `int` |  |
| `panels` | `list` | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | Patient age in years; omitted if unknown. |
| `patient_sex` | `str` | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `str` | Your external reference; omitted if not set. |
| `report_date` | `str` | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `str` |  |
| `report_notes` | `str` |  |
| `report_time` | `str` | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `str` | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `list` | The layered biomarker results. |
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
| `attempt_count` | `int` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `str` |  |
| `destination_type` | `str` | The destination's type (e.g. |
| `last_error` | `str` | Most recent delivery error; omitted when delivered. |
| `status` | `str` | pending, delivered, or failed. |

#### Example: List

```python
lab_report_deliverys = client.LabReportDelivery().list({"id": "example"})
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
lab_report_files = client.LabReportFile().list({"id": "example"})
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
| `coercion_warnings` | `str` | Set when the template could not be represented exactly on the provider. |
| `created_at` | `Any` | Creation time (RFC 3339) |
| `details` | `Any` | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `bool` | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `Any` | Last update time (RFC 3339) |
| `planned_date` | `str` | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `str` | Terra identifier of the planned workout |
| `provider_workout_id` | `str` | Identifier assigned by the provider, once pushed. |
| `workout_id` | `str` | Identifier of the source template. |

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
| `description` | `str` | Description of the workout |
| `environment` | `Any` |  |
| `estimated_calories` | `Any` | Estimated calories burned |
| `estimated_distance_meters` | `Any` | Estimated total distance in meters |
| `estimated_duration_seconds` | `Any` | Estimated total duration in seconds |
| `ftp` | `float` | Functional Threshold Power in watts |
| `max_heart_rate` | `float` | Maximum heart rate in BPM |
| `name` | `str` | Name of the workout |
| `planned_date` | `str` | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `Any` | Pool length in meters, for swim workouts |
| `sport` | `Any` | Sport a workout template targets. |
| `status` | `str` |  |
| `step_blocks` | `list` |  |
| `threshold_heart_rate` | `float` | Threshold heart rate in BPM |
| `threshold_speed` | `float` | Threshold speed in m/s |
| `workout_id` | `str` | Terra identifier of the stored template. |

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


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `workout` | `sport` | 15 | 0 levels |
| `workout` | `step_blocks` | 11 | 13 levels |
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
