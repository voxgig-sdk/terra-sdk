# Terra TypeScript SDK Reference

Complete API reference for the Terra TypeScript SDK.


## TerraSDK

### Constructor

```ts
new TerraSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TerraSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TerraSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TerraSDK` instance in test mode.


### Instance Methods

#### `Activity(data?: object)`

Create a new `Activity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActivityEntity` instance.

#### `Athlete(data?: object)`

Create a new `Athlete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AthleteEntity` instance.

#### `Authentication(data?: object)`

Create a new `Authentication` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthenticationEntity` instance.

#### `Body(data?: object)`

Create a new `Body` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BodyEntity` instance.

#### `BulkUserInfo(data?: object)`

Create a new `BulkUserInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BulkUserInfoEntity` instance.

#### `Daily(data?: object)`

Create a new `Daily` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DailyEntity` instance.

#### `Integration(data?: object)`

Create a new `Integration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntegrationEntity` instance.

#### `LabReport(data?: object)`

Create a new `LabReport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LabReportEntity` instance.

#### `LabReportDelivery(data?: object)`

Create a new `LabReportDelivery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LabReportDeliveryEntity` instance.

#### `LabReportFile(data?: object)`

Create a new `LabReportFile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LabReportFileEntity` instance.

#### `Menstruation(data?: object)`

Create a new `Menstruation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MenstruationEntity` instance.

#### `Nutrition(data?: object)`

Create a new `Nutrition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NutritionEntity` instance.

#### `PlannedWorkout(data?: object)`

Create a new `PlannedWorkout` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlannedWorkoutEntity` instance.

#### `Sleep(data?: object)`

Create a new `Sleep` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SleepEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `Workout(data?: object)`

Create a new `Workout` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkoutEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TerraSDK.test()`.

**Returns:** `TerraSDK` instance in test mode.


---

## ActivityEntity

```ts
const activity = client.Activity()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Activity().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActivityEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AthleteEntity

```ts
const athlete = client.Athlete()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Athlete().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AthleteEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AuthenticationEntity

```ts
const authentication = client.Authentication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_failure_redirect_url` | `string` | No | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `string` | No | URL the user is redirected to upon successful authentication |
| `auth_url` | `string` | No | authentication URL the user must be redirected to in order to link their account |
| `expires_in` | `number` | No | a number in seconds depicting how long the url is valid for |
| `language` | `string` | No | Display language of the widget |
| `providers` | `string` | No | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `string` | No | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `string` | No | Session ID for the widget authentication session |
| `status` | `string` | No | indicates that the request was successful |
| `token` | `string` | No |  |
| `url` | `string` | No | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `string` | No | User ID for the user being created |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Authentication().create({
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Authentication().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BodyEntity

```ts
const body = client.Body()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Body().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BodyEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BulkUserInfoEntity

```ts
const bulk_user_info = client.BulkUserInfo()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BulkUserInfo().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BulkUserInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DailyEntity

```ts
const daily = client.Daily()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Daily().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DailyEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntegrationEntity

