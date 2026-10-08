# Terra Golang SDK Reference

Complete API reference for the Terra Golang SDK.


## TerraSDK

### Constructor

```go
func NewTerraSDK(options map[string]any) *TerraSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *TerraSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *TerraSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Activity(data map[string]any) TerraEntity`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Athlete(data map[string]any) TerraEntity`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `Authentication(data map[string]any) TerraEntity`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `Body(data map[string]any) TerraEntity`

Create a new `Body` entity instance. Pass `nil` for no initial data.

#### `BulkUserInfo(data map[string]any) TerraEntity`

Create a new `BulkUserInfo` entity instance. Pass `nil` for no initial data.

#### `Daily(data map[string]any) TerraEntity`

Create a new `Daily` entity instance. Pass `nil` for no initial data.

#### `Integration(data map[string]any) TerraEntity`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `LabReport(data map[string]any) TerraEntity`

Create a new `LabReport` entity instance. Pass `nil` for no initial data.

#### `LabReportDelivery(data map[string]any) TerraEntity`

Create a new `LabReportDelivery` entity instance. Pass `nil` for no initial data.

#### `LabReportFile(data map[string]any) TerraEntity`

Create a new `LabReportFile` entity instance. Pass `nil` for no initial data.

#### `LabReportSession(data map[string]any) TerraEntity`

Create a new `LabReportSession` entity instance. Pass `nil` for no initial data.

#### `Menstruation(data map[string]any) TerraEntity`

Create a new `Menstruation` entity instance. Pass `nil` for no initial data.

#### `Nutrition(data map[string]any) TerraEntity`

Create a new `Nutrition` entity instance. Pass `nil` for no initial data.

#### `PlannedWorkout(data map[string]any) TerraEntity`

Create a new `PlannedWorkout` entity instance. Pass `nil` for no initial data.

#### `Sleep(data map[string]any) TerraEntity`

Create a new `Sleep` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) TerraEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Workout(data map[string]any) TerraEntity`

Create a new `Workout` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ActivityEntity

```go
activity := client.Activity(nil)
fmt.Println(activity.GetName()) // "activity"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Activity(nil).Load(map[string]any{"start_date": "start_date", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AthleteEntity

```go
athlete := client.Athlete(nil)
fmt.Println(athlete.GetName()) // "athlete"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Athlete(nil).Load(map[string]any{"user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AuthenticationEntity

