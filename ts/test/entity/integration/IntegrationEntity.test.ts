

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TerraSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('IntegrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Integration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'integration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"enabled","req":false,"short":"Whether the integration is enabled","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"icon","req":false,"short":"URL for the provider's icon image","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Display name of the integration","type":"`$STRING`","index$":2},{"active":true,"name":"provider","req":false,"short":"Identifier for the provider","type":"`$STRING`","index$":3},{"active":true,"name":"providers","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"sdk_providers","req":false,"short":"Providers available through Terra's mobile SDKs rather than cloud connections","type":"`$ARRAY`","index$":5},{"active":true,"name":"setup","req":false,"short":"Indicates how the integration is set up","type":"`$STRING`","index$":6},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"types","req":false,"short":"Indicates the types of data available through the provider","type":"`$OBJECT`","index$":8}],"name":"integration","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"sdk","orig":"sdk","reqd":false,"type":"`$BOOLEAN`"}]},"contract":{"id":"GET /integrations/detailed","json":"{\"operationId\":\"Integrations_ListDetailed\",\"parameters\":[{\"description\":\"If `true`, allows SDK integrations to be included in the response.\",\"in\":\"query\",\"name\":\"sdk\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"providers\":{\"description\":\"List of integration providers with their details\",\"items\":{\"properties\":{\"enabled\":{\"description\":\"Whether the integration is enabled\",\"example\":true,\"type\":\"boolean\"},\"icon\":{\"description\":\"URL for the provider's icon image\",\"example\":\"https://access.tryterra.co/api/v2/static/assets/img/app_icons/mapmyfitness.webp\",\"type\":\"string\"},\"name\":{\"description\":\"Display name of the integration\",\"example\":\"MapMyFitness\",\"type\":\"string\"},\"provider\":{\"description\":\"Identifier for the provider\",\"example\":\"MAPMYFITNESS\",\"type\":\"string\"},\"setup\":{\"description\":\"Indicates how the integration is set up\",\"example\":\"API_KEYS_MANAGED\",\"type\":\"string\"},\"types\":{\"description\":\"Indicates the types of data available through the provider\",\"properties\":{\"activity\":{\"example\":true,\"type\":\"boolean\"},\"body\":{\"example\":false,\"type\":\"boolean\"},\"daily\":{\"example\":false,\"type\":\"boolean\"},\"menstruation\":{\"example\":false,\"type\":\"boolean\"},\"nutrition\":{\"example\":false,\"type\":\"boolean\"},\"sleep\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"Status of the API response\",\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response containing a list of integrations.\"}},\"security\":[],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/integrations/detailed","segments":[{"lit":"integrations"},{"lit":"detailed"}],"select":{"$action":"detailed","exist":["sdk"]},"transform":{"req":"`reqdata`","res":"`body.providers`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /integrations","json":"{\"operationId\":\"Integrations_List\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"providers\":{\"items\":{\"example\":\"FITBIT\",\"type\":\"string\"},\"type\":\"array\"},\"sdk_providers\":{\"description\":\"Providers available through Terra's mobile SDKs rather than cloud connections\",\"items\":{\"example\":\"APPLE\",\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"default\":\"success\",\"enum\":[\"success\",\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Returns list of all available integrations on the API\"}},\"security\":[],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/integrations","segments":[{"lit":"integrations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"integration","name__orig":"integration","Name":"Integration","name_":"integration","name-":"integration","NAME":"INTEGRATION","index$":6}, {"active":true,"entity":"integration","key$":"BasicIntegrationFlow","kind":"basic","name":"BasicIntegrationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"integration_ref01"}}],"index$":0}]}, 'Integration')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let integration_ref01_data = Object.values(setup.data.existing.integration)[0] as any

    // LIST
    const integration_ref01_ent = client.Integration()
    const integration_ref01_match: any = {}

    const integration_ref01_list = (await integration_ref01_ent.list(integration_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/integration/IntegrationTestData.json')

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
    ['integration01','integration02','integration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_INTEGRATION_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_INTEGRATION_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_INTEGRATION_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
