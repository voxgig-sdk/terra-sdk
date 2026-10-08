# TerraAPI

The Terra API (v2 surface, served at access.tryterra.co/api/v2).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 31 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Activity

Results: Returned upon successful data request.

SDK operations: `load`.

### Athlete

Results: Returned upon successful data request.

SDK operations: `load`.

### Authentication

Results: Returned when authentication link could be successfully generated; 200; Returned when user is successfully deauthenticated and data is deleted.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `auth_failure_redirect_url`: URL the user is redirected to upon unsuccessful authentication
- `auth_success_redirect_url`: URL the user is redirected to upon successful authentication
- `auth_url`: authentication URL the user must be redirected to in order to link their account
- `expires_in`: a number in seconds depicting how long the url is valid for
- `language`: Display language of the widget

### Body

Results: Returned upon successful data request.

SDK operations: `load`.

### BulkUserInfo

Results: Returned upon successful request.

SDK operations: `create`.

Key fields to recognise:

- `bulk_user_infos`: List of user IDs to get information for

### Daily

Results: Returned upon successful data request.

SDK operations: `load`.

### Integration

Results: Returns list of all available integrations on the API; Successful response containing a list of integrations.

SDK operations: `list`.

Key fields to recognise:

- `providers`: List of integration providers with their details
- `sdk_providers`: Providers available through Terra&#39;s mobile SDKs rather than cloud connections
- `status`: Status of the API response

### LabReport

Results: Upload accepted for processing.; A list of lab report sessions.; The lab report session.; The session was deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `collection_date`: Specimen collection date (YYYY-MM-DD); omitted if not extracted.
- `collection_time`: Specimen collection time (HH:MM, 24-hour); omitted if not extracted.
- `current_status`: Processing status as a clean lowercase string.
- `id`: Report-local ordinal; matches LabReportBiomarker.`panel_id`.
- `panels`: Report-level panels that results reference by `panel_id`. Omitted if the report has no panel grouping.

### LabReportDelivery

Results: Per-destination delivery outcomes.

SDK operations: `list`.

Key fields to recognise:

- `attempt_count`: Retry count, 0 on the first attempt, incremented per retry.
- `destination_type`: The destination&#39;s type (for example webhook, s3).
- `last_error`: Most recent delivery error; omitted when delivered.
- `status`: pending, delivered, or failed.

### LabReportFile

Results: Input files and thumbnail with presigned URLs.

SDK operations: `list`.

### Menstruation

Results: Returned upon successful data request.

SDK operations: `load`.

### Nutrition

Results: Returned upon successful data request.

SDK operations: `load`.

### PlannedWorkout

Results: Planned workouts for the connection; The planned workout; Updated planned workout.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `coercion_warnings`: Warnings emitted when the template could not be represented exactly on the provider
- `created_at`: Creation time (RFC 3339)
- `details`: Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. Present only for external workouts (`is_external` true).
- `id`: Identifier of the workout on the provider&#39;s side
- `is_external`: True when the workout was created on the provider side rather than through Terra

### Sleep

Results: Returned upon successful data request.

SDK operations: `load`.

### User

Results: Returned upon a successful request; Returned when the provided resources are found.

SDK operations: `load`.

### Workout

Results: Planned workout created and pushed (or queued for SDK delivery); Template stored; Stored templates, each including its `workout_id`; The stored template; Planned workout deleted; Template and all planned instances deleted; Some provider-side deletions failed; the template is retained. Retry to complete the cascade.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `description`: Description of the workout
- `estimated_calories`: Estimated calories burned
- `estimated_distance_meters`: Estimated total distance in meters
- `estimated_duration_seconds`: Estimated total duration in seconds
- `name`: Name of the workout

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Activity | `load` | `GET /activity` | Required |
| Athlete | `load` | `GET /athlete` | Required |
| Authentication | `create` | `POST /auth/authenticateUser` | Required |
| Authentication | `create` | `POST /auth/generateAuthToken` | Required |
| Authentication | `create` | `POST /auth/generateWidgetSession` | Required |
| Authentication | `remove` | `DELETE /auth/deauthenticateUser` | Required |
| Body | `load` | `GET /body` | Required |
| BulkUserInfo | `create` | `POST /bulkUserInfo` | Required |
| Daily | `load` | `GET /daily` | Required |
| Integration | `list` | `GET /integrations` | Not required |
| Integration | `list` | `GET /integrations/detailed` | Not required |
| LabReport | `create` | `POST /lab-reports` | Required |
| LabReport | `list` | `GET /lab-reports` | Required |
| LabReport | `load` | `GET /lab-reports/{session_id}` | Required |
| LabReport | `remove` | `DELETE /lab-reports/{session_id}` | Required |
| LabReportDelivery | `list` | `GET /lab-reports/{session_id}/deliveries` | Required |
| LabReportFile | `list` | `GET /lab-reports/{session_id}/files` | Required |
| Menstruation | `load` | `GET /menstruation` | Required |
| Nutrition | `load` | `GET /nutrition` | Required |
| PlannedWorkout | `list` | `GET /plannedWorkouts` | Required |
| PlannedWorkout | `load` | `GET /plannedWorkouts/{planned_workout_id}` | Required |
| PlannedWorkout | `update` | `PATCH /plannedWorkouts/{planned_workout_id}` | Required |
| Sleep | `load` | `GET /sleep` | Required |
| User | `load` | `GET /subscriptions` | Required |
| User | `load` | `GET /userInfo` | Required |
| Workout | `create` | `POST /workouts/{workout_id}/plan` | Required |
| Workout | `create` | `POST /workouts` | Required |
| Workout | `list` | `GET /workouts` | Required |
| Workout | `load` | `GET /workouts/{workout_id}` | Required |
| Workout | `remove` | `DELETE /plannedWorkouts/{planned_workout_id}` | Required |
| Workout | `remove` | `DELETE /workouts/{workout_id}` | Required |

## Connect to the API

- API server: `https://access.tryterra.co/api/v2`

The default credential is sent in the `x-api-key` header.

Your API key for authentication

Your developer ID for authentication and tracking

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /integrations`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://access.tryterra.co/api/v2/integrations'
```

Inspect the response using the Integration reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| JavaScript | `js/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `terra_list`: List records for an entity. Supported entities: `integration`, `lab_report`, `lab_report_delivery`, `lab_report_file`, `planned_workout`, `workout`.
- `terra_load`: Load one record for an entity. Supported entities: `activity`, `athlete`, `body`, `daily`, `lab_report`, `menstruation`, `nutrition`, `planned_workout`, `sleep`, `user`, `workout`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

