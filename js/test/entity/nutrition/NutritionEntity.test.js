
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


describe('NutritionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Nutrition()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == config.feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Nutrition().load({"start_date":"x","to_webhook":"x","user_id":"x"}),
      (err) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"nutrition","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /nutrition","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"start_date","or":"start_date","r":true,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"to_webhook","or":"to_webhook","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"with_sample","or":"with_samples","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"GET","o":"/nutrition","q":{"exist":["start_date","user_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"nutrition"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"nutrition","name__orig":"nutrition","Name":"Nutrition","name_":"nutrition","name-":"nutrition","NAME":"NUTRITION","index$":12}, {"active":true,"entity":"nutrition","key$":"BasicNutritionFlow","kind":"basic","name":"BasicNutritionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"nutrition_ref01","srcdatavar":"nutrition_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-nutrition_ref01"}}],"index$":0}]}, 'Nutrition', {"GET /nutrition":{"protocol":"http","parameters":[{"name":"user_id","in":"query","description":"Terra user ID (UUID format) to retrieve data for","schema":{"type":"string"},"required":true,"index$":0},{"name":"start_date","in":"query","description":"Start date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)","schema":{"oneOf":[{"type":"integer"},{"type":"string","format":"date"}]},"required":true,"index$":1},{"name":"end_date","in":"query","description":"End date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)","schema":{"oneOf":[{"type":"integer"},{"type":"string","format":"date"}]},"required":false,"index$":2},{"name":"to_webhook","in":"query","description":"Boolean flag specifying whether to send the data retrieved to the webhook instead of in the response (default: true if not provided)\n","schema":{"type":"boolean"},"required":false,"index$":3},{"name":"with_samples","in":"query","description":"Boolean flag specifying whether to include detailed samples in the returned payload (default: false)\n","schema":{"type":"boolean"},"required":false,"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let nutrition_ref01_data = Object.values(setup.data.existing.nutrition)[0]

    // LOAD
    const nutrition_ref01_ent = client.Nutrition()
    const nutrition_ref01_match_dt0 = {}
    const nutrition_ref01_data_dt0 = (await nutrition_ref01_ent.load(nutrition_ref01_match_dt0)).data()
    assert(null != nutrition_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/nutrition/NutritionTestData.json')

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
    ['nutrition01','nutrition02','nutrition03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_NUTRITION_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_NUTRITION_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_NUTRITION_ENTID']
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
  
