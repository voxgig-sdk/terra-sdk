# Terra JavaScript SDK



The JavaScript SDK for the Terra API — an entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Activity()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```js
npm install terra
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.


### Create a Client

```js
const { TerraSDK } = require('@voxgig-sdk/terra-js')

const client = new TerraSDK({
  apikey: process.env.TERRA_APIKEY,
})
```

### Load an Activity

```js
const activity = await client.Activity().load()
console.log(activity)
```

### Direct API Access

Use `client.direct()` to call any API endpoint directly:

```js
const result = await client.direct({
  path: '/custom/endpoint/{id}',
  method: 'GET',
  params: { id: 'abc123' },
})

if (result.ok) {
  console.log(result.data)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const activity = await client.Activity().load()
  console.log(activity)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```js
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```js
const client = TerraSDK.test()

const activity = await client.Activity().load()
// activity is the entity, populated with mock response data
// — call activity.data() for the record itself
console.log(activity)
```

You can also use the instance method:

```js
const client = new TerraSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```js
const entity = client.Activity()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```js
const logger = {
  hooks: {
    PreRequest: (ctx) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TerraSDK({
  apikey: '...',
  extend: [logger],
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
cd js && npm test
```


## Reference

### TerraSDK

#### Constructor

```js
new TerraSDK(options?)
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Activity(data?)` | `ActivityEntity` | Create an Activity entity instance. |
| `Athlete(data?)` | `AthleteEntity` | Create an Athlete entity instance. |
| `Authentication(data?)` | `AuthenticationEntity` | Create an Authentication entity instance. |
| `Body(data?)` | `BodyEntity` | Create a Body entity instance. |
| `BulkUserInfo(data?)` | `BulkUserInfoEntity` | Create a BulkUserInfo entity instance. |
| `Daily(data?)` | `DailyEntity` | Create a Daily entity instance. |
| `Integration(data?)` | `IntegrationEntity` | Create an Integration entity instance. |
| `LabReport(data?)` | `LabReportEntity` | Create a LabReport entity instance. |
| `LabReportDelivery(data?)` | `LabReportDeliveryEntity` | Create a LabReportDelivery entity instance. |
| `LabReportFile(data?)` | `LabReportFileEntity` | Create a LabReportFile entity instance. |
| `Menstruation(data?)` | `MenstruationEntity` | Create a Menstruation entity instance. |
| `Nutrition(data?)` | `NutritionEntity` | Create a Nutrition entity instance. |
| `PlannedWorkout(data?)` | `PlannedWorkoutEntity` | Create a PlannedWorkout entity instance. |
| `Sleep(data?)` | `SleepEntity` | Create a Sleep entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `Workout(data?)` | `WorkoutEntity` | Create a Workout entity instance. |
| `tester(testopts?, sdkopts?)` | `TerraSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TerraSDK.test(testopts?, sdkopts?)` | `TerraSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TerraSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `undefined`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```js
{
  ok: true,
  status: 200,
  headers: {},
  data: {}
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```js
{
  url: 'string',
  method: 'string',
  headers: {},
  body: undefined
}
```

### Entities

#### Activity

| Field | Description |
| --- | --- |

Operations: load.

API path: `/activity`

#### Athlete

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: create, remove.

API path: `/auth/authenticateUser`

#### Body

| Field | Description |
| --- | --- |

Operations: load.

API path: `/body`

#### BulkUserInfo

| Field | Description |
| --- | --- |

Operations: create.

API path: `/bulkUserInfo`

#### Daily

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

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

Operations: create, list, load, remove.

API path: `/lab-reports`

#### LabReportDelivery

| Field | Description |
| --- | --- |
| `attempt_count` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` |  |
| `destination_type` | The destination's type (e.g. |
| `last_error` | Most recent delivery error; omitted when delivered. |
| `status` | pending, delivered, or failed. |

Operations: list.

API path: `/lab-reports/{session_id}/deliveries`

#### LabReportFile

| Field | Description |
| --- | --- |
| `filename` |  |
| `presigned_url` |  |

Operations: list.

API path: `/lab-reports/{session_id}/files`

#### Menstruation

| Field | Description |
| --- | --- |

Operations: load.

API path: `/menstruation`

#### Nutrition

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list, load, update.

API path: `/plannedWorkouts`

#### Sleep

| Field | Description |
| --- | --- |

Operations: load.

API path: `/sleep`

#### User

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: create, list, load, remove.

API path: `/workouts/{workout_id}/plan`



## Entities


### Activity

Create an instance: `const activity = client.Activity()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const activity = await client.Activity().load()
```


### Athlete

Create an instance: `const athlete = client.Athlete()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const athlete = await client.Athlete().load()
```


### Authentication

Create an instance: `const authentication = client.Authentication()`

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
| `expires_in` | `number` | a number in seconds depicting how long the url is valid for |
| `language` | `string` | Display language of the widget |
| `providers` | `string` | Comma separated list of providers to display on the device selection page. |
| `reference_id` | `string` | Identifier of the end user on your system, such as a user ID or email associated with them |
| `session_id` | `string` | Session ID for the widget authentication session |
| `status` | `string` | indicates that the request was successful |
| `token` | `string` |  |
| `url` | `string` | the widget URL the user must be redirected to in order to link their account |
| `user_id` | `string` | User ID for the user being created |

#### Example: Create

```ts
const authentication = await client.Authentication().create({
})
```


### Body

Create an instance: `const body = client.Body()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const body = await client.Body().load()
```


### BulkUserInfo

Create an instance: `const bulk_user_info = client.BulkUserInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const bulk_user_info = await client.BulkUserInfo().create({
})
```


### Daily

Create an instance: `const daily = client.Daily()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const daily = await client.Daily().load()
```


### Integration

Create an instance: `const integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean` | Whether the integration is enabled |
| `icon` | `string` | URL for the provider's icon image |
| `name` | `string` | Display name of the integration |
| `provider` | `string` | Identifier for the provider |
| `setup` | `string` | Indicates how the integration is set up |
| `types` | `Object` | Indicates the types of data available through the provider |

#### Example: List

```ts
const integrations = await client.Integration().list()
```


### LabReport

Create an instance: `const lab_report = client.LabReport()`

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
| `file_count` | `number` |  |
| `input_bytes` | `number` |  |
| `lab_name` | `string` |  |
| `output_bytes` | `number` |  |
| `panels` | `Array` | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `number` | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | Your external reference; omitted if not set. |
| `report_date` | `string` | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` |  |
| `report_notes` | `string` |  |
| `report_time` | `string` | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Report type as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `Array` | The layered biomarker results. |
| `results_count` | `number` |  |
| `session_id` | `string` |  |
| `status_history` | `Array` |  |
| `updated_at` | `string` |  |
| `upload_id` | `string` |  |
| `uploaded_at` | `string` |  |

#### Example: Load

```ts
const lab_report = await client.LabReport().load({ id: 'lab_report_id' })
```

#### Example: List

```ts
const lab_reports = await client.LabReport().list()
```

#### Example: Create

```ts
const lab_report = await client.LabReport().create({
  current_status: 'example_current_status',
  report_type: 'example_report_type',
  session_id: 'example_session_id',
})
```


### LabReportDelivery

Create an instance: `const lab_report_delivery = client.LabReportDelivery()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `number` | Retry count — 0 on the first attempt, incremented per retry. |
| `destination_id` | `string` |  |
| `destination_type` | `string` | The destination's type (e.g. |
| `last_error` | `string` | Most recent delivery error; omitted when delivered. |
| `status` | `string` | pending, delivered, or failed. |

#### Example: List

```ts
const lab_report_deliverys = await client.LabReportDelivery().list({ id: "example" })
```


### LabReportFile

Create an instance: `const lab_report_file = client.LabReportFile()`

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

```ts
const lab_report_files = await client.LabReportFile().list({ id: "example" })
```


### Menstruation

Create an instance: `const menstruation = client.Menstruation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const menstruation = await client.Menstruation().load()
```


### Nutrition

Create an instance: `const nutrition = client.Nutrition()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nutrition = await client.Nutrition().load()
```


### PlannedWorkout

Create an instance: `const planned_workout = client.PlannedWorkout()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `athlete_metrics` | `*` |  |
| `coercion_warnings` | `string` | Set when the template could not be represented exactly on the provider. |
| `created_at` | `*` | Creation time (RFC 3339) |
| `details` | `*` | Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. |
| `is_external` | `boolean` | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `*` | Last update time (RFC 3339) |
| `planned_date` | `string` | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `string` | Terra identifier of the planned workout |
| `provider_workout_id` | `string` | Identifier assigned by the provider, once pushed. |
| `workout_id` | `string` | Identifier of the source template. |

#### Example: Load

```ts
const planned_workout = await client.PlannedWorkout().load({ id: 1 })
```

#### Example: List

```ts
const planned_workouts = await client.PlannedWorkout().list()
```


### Sleep

Create an instance: `const sleep = client.Sleep()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const sleep = await client.Sleep().load()
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const user = await client.User().load()
```


### Workout

Create an instance: `const workout = client.Workout()`

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
| `environment` | `*` |  |
| `estimated_calories` | `*` | Estimated calories burned |
| `estimated_distance_meters` | `*` | Estimated total distance in meters |
| `estimated_duration_seconds` | `*` | Estimated total duration in seconds |
| `ftp` | `number` | Functional Threshold Power in watts |
| `max_heart_rate` | `number` | Maximum heart rate in BPM |
| `name` | `string` | Name of the workout |
| `planned_date` | `string` | Date to schedule the workout on (YYYY-MM-DD) |
| `pool_length_meters` | `*` | Pool length in meters, for swim workouts |
| `sport` | `*` | Sport a workout template targets. |
| `status` | `string` |  |
| `step_blocks` | `Array` |  |
| `threshold_heart_rate` | `number` | Threshold heart rate in BPM |
| `threshold_speed` | `number` | Threshold speed in m/s |
| `workout_id` | `string` | Terra identifier of the stored template. |

#### Example: Load

```ts
const workout = await client.Workout().load({ id: 1 })
```

#### Example: List

```ts
const workouts = await client.Workout().list()
```

#### Example: Create

```ts
const workout = await client.Workout().create({
  name: 'example_name',
  planned_date: 'example_planned_date',
  sport: 'example_sport',
  step_blocks: [],
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
terra/
├── src/
│   ├── TerraSDK.js        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
└── test/                   # Test suites
```

Import the SDK from the package root:

```js
const { TerraSDK } = require('@voxgig-sdk/terra-js')
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const activity = client.Activity()
await activity.load()

// activity.data() now returns the activity data from the last `load`
// activity.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
