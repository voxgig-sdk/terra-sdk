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

#### `LabReportSession($data = null)`

Create a new `LabReportSessionEntity` instance. Pass `null` for no initial data.

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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Activity()->load(["start_date" => "start_date", "user_id" => "user_id"]);
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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Athlete()->load(["user_id" => "user_id"]);
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
| `apple_app_url` | `string` | No | URL of your own iOS app to hand Apple Health connections to, instead of the Terra mobile app |
| `auth_failure_redirect_url` | `string` | No | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `string` | No | URL the user is redirected to upon successful authentication. |
| `auth_url` | `string` | No | authentication URL the user must be redirected to in order to link their account |
| `bypass_feedback` | `bool` | No | When false, the user stays on the widget's own result screen instead of being redirected immediately |
| `connected_uids` | `array` | No | Terra user IDs already connected for this end user; their providers show as connected with a disconnect option |
| `expires_in` | `int` | No | a number in seconds depicting how long the url is valid for |
| `language` | `string` | No | forces the widget UI language (e.g. |
| `multi_auth` | `bool` | No | Keep the user on the widget after each successful connection so they can connect several providers in one session |
| `providers` | `string` | No | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `string` | No | Identifier of the end user on your system, such as a user ID or email associated with them |
| `samsung_app_url` | `string` | No | URL of your own Android app to hand Samsung Health connections to |
| `sdk_app` | `string` | No | Which Terra reference app an SDK authentication link hands the end user to. |
| `session_id` | `string` | No | Session ID for the widget authentication session |
| `show_disconnect` | `bool` | No | Show disconnect buttons for providers already connected under reference_id |
| `status` | `string` | No | indicates that the request was successful |
| `token` | `string` | No |  |
| `url` | `string` | No | the widget URL the user must be redirected to in order to link their account |
| `use_terra_avengers_app` | `bool` | No | Allow Apple Health connections through the Terra mobile app |
| `user_id` | `string` | No | User ID for the user being created |
| `warnings` | `array` | No | present when part of the request could not be honoured, such as requested providers that are unknown or not enabled |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Authentication()->create([
  "resource" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Authentication()->remove(["user_id" => "user_id"]);
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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Body()->load(["start_date" => "start_date", "user_id" => "user_id"]);
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulk_user_infos` | `array` | No | List of user IDs to get information for |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Daily()->load(["start_date" => "start_date", "user_id" => "user_id"]);
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
| `providers` | `array` | No |  |
| `sdk_providers` | `array` | No | Providers available through Terra's mobile SDKs rather than cloud connections |
| `status` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

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
| `collection_date` | `string` | No | Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `string` | No | Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `string` | Yes | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `int` | No |  |
| `id` | `string` | No |  |
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
| `report_type` | `string` | Yes | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `array` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `array` | No |  |
| `updated_at` | `string` | No |  |
| `upload_id` | `string` | No | Durable correlation key for the upload; every resulting session and webhook carries it. |
| `uploaded_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `collection_date` | - | - | - | - |
| `collection_time` | - | - | - | - |
| `current_status` | - | - | - | - |
| `file_count` | - | - | - | - |
| `id` | - | - | - | - |
| `input_bytes` | - | - | - | - |
| `lab_name` | - | - | - | - |
| `output_bytes` | - | - | - | - |
| `panels` | - | - | - | - |
| `patient_age_at_collection` | - | - | - | - |
| `patient_sex` | - | - | - | - |
| `reference_id` | - | - | - | - |
| `report_date` | - | - | - | - |
| `report_locale` | - | - | - | - |
| `report_notes` | - | - | - | - |
| `report_time` | - | - | - | - |
| `report_type` | - | - | - | - |
| `results` | - | - | - | - |
| `results_count` | - | - | - | - |
| `session_id` | - | - | - | - |
| `status_history` | - | - | - | - |
| `updated_at` | - | - | - | - |
| `upload_id` | - | - | Yes | - |
| `uploaded_at` | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LabReport()->create([
  "current_status" => null, // string
  "report_type" => null, // string
  "session_id" => null, // string
]);
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LabReport()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LabReport()->load(["id" => "lab_report_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

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
| `id` | `string` | No |  |
| `last_error` | `string` | No | Most recent delivery error; omitted when delivered. |
| `status` | `string` | Yes | pending, delivered, or failed. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LabReportDelivery()->list(["id" => "example"]);
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
| `id` | `string` | No |  |
| `presigned_url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LabReportFile()->list(["id" => "example"]);
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

## LabReportSessionEntity

```php
$lab_report_session = $client->LabReportSession();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_date` | `string` | No | Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `string` | No | Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted. |
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
| `report_type` | `string` | Yes | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `array` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `array` | No |  |
| `updated_at` | `string` | No |  |
| `upload_id` | `string` | No | Durable correlation key for the upload; every resulting session and webhook carries it. |
| `uploaded_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `collection_date` | - | - | - |
| `collection_time` | - | - | - |
| `current_status` | - | - | - |
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
| `upload_id` | - | - | Yes |
| `uploaded_at` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LabReportSession()->create([
  "current_status" => null, // string
  "report_type" => null, // string
  "session_id" => null, // string
]);
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LabReportSession()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LabReportSession()->load(["session_id" => "session_id"]);
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

#### `make(): LabReportSessionEntity`

Create a new `LabReportSessionEntity` instance with the same client and
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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Menstruation()->load(["start_date" => "start_date", "user_id" => "user_id"]);
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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Nutrition()->load(["start_date" => "start_date", "user_id" => "user_id"]);
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
| `athlete_metrics` | `mixed` | Yes |  |
| `coercion_warnings` | `string` | No | Deprecated; use warnings. |
| `completed_at` | `mixed` | No | Time the session was reported complete by the user's device. |
| `created_at` | `mixed` | Yes | Creation time (RFC 3339). |
| `details` | `mixed` | Yes | Deprecated. |
| `id` | `string` | No |  |
| `is_external` | `bool` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `mixed` | Yes | Last update time (RFC 3339). |
| `planned_date` | `string` | No | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `string` | No | Terra identifier of the planned workout. |
| `provider_workout_id` | `string` | No | Identifier assigned by the provider, once pushed. |
| `warnings` | `array` | No | Adjustments made when the template could not be represented exactly on the provider. |
| `workout` | `mixed` | No | The workout body, as on the list. |
| `workout_id` | `string` | No | Identifier of the source template. |

### Field Usage by Operation

| Field | load | list | update |
| --- | --- | --- | --- |
| `athlete_metrics` | - | - | - |
| `coercion_warnings` | - | Yes | - |
| `completed_at` | - | Yes | - |
| `created_at` | - | - | - |
| `details` | - | - | - |
| `id` | - | - | - |
| `is_external` | - | Yes | - |
| `last_updated_at` | - | - | - |
| `planned_date` | - | Yes | Yes |
| `planned_workout_id` | - | Yes | - |
| `provider_workout_id` | - | Yes | - |
| `warnings` | - | Yes | - |
| `workout` | - | Yes | - |
| `workout_id` | - | Yes | - |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PlannedWorkout()->list(["user_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PlannedWorkout()->load(["id" => 1, "user_id" => "user_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->PlannedWorkout()->update([
  "id" => 1,
  "user_id" => "user_id",
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

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Sleep()->load(["start_date" => "start_date", "user_id" => "user_id"]);
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `max_page` | `int` | No | Total number of pages available for the requested page size |
| `next` | `mixed` | No | The next page number, or null if there is no next page |
| `results` | `array` | No |  |
| `status` | `string` | No |  |
| `users` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->User()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `estimated_intensity_factor` | `mixed` | No | Planned intensity factor (0-5), where the provider or author supplies one. |
| `estimated_tss` | `mixed` | No | Planned training stress score (0-9999), where the provider or author supplies one. |
| `id` | `string` | No |  |
| `name` | `string` | Yes | Name of the workout |
| `pool_length_meters` | `mixed` | No | Pool length in meters, for swim workouts |
| `sport` | `mixed` | Yes | Sport a workout template targets. |
| `status` | `string` | No |  |
| `step_blocks` | `array` | Yes |  |
| `workout_id` | `string` | No | Terra identifier of the stored template. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Workout()->create([
  "name" => null, // string
  "sport" => null, // mixed
  "step_blocks" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Workout()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Workout()->load(["id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Workout()->remove(["planned_workout_id" => 1, "user_id" => "user_id"]);
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
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new TerraSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
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

