# Terra PHP SDK Reference

Complete API reference for the Terra PHP SDK.


## TerraSDK

### Constructor

```php
require_once __DIR__ . '/terra_sdk.php';

$client = new TerraSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TerraSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = TerraSDK::test();
```


### Instance Methods

#### `Activity($data = null)`

Create a new `ActivityEntity` instance. Pass `null` for no initial data.

#### `Athlete($data = null)`

Create a new `AthleteEntity` instance. Pass `null` for no initial data.

#### `Authentication($data = null)`

Create a new `AuthenticationEntity` instance. Pass `null` for no initial data.

#### `Body($data = null)`

Create a new `BodyEntity` instance. Pass `null` for no initial data.

#### `BulkUserInfo($data = null)`

Create a new `BulkUserInfoEntity` instance. Pass `null` for no initial data.

#### `Daily($data = null)`

Create a new `DailyEntity` instance. Pass `null` for no initial data.

#### `Integration($data = null)`

Create a new `IntegrationEntity` instance. Pass `null` for no initial data.

#### `LabReport($data = null)`

Create a new `LabReportEntity` instance. Pass `null` for no initial data.

#### `LabReportDelivery($data = null)`

Create a new `LabReportDeliveryEntity` instance. Pass `null` for no initial data.

#### `LabReportFile($data = null)`

Create a new `LabReportFileEntity` instance. Pass `null` for no initial data.

#### `Menstruation($data = null)`

Create a new `MenstruationEntity` instance. Pass `null` for no initial data.

#### `Nutrition($data = null)`

Create a new `NutritionEntity` instance. Pass `null` for no initial data.

#### `PlannedWorkout($data = null)`

Create a new `PlannedWorkoutEntity` instance. Pass `null` for no initial data.

#### `Sleep($data = null)`

Create a new `SleepEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `Workout($data = null)`

Create a new `WorkoutEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): TerraUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ActivityEntity

```php
$activity = $client->Activity();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Activity()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ActivityEntity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AthleteEntity

```php
$athlete = $client->Athlete();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Athlete()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AthleteEntity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AuthenticationEntity

```php
$authentication = $client->Authentication();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Authentication()->create([
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Authentication()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AuthenticationEntity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BodyEntity

```php
$body = $client->Body();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Body()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BodyEntity`

Create a new `BodyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BulkUserInfoEntity

```php
$bulk_user_info = $client->BulkUserInfo();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BulkUserInfo()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BulkUserInfoEntity`

Create a new `BulkUserInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DailyEntity

```php
$daily = $client->Daily();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Daily()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DailyEntity`

Create a new `DailyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IntegrationEntity

```php
$integration = $client->Integration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | No | Whether the integration is enabled |
| `icon` | `string` | No | URL for the provider's icon image |
| `name` | `string` | No | Display name of the integration |
| `provider` | `string` | No | Identifier for the provider |
| `providers` | `array` | No |  |
| `sdk_providers` | `array` | No | Providers available through Terra's mobile SDKs rather than cloud connections |
| `setup` | `string` | No | Indicates how the integration is set up |
| `status` | `string` | No |  |
| `types` | `array` | No | Indicates the types of data available through the provider |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Integration()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IntegrationEntity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LabReportEntity

```php
$lab_report = $client->LabReport();
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
| `panels` | `array` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | No | Your external reference; omitted if not set. |
| `report_date` | `string` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` | No |  |
| `report_notes` | `string` | No |  |
| `report_time` | `string` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Yes | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `array` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `array` | No |  |
| `updated_at` | `string` | No |  |
| `upload_id` | `string` | No |  |
| `uploaded_at` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->LabReport()->create([
  "current_status" => null, // string
  "report_type" => null, // string
  "session_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LabReport()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->LabReport()->load(["id" => "lab_report_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->LabReport()->remove(["id" => "lab_report_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LabReportEntity`

Create a new `LabReportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LabReportDeliveryEntity

```php
$lab_report_delivery = $client->LabReportDelivery();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LabReportDelivery()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LabReportDeliveryEntity`

Create a new `LabReportDeliveryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LabReportFileEntity

```php
$lab_report_file = $client->LabReportFile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | `string` | No |  |
| `presigned_url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LabReportFile()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LabReportFileEntity`

Create a new `LabReportFileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MenstruationEntity

```php
$menstruation = $client->Menstruation();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Menstruation()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MenstruationEntity`

Create a new `MenstruationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NutritionEntity

```php
$nutrition = $client->Nutrition();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Nutrition()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NutritionEntity`

Create a new `NutritionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlannedWorkoutEntity

```php
$planned_workout = $client->PlannedWorkout();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `mixed` | No |  |
| `coercion_warnings` | `string` | No | Set when the template could not be represented exactly on the provider. |
| `created_at` | `mixed` | No | Creation time (RFC 3339) |
| `details` | `mixed` | No | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `bool` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `mixed` | No | Last update time (RFC 3339) |
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PlannedWorkout()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PlannedWorkout()->load(["id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->PlannedWorkout()->update([
  "id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlannedWorkoutEntity`

Create a new `PlannedWorkoutEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SleepEntity

```php
$sleep = $client->Sleep();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Sleep()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SleepEntity`

Create a new `SleepEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->User()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkoutEntity

```php
$workout = $client->Workout();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the workout |
| `environment` | `mixed` | No |  |
| `estimated_calories` | `mixed` | No | Estimated calories burned |
| `estimated_distance_meters` | `mixed` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `mixed` | No | Estimated total duration in seconds |
| `ftp` | `float` | No | Functional Threshold Power in watts |
| `max_heart_rate` | `float` | No | Maximum heart rate in BPM |
| `name` | `string` | Yes | Name of the workout |
| `planned_date` | `string` | Yes | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `mixed` | No | Pool length in meters, for swim workouts |
| `sport` | `mixed` | Yes | Sport a workout template targets. |
| `status` | `string` | No |  |
| `step_blocks` | `array` | Yes |  |
| `threshold_heart_rate` | `float` | No | Threshold heart rate in BPM |
| `threshold_speed` | `float` | No | Threshold speed in m/s |
| `workout_id` | `string` | No | Terra identifier of the stored template. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Workout()->create([
  "name" => null, // string
  "planned_date" => null, // string
  "sport" => null, // mixed
  "step_blocks" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Workout()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Workout()->load(["id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Workout()->remove(["planned_workout_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkoutEntity`

Create a new `WorkoutEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new TerraSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