```go
authentication := client.Authentication(nil)
fmt.Println(authentication.GetName()) // "authentication"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_app_url` | `string` | No | URL of your own iOS app to hand Apple Health connections to, instead of the Terra mobile app |
| `auth_failure_redirect_url` | `string` | No | URL the user is redirected to upon unsuccessful authentication |
| `auth_success_redirect_url` | `string` | No | URL the user is redirected to upon successful authentication. |
| `auth_url` | `string` | No | authentication URL the user must be redirected to in order to link their account |
| `bypass_feedback` | `bool` | No | When false, the user stays on the widget's own result screen instead of being redirected immediately |
| `connected_uids` | `[]any` | No | Terra user IDs already connected for this end user; their providers show as connected with a disconnect option |
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
| `warnings` | `[]any` | No | present when part of the request could not be honoured, such as requested providers that are unknown or not enabled |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Authentication(nil).Create(map[string]any{
    "resource": "example_resource",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Authentication(nil).Remove(map[string]any{"user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BodyEntity

```go
body := client.Body(nil)
fmt.Println(body.GetName()) // "body"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Body(nil).Load(map[string]any{"start_date": "start_date", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BodyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BulkUserInfoEntity

```go
bulkUserInfo := client.BulkUserInfo(nil)
fmt.Println(bulkUserInfo.GetName()) // "bulk_user_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bulk_user_infos` | `[]any` | No | List of user IDs to get information for |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BulkUserInfo(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BulkUserInfoEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DailyEntity

```go
daily := client.Daily(nil)
fmt.Println(daily.GetName()) // "daily"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Daily(nil).Load(map[string]any{"start_date": "start_date", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DailyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## IntegrationEntity

```go
integration := client.Integration(nil)
fmt.Println(integration.GetName()) // "integration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `providers` | `[]any` | No |  |
| `sdk_providers` | `[]any` | No | Providers available through Terra's mobile SDKs rather than cloud connections |
| `status` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Integration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LabReportEntity

```go
labReport := client.LabReport(nil)
fmt.Println(labReport.GetName()) // "lab_report"
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
| `panels` | `[]any` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | No | Your external reference; omitted if not set. |
| `report_date` | `string` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` | No |  |
| `report_notes` | `string` | No |  |
| `report_time` | `string` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Yes | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `[]any` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `[]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LabReport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LabReport(nil).Load(map[string]any{"id": "lab_report_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LabReport(nil).Create(map[string]any{
    "current_status": "example_current_status",
    "report_type": "example_report_type",
    "session_id": "example_session_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LabReport(nil).Remove(map[string]any{"id": "lab_report_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LabReportDeliveryEntity

```go
labReportDelivery := client.LabReportDelivery(nil)
fmt.Println(labReportDelivery.GetName()) // "lab_report_delivery"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LabReportDelivery(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportDeliveryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LabReportFileEntity

```go
labReportFile := client.LabReportFile(nil)
fmt.Println(labReportFile.GetName()) // "lab_report_file"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | `string` | No |  |
| `id` | `string` | No |  |
| `presigned_url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LabReportFile(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportFileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LabReportSessionEntity

```go
labReportSession := client.LabReportSession(nil)
fmt.Println(labReportSession.GetName()) // "lab_report_session"
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
| `panels` | `[]any` | No | Report-level panels that results reference by panel_id. |
| `patient_age_at_collection` | `int` | No | Patient age in years; omitted if unknown. |
| `patient_sex` | `string` | No | Clean lowercase string (open enum); omitted if unspecified. |
| `reference_id` | `string` | No | Your external reference; omitted if not set. |
| `report_date` | `string` | No | Date printed on the report (YYYY-MM-DD); omitted if not extracted. |
| `report_locale` | `string` | No |  |
| `report_notes` | `string` | No |  |
| `report_time` | `string` | No | Time printed on the report (HH:MM, 24-hour); omitted if not extracted. |
| `report_type` | `string` | Yes | What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully). |
| `results` | `[]any` | No | The layered biomarker results. |
| `results_count` | `int` | No |  |
| `session_id` | `string` | Yes |  |
| `status_history` | `[]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LabReportSession(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LabReportSession(nil).Load(map[string]any{"session_id": "session_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LabReportSession(nil).Create(map[string]any{
    "current_status": "example_current_status",
    "report_type": "example_report_type",
    "session_id": "example_session_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabReportSessionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MenstruationEntity

```go
menstruation := client.Menstruation(nil)
fmt.Println(menstruation.GetName()) // "menstruation"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Menstruation(nil).Load(map[string]any{"start_date": "start_date", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MenstruationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## NutritionEntity

```go
nutrition := client.Nutrition(nil)
fmt.Println(nutrition.GetName()) // "nutrition"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Nutrition(nil).Load(map[string]any{"start_date": "start_date", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NutritionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PlannedWorkoutEntity

```go
plannedWorkout := client.PlannedWorkout(nil)
fmt.Println(plannedWorkout.GetName()) // "planned_workout"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `athlete_metrics` | `any` | Yes |  |
| `coercion_warnings` | `string` | No | Deprecated; use warnings. |
| `completed_at` | `any` | No | Time the session was reported complete by the user's device. |
| `created_at` | `any` | Yes | Creation time (RFC 3339). |
| `details` | `any` | Yes | Deprecated. |
| `id` | `string` | No |  |
| `is_external` | `bool` | No | True when the workout was created on the provider side rather than through Terra. |
| `last_updated_at` | `any` | Yes | Last update time (RFC 3339). |
| `planned_date` | `string` | No | New scheduled date (YYYY-MM-DD) |
| `planned_workout_id` | `string` | No | Terra identifier of the planned workout. |
| `provider_workout_id` | `string` | No | Identifier assigned by the provider, once pushed. |
| `warnings` | `[]any` | No | Adjustments made when the template could not be represented exactly on the provider. |
| `workout` | `any` | No | The workout body, as on the list. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PlannedWorkout(nil).List(map[string]any{"user_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PlannedWorkout(nil).Load(map[string]any{"id": 1, "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.PlannedWorkout(nil).Update(map[string]any{
    "id": 1,
    "user_id": "user_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlannedWorkoutEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SleepEntity

```go
sleep := client.Sleep(nil)
fmt.Println(sleep.GetName()) // "sleep"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Sleep(nil).Load(map[string]any{"start_date": "start_date", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SleepEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `max_page` | `int` | No | Total number of pages available for the requested page size |
| `next` | `any` | No | The next page number, or null if there is no next page |
| `results` | `[]any` | No |  |
| `status` | `string` | No |  |
| `users` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.User(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkoutEntity

```go
workout := client.Workout(nil)
fmt.Println(workout.GetName()) // "workout"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the workout |
| `environment` | `any` | No |  |
| `estimated_calories` | `any` | No | Estimated calories burned |
| `estimated_distance_meters` | `any` | No | Estimated total distance in meters |
| `estimated_duration_seconds` | `any` | No | Estimated total duration in seconds |
| `estimated_intensity_factor` | `any` | No | Planned intensity factor (0-5), where the provider or author supplies one. |
| `estimated_tss` | `any` | No | Planned training stress score (0-9999), where the provider or author supplies one. |
| `id` | `string` | No |  |
| `name` | `string` | Yes | Name of the workout |
| `pool_length_meters` | `any` | No | Pool length in meters, for swim workouts |
| `sport` | `any` | Yes | Sport a workout template targets. |
| `status` | `string` | No |  |
| `step_blocks` | `[]any` | Yes |  |
| `workout_id` | `string` | No | Terra identifier of the stored template. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Workout(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Workout(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Workout(nil).Create(map[string]any{
    "name": "example_name",
    "sport": "example_sport",
    "step_blocks": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Workout(nil).Remove(map[string]any{"planned_workout_id": 1, "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkoutEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewTerraSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
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

