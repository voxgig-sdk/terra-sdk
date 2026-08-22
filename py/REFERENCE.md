# Terra Python SDK Reference

Complete API reference for the Terra Python SDK.


## TerraSDK

### Constructor

```python
from terra_sdk import TerraSDK

client = TerraSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TerraSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TerraSDK.test()
```


### Instance Methods

#### `Activity(data=None)`

Create a new `ActivityEntity` instance. Pass `None` for no initial data.

#### `Athlete(data=None)`

Create a new `AthleteEntity` instance. Pass `None` for no initial data.

#### `Authentication(data=None)`

Create a new `AuthenticationEntity` instance. Pass `None` for no initial data.

#### `Body(data=None)`

Create a new `BodyEntity` instance. Pass `None` for no initial data.

#### `BulkUserInfo(data=None)`

Create a new `BulkUserInfoEntity` instance. Pass `None` for no initial data.

#### `Daily(data=None)`

Create a new `DailyEntity` instance. Pass `None` for no initial data.

#### `Integration(data=None)`

Create a new `IntegrationEntity` instance. Pass `None` for no initial data.

#### `LabReport(data=None)`

Create a new `LabReportEntity` instance. Pass `None` for no initial data.

#### `LabReportDelivery(data=None)`

Create a new `LabReportDeliveryEntity` instance. Pass `None` for no initial data.

#### `LabReportFile(data=None)`

Create a new `LabReportFileEntity` instance. Pass `None` for no initial data.

#### `Menstruation(data=None)`

Create a new `MenstruationEntity` instance. Pass `None` for no initial data.

#### `Nutrition(data=None)`

Create a new `NutritionEntity` instance. Pass `None` for no initial data.

#### `PlannedWorkout(data=None)`

Create a new `PlannedWorkoutEntity` instance. Pass `None` for no initial data.

#### `Sleep(data=None)`

Create a new `SleepEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `Workout(data=None)`

Create a new `WorkoutEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ActivityEntity

```python
activity = client.Activity()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Activity().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActivityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AthleteEntity

```python
athlete = client.Athlete()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Athlete().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AthleteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AuthenticationEntity

```python
authentication = client.Authentication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_failure_redirect_url` | `str` | No | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `str` | No | URL the user is redirected to upon successful authentication |
| `auth_url` | `str` | No | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `int` | No | a number in seconds depicting how long the url is valid for |
| `language` | `str` | No | Display language of the widget |
| `providers` | `str` | No | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `str` | No | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `str` | No | Session ID for the widget authentication session |
| `status` | `str` | No | indicates that the request was successful |
| `token` | `str` | No |  |
| `url` | `str` | No | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `str` | No | User ID for the user being created |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Authentication().create({
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Authentication().remove()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthenticationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BodyEntity

```python
body = client.Body()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Body().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BodyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BulkUserInfoEntity

```python
bulk_user_info = client.BulkUserInfo()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BulkUserInfo().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkUserInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DailyEntity

```python
daily = client.Daily()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Daily().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DailyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntegrationEntity

```python
integration = client.Integration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | No | Whether the integration is enabled |
| `icon` | `str` | No | URL for the provider's icon image |
| `name` | `str` | No | Display name of the integration |
| `provider` | `str` | No | Identifier for the provider |
| `setup` | `str` | No | Indicates how the integration is set up |
| `types` | `dict` | No | Indicates the types of data available through the provider |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Integration().list()
for integration in results:
    print(integration)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntegrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabReportEntity

```python
lab_report = client.LabReport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_date` | `str` | No | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `str` | No | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `str` | Yes | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `int` | No |  |
| `input_bytes` | `int` | No |  |
| `lab_name` | `str` | No |  |
| `output_bytes` | `int` | No |  |
| `panels` | `list` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `str` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `str` | No | Your external reference; omitted if not set. |
| `report_date` | `str` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `str` | No |  |
| `report_notes` | `str` | No |  |
| `report_time` | `str` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `str` | Yes | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `list` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `str` | Yes |  |
| `status_history` | `list` | No |  |
| `updated_at` | `str` | No |  |
| `upload_id` | `str` | No |  |
| `uploaded_at` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.LabReport().create({
    "current_status": "example_current_status",  # str
    "report_type": "example_report_type",  # str
    "session_id": "example_session_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LabReport().list()
for lab_report in results:
    print(lab_report)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.LabReport().load({"id": "lab_report_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.LabReport().remove({"id": "lab_report_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabReportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabReportDeliveryEntity

```python
lab_report_delivery = client.LabReportDelivery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt_count` | `int` | Yes | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `str` | Yes |  |
| `destination_type` | `str` | No | The destination's type (e.g. |
| `last_error` | `str` | No | Most recent delivery error; omitted when delivered. |
| `status` | `str` | Yes | pending, delivered, or failed. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LabReportDelivery().list({"id": "example"})
for lab_report_delivery in results:
    print(lab_report_delivery)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabReportDeliveryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabReportFileEntity

```python
lab_report_file = client.LabReportFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | `str` | No |  |
| `presigned_url` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LabReportFile().list({"id": "example"})
for lab_report_file in results:
    print(lab_report_file)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabReportFileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MenstruationEntity

```python
menstruation = client.Menstruation()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Menstruation().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenstruationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NutritionEntity

```python
nutrition = client.Nutrition()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Nutrition().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NutritionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlannedWorkoutEntity

```python
planned_workout = client.PlannedWorkout()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `Any` | No |  |
| `coercion_warnings` | `str` | No | Set when the template could not be represented exactly on the provider. |
| `created_at` | `Any` | No | Creation time (RFC 3339) |
| `details` | `Any` | No | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `bool` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `Any` | No | Last update time (RFC 3339) |
| `planned_date` | `str` | No | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `str` | No | Terra identifier of the planned workout |
| `provider_workout_id` | `str` | No | Identifier assigned by the provider, once pushed. |
| `workout_id` | `str` | No | Identifier of the source template. |

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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PlannedWorkout().list()
for planned_workout in results:
    print(planned_workout)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PlannedWorkout().load({"id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.PlannedWorkout().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlannedWorkoutEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SleepEntity

```python
sleep = client.Sleep()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Sleep().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SleepEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.User().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkoutEntity

```python
workout = client.Workout()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Description of the workout |
| `environment` | `Any` | No |  |
| `estimated_calories` | `Any` | No | Estimated calories burned |
| `estimated_distance_meters` | `Any` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `Any` | No | Estimated total duration in seconds |
| `ftp` | `float` | No | Functional Threshold Power in watts |
| `max_heart_rate` | `float` | No | Maximum heart rate in BPM |
| `name` | `str` | Yes | Name of the workout |
| `planned_date` | `str` | Yes | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `Any` | No | Pool length in meters, for swim workouts |
| `sport` | `Any` | Yes | Sport a workout template targets. |
| `status` | `str` | No |  |
| `step_blocks` | `list` | Yes |  |
| `threshold_heart_rate` | `float` | No | Threshold heart rate in BPM |
| `threshold_speed` | `float` | No | Threshold speed in m/s |
| `workout_id` | `str` | No | Terra identifier of the stored template. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Workout().create({
    "name": "example_name",  # str
    "planned_date": "example_planned_date",  # str
    "sport": "example_sport",  # Any
    "step_blocks": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Workout().list()
for workout in results:
    print(workout)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Workout().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Workout().remove({"planned_workout_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkoutEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = TerraSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