```ts
const integration = client.Integration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | No | Whether the integration is enabled |
| `icon` | `string` | No | URL for the provider's icon image |
| `name` | `string` | No | Display name of the integration |
| `provider` | `string` | No | Identifier for the provider |
| `providers` | `any[]` | No |  |
| `sdk_providers` | `any[]` | No | Providers available through Terra's mobile SDKs rather than cloud connections |
| `setup` | `string` | No | Indicates how the integration is set up |
| `status` | `string` | No |  |
| `types` | `Record<string, any>` | No | Indicates the types of data available through the provider |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `detailed` | `/integrations/detailed` | `client.Integration().list({ $action: 'detailed', ... })` |

An action returns that action's OWN response, which is not necessarily a
Integration record — check the API definition for its shape.

```ts
const result = await client.Integration().list({
  $action: 'detailed',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Integration().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LabReportEntity

```ts
const lab_report = client.LabReport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_date` | `string` | No | Specimen collection date (YYYY-MM-DD); omitted if not extracted. |
| `collection_time` | `string` | No | Specimen collection time (HH:MM, 24-hour); omitted if not extracted. |
| `current_status` | `string` | Yes | Current status as a clean lowercase string (open enum), e.g. |
| `file_count` | `number` | No |  |
| `input_bytes` | `number` | No |  |
| `lab_name` | `string` | No |  |
| `output_bytes` | `number` | No |  |
| `panels` | `any[]` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `number` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | No | Your external reference; omitted if not set. |
| `report_date` | `string` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` | No |  |
| `report_notes` | `string` | No |  |
| `report_time` | `string` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Yes | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `any[]` | No | The layered biomarker results. |
| `results_count` | `number` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `any[]` | No |  |
| `updated_at` | `string` | No |  |
| `upload_id` | `string` | No |  |
| `uploaded_at` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.LabReport().create({
  current_status: 'example_current_status',
  report_type: 'example_report_type',
  session_id: 'example_session_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LabReport().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LabReport().load({ id: 'lab_report_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.LabReport().remove({ id: 'lab_report_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LabReportEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LabReportDeliveryEntity

```ts
const lab_report_delivery = client.LabReportDelivery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt_count` | `number` | Yes | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `string` | Yes |  |
| `destination_type` | `string` | No | The destination's type (e.g. |
| `last_error` | `string` | No | Most recent delivery error; omitted when delivered. |
| `status` | `string` | Yes | pending, delivered, or failed. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LabReportDelivery().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LabReportDeliveryEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LabReportFileEntity

```ts
const lab_report_file = client.LabReportFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | `string` | No |  |
| `presigned_url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LabReportFile().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LabReportFileEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MenstruationEntity

```ts
const menstruation = client.Menstruation()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Menstruation().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MenstruationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NutritionEntity

```ts
const nutrition = client.Nutrition()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Nutrition().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NutritionEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlannedWorkoutEntity

```ts
const planned_workout = client.PlannedWorkout()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `any` | No |  |
| `coercion_warnings` | `string` | No | Set when the template could not be represented exactly on the provider. |
| `created_at` | `any` | No | Creation time (RFC 3339) |
| `details` | `any` | No | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `boolean` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `any` | No | Last update time (RFC 3339) |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PlannedWorkout().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PlannedWorkout().load({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.PlannedWorkout().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlannedWorkoutEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SleepEntity

```ts
const sleep = client.Sleep()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Sleep().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SleepEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.User().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkoutEntity

```ts
const workout = client.Workout()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the workout |
| `environment` | `any` | No |  |
| `estimated_calories` | `any` | No | Estimated calories burned |
| `estimated_distance_meters` | `any` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `any` | No | Estimated total duration in seconds |
| `ftp` | `number` | No | Functional Threshold Power in watts |
| `max_heart_rate` | `number` | No | Maximum heart rate in BPM |
| `name` | `string` | Yes | Name of the workout |
| `planned_date` | `string` | Yes | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `any` | No | Pool length in meters, for swim workouts |
| `sport` | `any` | Yes | Sport a workout template targets. |
| `status` | `string` | No |  |
| `step_blocks` | `any[]` | Yes |  |
| `threshold_heart_rate` | `number` | No | Threshold heart rate in BPM |
| `threshold_speed` | `number` | No | Threshold speed in m/s |
| `workout_id` | `string` | No | Terra identifier of the stored template. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `plan` | `/workouts/{workout_id}/plan` | `client.Workout().create({ $action: 'plan', ... })` |

An action returns that action's OWN response, which is not necessarily a
Workout record — check the API definition for its shape.

```ts
const result = await client.Workout().create({
  $action: 'plan',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Workout().create({
  name: 'example_name',
  planned_date: 'example_planned_date',
  sport: 'example_sport',
  step_blocks: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Workout().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Workout().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Workout().remove({ planned_workout_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkoutEntity` instance with the same client and
options.

#### `client()`

Return the parent `TerraSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new TerraSDK({
  feature: {
    test: { active: true },
  }
})
```

