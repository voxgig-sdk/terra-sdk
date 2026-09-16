
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { TerraSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('AthleteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Athlete()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"athlete","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"to_webhook","orig":"to_webhook","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"kind":"query","name":"user_id","orig":"user_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /athlete","json":"{\"operationId\":\"Athlete_Get\",\"parameters\":[{\"description\":\"Terra user ID (UUID format) to retrieve data for\",\"in\":\"query\",\"name\":\"user_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Boolean flag specifying whether to send the data retrieved to the webhook instead of in the response (default: true if not provided)\\n\",\"in\":\"query\",\"name\":\"to_webhook\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"athlete\":{\"allOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"account_creation_date\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's account creation date with the provider, in ISO8601 format.\",\"examples\":[\"2023-01-15\"]},\"age\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"User's age.\",\"examples\":[28]},\"bio\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's bio - a short description they display on their profile.\",\"examples\":[\"Passionate runner and cyclist\"]},\"city\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's city of residence.\",\"examples\":[\"San Francisco\"]},\"country\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's country of residence.\",\"examples\":[\"United States\"]},\"date_of_birth\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's date of birth, in ISO8601 format.\",\"examples\":[\"1999-11-23\"]},\"email\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's email.\",\"examples\":[\"user@example.com\"]},\"first_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's first name.\",\"examples\":[\"John\"]},\"gender\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's gender.\",\"examples\":[\"male\"]},\"last_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's last name.\",\"examples\":[\"Smith\"]},\"provider_user_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"The user's unique identifier as assigned by the data provider.\",\"examples\":[\"a1b2c3d4e5\"]},\"sex\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's sex.\",\"examples\":[\"male\"]},\"state\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"User's state of residence.\",\"examples\":[\"California\"]}},\"type\":\"object\"}],\"description\":\"Object containing the user's information\",\"type\":\"object\"},\"type\":{\"example\":\"athlete\",\"type\":[\"string\",\"null\"]},\"user\":{\"allOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"active\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"description\":\"whether the user is active or not (inactive users will not receive any data updates and are in considered \",\"examples\":[true]},\"created_at\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Time at which the connection was created\",\"examples\":[\"2022-12-12T10:00:00.000000+00:00\"]},\"last_webhook_update\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Last time at which a webhook update was sent for the connection\",\"examples\":[\"2022-12-12T10:00:00.000000+00:00\"]},\"provider\":{\"description\":\"Connection data source\",\"examples\":[\"FITBIT\"],\"minLength\":1,\"type\":\"string\"},\"reference_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Connection identifier on the developer's end, used to tie connection back to a user on the developer's platform\",\"examples\":[\"user123@email.com\"]},\"scopes\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"(when available) Permissions granted by the user during authentication - to be used as debugging metadata\",\"examples\":[\"activity:read,sleep:read\"]},\"user_id\":{\"description\":\"Terra identifier for the wearable connection\",\"examples\":[\"123e4567-e89b-12d3-a456-426614174000\"],\"minLength\":1,\"type\":\"string\"}},\"required\":[\"user_id\",\"provider\"],\"type\":\"object\"}],\"description\":\"Terra User object\",\"type\":\"object\"}},\"type\":\"object\"},{\"description\":\"Acknowledgement returned when `to_webhook` is true (the default): the requested data is fetched asynchronously and delivered to your configured destination, and this body confirms the request was accepted.\\n\",\"properties\":{\"message\":{\"description\":\"Present only for large requests (date range over one month), which are delivered in chunks.\",\"example\":\"Large request submitted. The data is being processed and will be sent to your destination in chunks\",\"type\":\"string\"},\"reference\":{\"description\":\"Payload reference, tying this request to the webhook payload you will receive.\",\"example\":\"5a3c2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"},\"status\":{\"enum\":[\"success\"],\"example\":\"success\",\"type\":\"string\"},\"trace_id\":{\"description\":\"Trace identifier for this request (equal to `reference`).\",\"example\":\"5a3c2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"},\"type\":{\"description\":\"The data type that was requested (e.g. `activity`, `sleep`).\",\"example\":\"activity\",\"type\":\"string\"},\"user\":{\"description\":\"Summary of the connection the data was requested for.\",\"properties\":{\"active\":{\"example\":true,\"type\":\"boolean\"},\"created_at\":{\"example\":\"2024-01-15T09:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"last_webhook_update\":{\"example\":\"2024-01-20T11:00:00Z\",\"format\":\"date-time\",\"type\":[\"string\",\"null\"]},\"provider\":{\"example\":\"GARMIN\",\"type\":\"string\"},\"reference_id\":{\"example\":\"user123@email.com\",\"type\":[\"string\",\"null\"]},\"scopes\":{\"description\":\"Comma-separated list of granted scopes.\",\"example\":\"activity,sleep,daily\",\"type\":\"string\"},\"user_id\":{\"example\":\"5a3c2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}]}}},\"description\":\"Returned upon successful data request\"},\"400\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"invalid start_date\",\"instance\":\"/activity\",\"title\":\"bad request\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"One or more parameters is malformed. The `detail` field describes the specific problem.\"},\"401\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"dev-id or x-api-key headers are missing\",\"instance\":\"/activity\",\"title\":\"unauthorized\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"Authentication credentials are missing or invalid.\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/athlete","segments":[{"lit":"athlete"}],"select":{"exist":["to_webhook","user_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"athlete","name__orig":"athlete","Name":"Athlete","name_":"athlete","name-":"athlete","NAME":"ATHLETE","index$":1}, {"active":true,"entity":"athlete","key$":"BasicAthleteFlow","kind":"basic","name":"BasicAthleteFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"athlete_ref01","srcdatavar":"athlete_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-athlete_ref01"}}],"index$":0}]}, 'Athlete')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let athlete_ref01_data = Object.values(setup.data.existing.athlete)[0]

    // LOAD
    const athlete_ref01_ent = client.Athlete()
    const athlete_ref01_match_dt0 = {}
    const athlete_ref01_data_dt0 = (await athlete_ref01_ent.load(athlete_ref01_match_dt0)).data()
    assert(null != athlete_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/athlete/AthleteTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TerraSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['athlete01','athlete02','athlete03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_ATHLETE_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_ATHLETE_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_ATHLETE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TerraSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TERRA_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TERRA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
