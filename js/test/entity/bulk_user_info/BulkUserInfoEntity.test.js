
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


describe('BulkUserInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.BulkUserInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"bulk_user_info","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /bulkUserInfo","json":"{\"operationId\":\"User_BatchGet\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"List of user IDs to get information for\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"List of User objects\",\"items\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"active\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"description\":\"whether the user is active or not (inactive users will not receive any data updates and are in considered \",\"examples\":[true]},\"created_at\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Time at which the connection was created\",\"examples\":[\"2022-12-12T10:00:00.000000+00:00\"]},\"last_webhook_update\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Last time at which a webhook update was sent for the connection\",\"examples\":[\"2022-12-12T10:00:00.000000+00:00\"]},\"provider\":{\"description\":\"Connection data source\",\"examples\":[\"FITBIT\"],\"minLength\":1,\"type\":\"string\"},\"reference_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Connection identifier on the developer's end, used to tie connection back to a user on the developer's platform\",\"examples\":[\"user123@email.com\"]},\"scopes\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"(when available) Permissions granted by the user during authentication - to be used as debugging metadata\",\"examples\":[\"activity:read,sleep:read\"]},\"user_id\":{\"description\":\"Terra identifier for the wearable connection\",\"examples\":[\"123e4567-e89b-12d3-a456-426614174000\"],\"minLength\":1,\"type\":\"string\"}},\"required\":[\"user_id\",\"provider\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Returned upon successful request\"},\"400\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"invalid start_date\",\"instance\":\"/activity\",\"title\":\"bad request\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"One or more parameters is malformed. The `detail` field describes the specific problem.\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/bulkUserInfo","segments":[{"lit":"bulkUserInfo"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bulk_user_info","name__orig":"bulk_user_info","Name":"BulkUserInfo","name_":"bulk_user_info","name-":"bulk-user-info","NAME":"BULK_USER_INFO","index$":4}, {"active":true,"entity":"bulk_user_info","key$":"BasicBulkUserInfoFlow","kind":"basic","name":"BasicBulkUserInfoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"bulk_user_info_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'BulkUserInfo')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const bulk_user_info_ref01_ent = client.BulkUserInfo()
    let bulk_user_info_ref01_data = setup.data.new.bulk_user_info['bulk_user_info_ref01']

    bulk_user_info_ref01_data = (await bulk_user_info_ref01_ent.create(bulk_user_info_ref01_data)).data()
    assert(null != bulk_user_info_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/bulk_user_info/BulkUserInfoTestData.json')

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
    ['bulk_user_info01','bulk_user_info02','bulk_user_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_BULK_USER_INFO_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_BULK_USER_INFO_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_BULK_USER_INFO_ENTID']
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
  
