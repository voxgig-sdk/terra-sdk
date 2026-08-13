# Terra TypeScript SDK



The TypeScript SDK for the Terra API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Activity()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/terra-sdk/releases](https://github.com/voxgig-sdk/terra-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { TerraSDK } from '@voxgig-sdk/terra'

const client = new TerraSDK({
  apikey: process.env.TERRA_APIKEY,
})
```

### 3. Load an activity

`load()` returns the entity directly and throws on failure:

```ts
try {
  const activity = await client.Activity().load()
  console.log(activity)
} catch (err) {
  console.error('load failed:', err)
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

```ts
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

```ts
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

```ts
const client = TerraSDK.test()

const activity = await client.Activity().load()
// activity is the entity, populated with mock response data
// — call activity.data() for the record itself
console.log(activity)
```

You can also use the instance method:

```ts
const client = new TerraSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Activity()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
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
cd ts && npm test
```


## Reference

### TerraSDK

#### Constructor

```ts
new TerraSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
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
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
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
| `enabled` |  |
| `icon` |  |
| `name` |  |
| `provider` |  |
| `setup` |  |
| `types` |  |

Operations: list.

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

Operations: create, list, load, remove.

API path: `/lab-reports`

#### LabReportDelivery

| Field | Description |
| --- | --- |
| `attempt_count` |  |
| `destination_id` |  |
| `destination_type` |  |
| `last_error` |  |
| `status` |  |

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
| `coercion_warnings` |  |
| `created_at` |  |
| `details` |  |
| `is_external` |  |
| `last_updated_at` |  |
| `planned_date` |  |
| `planned_workout_id` |  |
| `provider_workout_id` |  |
| `workout_id` |  |

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
| `auth_failure_redirect_url` | `string` |  |
| `auth_success_redirect_url` | `string` |  |
| `auth_url` | `string` |  |
| `expires_in` | `number` |  |
| `language` | `string` |  |
| `providers` | `string` |  |
| `reference_id` | `string` |  |
| `session_id` | `string` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `url` | `string` |  |
| `user_id` | `string` |  |

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
| `enabled` | `boolean` |  |
| `icon` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `setup` | `string` |  |
| `types` | `Record<string, any>` |  |

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
| `collection_date` | `string` |  |
| `collection_time` | `string` |  |
| `current_status` | `string` |  |
| `file_count` | `number` |  |
| `input_bytes` | `number` |  |
| `lab_name` | `string` |  |
| `output_bytes` | `number` |  |
| `panels` | `any[]` |  |
| `patient_age_at_collection` | `number` |  |
| `patient_sex` | `string` |  |
| `reference_id` | `string` |  |
| `report_date` | `string` |  |
| `report_locale` | `string` |  |
| `report_notes` | `string` |  |
| `report_time` | `string` |  |
| `report_type` | `string` |  |
| `results` | `any[]` |  |
| `results_count` | `number` |  |
| `session_id` | `string` |  |
| `status_history` | `any[]` |  |
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
| `attempt_count` | `number` |  |
| `destination_id` | `string` |  |
| `destination_type` | `string` |  |
| `last_error` | `string` |  |
| `status` | `string` |  |

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
| `athlete_metrics` | `any` |  |
| `coercion_warnings` | `string` |  |
| `created_at` | `any` |  |
| `details` | `any` |  |
| `is_external` | `boolean` |  |
| `last_updated_at` | `any` |  |
| `planned_date` | `string` |  |
| `planned_workout_id` | `string` |  |
| `provider_workout_id` | `string` |  |
| `workout_id` | `string` |  |

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
| `step_blocks` | `any[]` |  |
| `threshold_heart_rate` | `number` |  |
| `threshold_speed` | `number` |  |
| `workout_id` | `string` |  |

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
│   ├── TerraSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { TerraSDK } from '@voxgig-sdk/terra'
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
