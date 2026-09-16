# TerraAPI

The Terra API (v2 surface, served at access.tryterra.co/api/v2).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 31 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Activity](docs/api/activity.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [Athlete](docs/api/athlete.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [Authentication](docs/api/authentication.html)

Results: Returned when authentication link could be successfully generated; 200; Returned when user is successfully deauthenticated and data is deleted.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `auth_failure_redirect_url`: URL the user is redirected to upon unsuccessful authentication
- `auth_success_redirect_url`: URL the user is redirected to upon successful authentication
- `auth_url`: authentication URL the user must be redirected to in order to link their account
- `expires_in`: a number in seconds depicting how long the url is valid for
- `language`: Display language of the widget

### [Body](docs/api/body.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [BulkUserInfo](docs/api/bulk_user_info.html)

Results: Returned upon successful request.

SDK operations: `create`.

### [Daily](docs/api/daily.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [Integration](docs/api/integration.html)

Results: Successful response containing a list of integrations.; Returns list of all available integrations on the API.

SDK operations: `list`.

Key fields to recognise:

- `enabled`: Whether the integration is enabled
- `icon`: URL for the provider&#39;s icon image
- `name`: Display name of the integration
- `provider`: Identifier for the provider
- `sdk_providers`: Providers available through Terra&#39;s mobile SDKs rather than cloud connections

### [LabReport](docs/api/lab_report.html)

Results: Upload accepted for processing.; A list of lab report sessions.; The lab report session.; The session was deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `collection_date`: Specimen collection date (YYYY-MM-DD); omitted if not extracted.
- `collection_time`: Specimen collection time (HH:MM, 24-hour); omitted if not extracted.
- `current_status`: Processing status as a clean lowercase string.
- `panels`: Report-level panels that results reference by panel_id. Omitted if the report has no panel grouping.
- `patient_age_at_collection`: Patient age in years; omitted if unknown.

### [LabReportDelivery](docs/api/lab_report_delivery.html)

Results: Per-destination delivery outcomes.

SDK operations: `list`.

Key fields to recognise:

- `attempt_count`: Retry count, 0 on the first attempt, incremented per retry.
- `destination_type`: The destination&#39;s type (for example webhook, s3).
- `last_error`: Most recent delivery error; omitted when delivered.
- `status`: pending, delivered, or failed.

### [LabReportFile](docs/api/lab_report_file.html)

Results: Input files and thumbnail with presigned URLs.

SDK operations: `list`.

### [Menstruation](docs/api/menstruation.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [Nutrition](docs/api/nutrition.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [PlannedWorkout](docs/api/planned_workout.html)

Results: Planned workouts for the connection; The planned workout; Updated planned workout.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `coercion_warnings`: Warnings emitted when the template could not be represented exactly on the provider
- `created_at`: Creation time (RFC 3339)
- `details`: Full workout body (title, description, planned metrics, structured steps) fetched live from the provider. Present only for external workouts (is_external true).
- `is_external`: True when the workout was created on the provider side rather than through Terra
- `last_updated_at`: Last update time (RFC 3339)

### [Sleep](docs/api/sleep.html)

Results: Returned upon successful data request.

SDK operations: `load`.

### [User](docs/api/user.html)

Results: Returned upon a successful request; Returned when the provided resources are found.

SDK operations: `load`.

### [Workout](docs/api/workout.html)

Results: Planned workout created and pushed (or queued for SDK delivery); Template stored; Stored templates, each including its workout_id; The stored template; Planned workout deleted; Template and all planned instances deleted; Some provider-side deletions failed; the template is retained. Retry to complete the cascade.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `description`: Description of the workout
- `estimated_calories`: Estimated calories burned
- `estimated_distance_meters`: Estimated total distance in meters
- `estimated_duration_seconds`: Estimated total duration in seconds
- `ftp`: Functional Threshold Power in watts

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Activity](docs/api/activity.html) | `load` | `GET /activity` | Required |
| [Athlete](docs/api/athlete.html) | `load` | `GET /athlete` | Required |
| [Authentication](docs/api/authentication.html) | `create` | `POST /auth/authenticateUser` | Required |
| [Authentication](docs/api/authentication.html) | `create` | `POST /auth/generateAuthToken` | Required |
| [Authentication](docs/api/authentication.html) | `create` | `POST /auth/generateWidgetSession` | Required |
| [Authentication](docs/api/authentication.html) | `remove` | `DELETE /auth/deauthenticateUser` | Required |
| [Body](docs/api/body.html) | `load` | `GET /body` | Required |
| [BulkUserInfo](docs/api/bulk_user_info.html) | `create` | `POST /bulkUserInfo` | Required |
| [Daily](docs/api/daily.html) | `load` | `GET /daily` | Required |
| [Integration](docs/api/integration.html) | `list` | `GET /integrations/detailed` | Not required |
| [Integration](docs/api/integration.html) | `list` | `GET /integrations` | Not required |
| [LabReport](docs/api/lab_report.html) | `create` | `POST /lab-reports` | Required |
| [LabReport](docs/api/lab_report.html) | `list` | `GET /lab-reports` | Required |
| [LabReport](docs/api/lab_report.html) | `load` | `GET /lab-reports/{session_id}` | Required |
| [LabReport](docs/api/lab_report.html) | `remove` | `DELETE /lab-reports/{session_id}` | Required |
| [LabReportDelivery](docs/api/lab_report_delivery.html) | `list` | `GET /lab-reports/{session_id}/deliveries` | Required |
| [LabReportFile](docs/api/lab_report_file.html) | `list` | `GET /lab-reports/{session_id}/files` | Required |
| [Menstruation](docs/api/menstruation.html) | `load` | `GET /menstruation` | Required |
| [Nutrition](docs/api/nutrition.html) | `load` | `GET /nutrition` | Required |
| [PlannedWorkout](docs/api/planned_workout.html) | `list` | `GET /plannedWorkouts` | Required |
| [PlannedWorkout](docs/api/planned_workout.html) | `load` | `GET /plannedWorkouts/{planned_workout_id}` | Required |
| [PlannedWorkout](docs/api/planned_workout.html) | `update` | `PATCH /plannedWorkouts/{planned_workout_id}` | Required |
| [Sleep](docs/api/sleep.html) | `load` | `GET /sleep` | Required |
| [User](docs/api/user.html) | `load` | `GET /subscriptions` | Required |
| [User](docs/api/user.html) | `load` | `GET /userInfo` | Required |
| [Workout](docs/api/workout.html) | `create` | `POST /workouts/{workout_id}/plan` | Required |
| [Workout](docs/api/workout.html) | `create` | `POST /workouts` | Required |
| [Workout](docs/api/workout.html) | `list` | `GET /workouts` | Required |
| [Workout](docs/api/workout.html) | `load` | `GET /workouts/{workout_id}` | Required |
| [Workout](docs/api/workout.html) | `remove` | `DELETE /plannedWorkouts/{planned_workout_id}` | Required |
| [Workout](docs/api/workout.html) | `remove` | `DELETE /workouts/{workout_id}` | Required |

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

A read request without required parameters or authentication is `GET /integrations/detailed`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://access.tryterra.co/api/v2/integrations/detailed'
```

Inspect the response using the [Integration](docs/api/integration.html) reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `terra_list`: List records for an entity. Supported entities: `integration`, `lab_report`, `lab_report_delivery`, `lab_report_file`, `planned_workout`, `workout`.
- `terra_load`: Load one record for an entity. Supported entities: `activity`, `athlete`, `body`, `daily`, `lab_report`, `menstruation`, `nutrition`, `planned_workout`, `sleep`, `user`, `workout`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

