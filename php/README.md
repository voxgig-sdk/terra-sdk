# Terra PHP SDK



The PHP SDK for the Terra API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Activity()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/terra-sdk/releases](https://github.com/voxgig-sdk/terra-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'terra_sdk.php';

$client = new TerraSDK([
    "apikey" => getenv("TERRA_APIKEY"),
]);
```

### 3. Load an activity

```php
try {
    // load() returns the ENTITY — call data_get() for the Activity record (throws on error).
    $activity = $client->Activity()->load();
    print_r($activity);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $activity = $client->Activity()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = TerraSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$activity = $client->Activity()->load();
print_r($activity);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new TerraSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
TERRA_TEST_LIVE=TRUE
TERRA_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### TerraSDK

```php
require_once 'terra_sdk.php';
$client = new TerraSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = TerraSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### TerraSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Activity` | `($data): ActivityEntity` | Create an Activity entity instance. |
| `Athlete` | `($data): AthleteEntity` | Create an Athlete entity instance. |
| `Authentication` | `($data): AuthenticationEntity` | Create an Authentication entity instance. |
| `Body` | `($data): BodyEntity` | Create a Body entity instance. |
| `BulkUserInfo` | `($data): BulkUserInfoEntity` | Create a BulkUserInfo entity instance. |
| `Daily` | `($data): DailyEntity` | Create a Daily entity instance. |
| `Integration` | `($data): IntegrationEntity` | Create an Integration entity instance. |
| `LabReport` | `($data): LabReportEntity` | Create a LabReport entity instance. |
| `LabReportDelivery` | `($data): LabReportDeliveryEntity` | Create a LabReportDelivery entity instance. |
| `LabReportFile` | `($data): LabReportFileEntity` | Create a LabReportFile entity instance. |
| `Menstruation` | `($data): MenstruationEntity` | Create a Menstruation entity instance. |
| `Nutrition` | `($data): NutritionEntity` | Create a Nutrition entity instance. |
| `PlannedWorkout` | `($data): PlannedWorkoutEntity` | Create a PlannedWorkout entity instance. |
| `Sleep` | `($data): SleepEntity` | Create a Sleep entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |
| `Workout` | `($data): WorkoutEntity` | Create a Workout entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$activity = $client->Activity();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Activity record (throws on error).
$activity = $client->Activity()->load();
```


### Athlete

Create an instance: `$athlete = $client->Athlete();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Athlete record (throws on error).
$athlete = $client->Athlete()->load();
```


### Authentication

Create an instance: `$authentication = $client->Authentication();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_failure_redirect_url` | `string` | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `string` | URL the user is redirected to upon successful authentication |
| `auth_url` | `string` | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `int` | a number in seconds depicting how long the url is valid for |
| `language` | `string` | Display language of the widget |
| `providers` | `string` | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `string` | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `string` | Session ID for the widget authentication session |
| `status` | `string` | indicates that the request was successful |
| `token` | `string` |  |
| `url` | `string` | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `string` | User ID for the user being created |

#### Example: Create

```php
$authentication = $client->Authentication()->create([
]);
```


### Body

Create an instance: `$body = $client->Body();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Body record (throws on error).
$body = $client->Body()->load();
```


### BulkUserInfo

Create an instance: `$bulk_user_info = $client->BulkUserInfo();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$bulk_user_info = $client->BulkUserInfo()->create([
]);
```


### Daily

Create an instance: `$daily = $client->Daily();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Daily record (throws on error).
$daily = $client->Daily()->load();
```


### Integration

Create an instance: `$integration = $client->Integration();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` | Whether the integration is enabled |
| `icon` | `string` | URL for the provider's icon image |
| `name` | `string` | Display name of the integration |
| `provider` | `string` | Identifier for the provider |
| `setup` | `string` | Indicates how the integration is set up |
| `types` | `array` | Indicates the types of data available through the provider |

#### Example: List

```php
// list() returns an array of Integration records (throws on error).
$integrations = $client->Integration()->list();
```


### LabReport

Create an instance: `$lab_report = $client->LabReport();`

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
| `collection_date` | `string` | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `string` | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `string` | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `int` |  |
| `input_bytes` | `int` |  |
| `lab_name` | `string` |  |
| `output_bytes` | `int` |  |
| `panels` | `array` | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | Your external reference; omitted if not set. |
| `report_date` | `string` | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` |  |
| `report_notes` | `string` |  |
| `report_time` | `string` | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `array` | The layered biomarker results. |
| `results_count` | `int` |  |
| `session_id` | `string` |  |
| `status_history` | `array` |  |
| `updated_at` | `string` |  |
| `upload_id` | `string` |  |
| `uploaded_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LabReport record (throws on error).
$lab_report = $client->LabReport()->load(["id" => "lab_report_id"]);
```

#### Example: List

```php
// list() returns an array of LabReport records (throws on error).
$lab_reports = $client->LabReport()->list();
```

#### Example: Create

```php
$lab_report = $client->LabReport()->create([
    "current_status" => null, // string
    "report_type" => null, // string
    "session_id" => null, // string
]);
```


### LabReportDelivery

Create an instance: `$lab_report_delivery = $client->LabReportDelivery();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `int` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `string` |  |
| `destination_type` | `string` | The destination's type (e.g. |
| `last_error` | `string` | Most recent delivery error; omitted when delivered. |
| `status` | `string` | pending, delivered, or failed. |

#### Example: List

```php
// list() returns an array of LabReportDelivery records (throws on error).
$lab_report_deliverys = $client->LabReportDelivery()->list();
```


### LabReportFile

Create an instance: `$lab_report_file = $client->LabReportFile();`

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

```php
// list() returns an array of LabReportFile records (throws on error).
$lab_report_files = $client->LabReportFile()->list();
```


### Menstruation

Create an instance: `$menstruation = $client->Menstruation();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Menstruation record (throws on error).
$menstruation = $client->Menstruation()->load();
```


### Nutrition

Create an instance: `$nutrition = $client->Nutrition();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Nutrition record (throws on error).
$nutrition = $client->Nutrition()->load();
```


### PlannedWorkout

Create an instance: `$planned_workout = $client->PlannedWorkout();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `athlete_metrics` | `mixed` |  |
| `coercion_warnings` | `string` | Set when the template could not be represented exactly on the provider. |
| `created_at` | `mixed` | Creation time (RFC 3339) |
| `details` | `mixed` | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `bool` | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `mixed` | Last update time (RFC 3339) |
| `planned_date` | `string` | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `string` | Terra identifier of the planned workout |
| `provider_workout_id` | `string` | Identifier assigned by the provider, once pushed. |
| `workout_id` | `string` | Identifier of the source template. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PlannedWorkout record (throws on error).
$planned_workout = $client->PlannedWorkout()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of PlannedWorkout records (throws on error).
$planned_workouts = $client->PlannedWorkout()->list();
```


### Sleep

Create an instance: `$sleep = $client->Sleep();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Sleep record (throws on error).
$sleep = $client->Sleep()->load();
```


### User

Create an instance: `$user = $client->User();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
$user = $client->User()->load();
```


### Workout

Create an instance: `$workout = $client->Workout();`

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
| `description` | `string` | Description of the workout |
| `environment` | `mixed` |  |
| `estimated_calories` | `mixed` | Estimated calories burned |
| `estimated_distance_meters` | `mixed` | Estimated total distance in meters |
| `estimated_duration_seconds` | `mixed` | Estimated total duration in seconds |
| `ftp` | `float` | Functional Threshold Power in watts |
| `max_heart_rate` | `float` | Maximum heart rate in BPM |
| `name` | `string` | Name of the workout |
| `planned_date` | `string` | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `mixed` | Pool length in meters, for swim workouts |
| `sport` | `mixed` | Sport a workout template targets. |
| `status` | `string` |  |
| `step_blocks` | `array` |  |
| `threshold_heart_rate` | `float` | Threshold heart rate in BPM |
| `threshold_speed` | `float` | Threshold speed in m/s |
| `workout_id` | `string` | Terra identifier of the stored template. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Workout record (throws on error).
$workout = $client->Workout()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Workout records (throws on error).
$workouts = $client->Workout()->list();
```

#### Example: Create

```php
$workout = $client->Workout()->create([
    "name" => null, // string
    "planned_date" => null, // string
    "sport" => null, // mixed
    "step_blocks" => null, // array
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── terra_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`terra_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$activity = $client->Activity();
$activity->load();

// $activity->data_get() now returns the activity data from the last load
// $activity->match_get() returns the last match criteria
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
