# Terra SDK

Terra API clients in TypeScript, JavaScript, Go, Python, PHP, and Lua, plus a CLI and an
MCP server for AI agents. All generated from Terra's own public OpenAPI spec, so every
surface stays in sync with the API.

> **Unofficial.** This is an unofficial SDK for the Terra public API, built by
> [Voxgig](https://voxgig.com/sdk). It is not affiliated with, endorsed by, or sponsored by
> Terra.

**Why this exists:** Voxgig builds public SDK and MCP examples for APIs we think are
interesting. This is one of those. MIT-licensed, take whatever's useful.

## Try it (TypeScript)

```bash
git clone https://github.com/voxgig-sdk/terra-sdk
cd terra-sdk/ts
npm install
npm run build
npm test
```

The test suite runs fully offline. Every SDK ships a test mode that swaps the HTTP transport
for an in-memory mock, so you can try it without credentials or a network.

## Quickstart

Thirty seconds, and Terra's integration list is public, so this runs with no credentials at
all:

```ts
import { TerraSDK } from '@voxgig-sdk/terra'

const client = new TerraSDK()

const integrations = await client.Integration().list()

console.log(integrations.length)
console.log(JSON.stringify(integrations[0], null, 2))
```

Against the live API that prints `72`, then the first provider record:

```json
{
  "byo_enabled": false,
  "byo_supported": true,
  "enabled": true,
  "icon": "https://access.tryterra.co/api/static/icons/oura.webp",
  "name": "Oura",
  "provider": "OURA",
  "setup": "API_KEYS_MANAGED",
  "supported_scopes": ["daily", "email", "heart_health", "heartrate", "personal",
                       "session", "spo2", "stress", "tag", "workout"],
  "types": { "activity": true, "body": true, "daily": true,
             "menstruation": false, "nutrition": false, "sleep": true },
  "entity$": "Integration"
}
```

One note on that output. `list()` hands back entity objects, not plain records, so
`JSON.stringify` shows the record plus an `entity$` tag. Read a single field with
`integrations[0].data().provider` rather than `integrations[0].provider`.

The data endpoints need credentials. Terra authenticates with two headers, `x-api-key` and
`dev-id`, so pass both:

```ts
const authed = new TerraSDK({
  headers: {
    'x-api-key': process.env.TERRA_API_KEY as string,
    'dev-id': process.env.TERRA_DEV_ID as string,
  },
})

const sleep = await authed.Sleep().load()
console.log(sleep)
```

## What's in the box

| Surface | Use it for | Where |
| --- | --- | --- |
| SDK, 6 languages | App integration | `ts/` `js/` `go/` `py/` `php/` `lua/` |
| CLI | Scripts, CI, exploration (interactive REPL mode included) | `go-cli/` |
| MCP server | AI agents: Claude, Cursor, and friends | `go-mcp/` |
| Agent guide | Points coding agents at all of the above | `AGENTS.md` |

All of it comes from one spec. Change the spec, regenerate, and every surface updates
together. None of them drift.

## Using the CLI

```bash
cd go-cli && go build -o terra-cli .

./terra-cli list integration      # public, no key needed
./terra-cli                       # no arguments: interactive REPL
```

Each command line is one [AQL](https://github.com/aql-lang/aql) expression.

## Using the MCP server

```bash
cd go-mcp && go build -o terra-mcp .
```

Then register it with your agent (Claude Desktop, Claude Code, Cursor):

```json
{
  "mcpServers": {
    "terra": {
      "command": "/abs/path/to/terra-mcp",
      "args": ["-transport", "stdio"]
    }
  }
}
```

It exposes two tools, `terra_list` and `terra_load`, over all 16 entities below. Read
operations only, not create, update or remove. A tool call looks like this, and this one
needs no credentials:

```json
{ "entity": "integration" }
```

Your customers' AI agents can call the Terra API through this today.

## Honest state

Generated from Terra's public OpenAPI spec (`dist/core/v2-bundled.yaml`,
`info.version 2026.08.05`) on 2026-08-07. Not production-tuned. Use it as a starting point
or a reference.

Known rough edges:

- **Nine of the 16 entities have no typed fields.** Terra's seven core health-data
  endpoints (`/activity`, `/athlete`, `/body`, `/daily`, `/menstruation`, `/nutrition`,
  `/sleep`) plus `/userInfo` and `/subscriptions` declare their `200` response as a
  top-level `oneOf` between the data payload and a `DataSentToWebhook` acknowledgement,
  because `to_webhook` defaults to true. No generator can name the fields of a response
  that is two different shapes, so those entities come through untyped. The calls work and
  the JSON arrives intact, the static types are just empty.
- **Scope.** Terra publishes five OpenAPI bundles. This SDK is built from the `core/v2`
  bundle only, the one Terra's own docs, dashboard and client SDKs target. The Teams,
  Vantage, Widget and Real-Time bundles are not covered.
- **The CLI and the MCP server only reach the public endpoint.** Both read `TERRA_APIKEY`
  and send it as an `Authorization` header, because that is what the generator emits for a
  single API-key security scheme. Terra uses two headers instead, `x-api-key` and `dev-id`,
  so the authenticated endpoints need the `headers` option shown in the quickstart, which
  the CLI and MCP binaries do not expose yet. The six language SDKs are unaffected.
- **Two integration endpoints, one entity.** `Integration().list()` is wired to
  `/integrations/detailed`, which returns provider objects. The plain `/integrations`
  endpoint returns bare provider-code strings, which do not fit the entity model, so it was
  left off the entity surface. Reach it with
  `client.direct({ path: '/integrations', method: 'GET' })`.
- **Three offline tests fail in the PHP and Lua targets** (of 287 and 314). The mock
  transport in those two targets does not rebuild the response envelope for the three list
  operations that unwrap a named key, so the mock disagrees with the model. It is a gap in
  the generator's PHP and Lua test templates, not in the SDKs, and the same tests pass in
  TypeScript, JavaScript, Python and Go. All eight targets build.

When teams want SDKs like these production-grade, idiomatic per language, tested, documented,
and released through a real pipeline, Voxgig does that work as a consulting engagement. The
toolkit also generates Java and C# if your customers need them.

## Entities

The API exposes 16 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Activity** | The Activity entity (load). | `/activity` |
| **Athlete** | The Athlete entity (load). | `/athlete` |
| **Authentication** | The Authentication entity (create, remove). | `/auth/authenticateUser` |
| **Body** | The Body entity (load). | `/body` |
| **BulkUserInfo** | The BulkUserInfo entity (create). | `/bulkUserInfo` |
| **Daily** | The Daily entity (load). | `/daily` |
| **Integration** | The Integration entity (list). | `/integrations/detailed` |
| **LabReport** | The LabReport entity (create, list, load, remove). | `/lab-reports` |
| **LabReportDelivery** | The LabReportDelivery entity (list). | `/lab-reports/{session_id}/deliveries` |
| **LabReportFile** | The LabReportFile entity (list). | `/lab-reports/{session_id}/files` |
| **Menstruation** | The Menstruation entity (load). | `/menstruation` |
| **Nutrition** | The Nutrition entity (load). | `/nutrition` |
| **PlannedWorkout** | The PlannedWorkout entity (list, load, update). | `/plannedWorkouts` |
| **Sleep** | The Sleep entity (load). | `/sleep` |
| **User** | The User entity (load). | `/subscriptions` |
| **Workout** | The Workout entity (create, list, load, remove). | `/workouts/{workout_id}/plan` |

The operations available across these entities are **load**, **list**, **create**, **update**,
**remove** — see each entity's own list above for exactly which it supports. The Description
column is generated: 163 of the spec's 268 schemas carry no `description`, including
`Activity`, `Athlete`, `Body`, `Daily`, `Menstruation` and `Nutrition`, so there was nothing
better to put there. We would rather leave it plain than invent text.

## Entities, not endpoints

This SDK exposes the API as 16 semantic entities that you call directly, instead of
assembling URL paths and query strings. Entities are **Capitalised** to mark them as the
primary surface, each with the operations it supports (`list`, `load`, `create`, `update`,
`remove`):

```ts
const client = new TerraSDK()
const activity = await client.Activity().load()
```

Thinking in entities keeps the mental model small, for people and AI agents alike, rather
than reasoning about raw HTTP routes and query parameters.

## Offline unit testing

Every SDK ships a built-in **test mode** that swaps the HTTP transport for an in-memory mock,
so your unit tests run fully offline. No server, no network, no credentials:

### TypeScript

```ts
const client = TerraSDK.test()
const activity = await client.Activity().load()
// activity is a bare Activity populated with mock data
console.log(activity)
```

### Python

```python
client = TerraSDK.test()
activity = client.Activity().load()
print(activity)
```

### PHP

```php
// Seed fixture data so offline calls resolve without a live server.
$client = TerraSDK::test([
    "entity" => ["activity" => ["test01" => []]],
]);
$activity = $client->Activity()->load();
```

### Golang

```go
client := sdk.Test()
result, err := client.Activity(nil).Load(
    nil, nil,
)
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Activity():load()
```

### JavaScript

```js
const client = TerraSDK.test()
const activity = await client.Activity().load()
// activity is a bare entity populated with mock data
console.log(activity)
```

## Quickstart in other languages

### Python

```python
import os
from terra_sdk import TerraSDK

client = TerraSDK({
    "headers": {
        "x-api-key": os.environ.get("TERRA_API_KEY"),
        "dev-id": os.environ.get("TERRA_DEV_ID"),
    },
})


# Load a specific activity (returns the record, raises on error)
activity = client.Activity().load()
print(activity)
```

### PHP

```php
<?php
require_once 'terra_sdk.php';

$client = new TerraSDK([
    "headers" => [
        "x-api-key" => getenv("TERRA_API_KEY"),
        "dev-id" => getenv("TERRA_DEV_ID"),
    ],
]);


// Load a specific activity (returns the bare record; throws on error)
$activity = $client->Activity()->load();
print_r($activity);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/terra-sdk/go"

client := sdk.NewTerraSDK(map[string]any{
    "headers": map[string]any{
        "x-api-key": os.Getenv("TERRA_API_KEY"),
        "dev-id":    os.Getenv("TERRA_DEV_ID"),
    },
})

// Load activity data
activity, err := client.Activity(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(activity)
```

### Lua

```lua
local sdk = require("terra_sdk")

local client = sdk.new({
  headers = {
    ["x-api-key"] = os.getenv("TERRA_API_KEY"),
    ["dev-id"] = os.getenv("TERRA_DEV_ID"),
  },
})


-- Load a specific activity
local activity, err = client:Activity():load()
print(activity)
```

### JavaScript

```js
const { TerraSDK } = require('@voxgig-sdk/terra-js')

const client = new TerraSDK({
  headers: {
    'x-api-key': process.env.TERRA_API_KEY,
    'dev-id': process.env.TERRA_DEV_ID,
  },
})

```

## Direct and prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
if (result instanceof Error) {
  throw result
}
console.log(result.data)
```

**Python:**
```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**JavaScript:**
```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
if (result instanceof Error) {
  throw result
}
console.log(result.data)
```

## How it works

> Everyday use only needs the sections above. This explains the internals
> behind every call — relevant when writing custom features.

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Lua](lua/README.md)
- [JavaScript](js/README.md)

