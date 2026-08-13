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
| `auth_failure_redirect_url` |  |
| `auth_success_redirect_url` |  |
| `auth_url` |  |
| `expires_in` |  |
| `language` |  |
| `providers` |  |
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
| `types` |  |

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
| `panels` |  |
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
| `details` |  |
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
| `auth_failure_redirect_url` | `string` |  |
| `auth_success_redirect_url` | `string` |  |
| `auth_url` | `string` |  |
| `expires_in` | `int` |  |
| `language` | `string` |  |
| `providers` | `string` |  |
| `reference_id` | `string` |  |
| `session_id` | `string` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `url` | `string` |  |
| `user_id` | `string` |  |

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
| `enabled` | `bool` |  |
| `icon` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `setup` | `string` |  |
| `types` | `array` |  |

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
| `collection_date` | `string` |  |
| `collection_time` | `string` |  |
| `current_status` | `string` |  |
| `file_count` | `int` |  |
| `input_bytes` | `int` |  |
| `lab_name` | `string` |  |
| `output_bytes` | `int` |  |
| `panels` | `array` |  |
| `patient_age_at_collection` | `int` |  |
| `patient_sex` | `string` |  |
| `reference_id` | `string` |  |
| `report_date` | `string` |  |
| `report_locale` | `string` |  |
| `report_notes` | `string` |  |
| `report_time` | `string` |  |
| `report_type` | `string` |  |
| `results` | `array` |  |
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
| `attempt_count` | `int` |  |
| `destination_id` | `string` |  |
| `destination_type` | `string` |  |
| `last_error` | `string` |  |
| `status` | `string` |  |

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
| `coercion_warnings` | `string` |  |
| `created_at` | `mixed` |  |
| `details` | `mixed` |  |
| `is_external` | `bool` |  |
| `last_updated_at` | `mixed` |  |
| `planned_date` | `string` |  |
| `planned_workout_id` | `string` |  |
| `provider_workout_id` | `string` |  |
| `workout_id` | `string` |  |

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
| `description` | `string` |  |
| `environment` | `mixed` |  |
| `estimated_calories` | `mixed` |  |
| `estimated_distance_meters` | `mixed` |  |
| `estimated_duration_seconds` | `mixed` |  |
| `ftp` | `float` |  |
| `max_heart_rate` | `float` |  |
| `name` | `string` |  |
| `planned_date` | `string` |  |
| `pool_length_meters` | `mixed` |  |
| `sport` | `mixed` |  |
| `status` | `string` |  |
| `step_blocks` | `array` |  |
| `threshold_heart_rate` | `float` |  |
| `threshold_speed` | `float` |  |
| `workout_id` | `string` |  |

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