## Upstream API and attribution

- Upstream API: [tryterra.co](https://tryterra.co/), base URL
  `https://access.tryterra.co/api/v2`.
- Source spec: [github.com/tryterra/openapi](https://github.com/tryterra/openapi), file
  `dist/core/v2-bundled.yaml`, published by Terra under the
  [Apache License 2.0](https://github.com/tryterra/openapi/blob/master/LICENSE). A copy of
  the spec as used for this build is in `.sdk/def/`.
- This SDK is a derivative work of that Apache-2.0 spec. The generated code in this
  repository is MIT-licensed, which Apache-2.0 permits; Terra's copyright and licence notice
  on the spec are preserved and acknowledged in [NOTICE](NOTICE).
- Terra's spec repository states the bundles "can be used for API reference rendering,
  SDK/client generation, Postman/Insomnia import, and request/response validation". This
  repository is that.

## Security

Please report security issues to security@voxgig.com. See [SECURITY.md](SECURITY.md).
Do not open public issues for suspected vulnerabilities.

---

Generated by the [Voxgig SDK Generator](https://voxgig.com/sdk), MIT-licensed. Browse 600+
generated SDKs at [github.com/voxgig-sdk](https://github.com/voxgig-sdk).

Questions, or want these production-grade? Email richard@voxgig.com.

If you are from Terra and would like this repository removed, or transferred to your own
GitHub organisation, email richard@voxgig.com and it will be done within two business days,
no questions asked.
