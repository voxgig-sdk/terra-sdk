
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


describe('MenstruationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Menstruation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"menstruation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /menstruation","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"start_date","or":"start_date","r":true,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"to_webhook","or":"to_webhook","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"with_sample","or":"with_sample","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"GET","o":"/menstruation","q":{"exist":["end_date","start_date","to_webhook","user_id","with_sample"]},"r":{},"s":[{"lit":"menstruation"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"menstruation","name__orig":"menstruation","Name":"Menstruation","name_":"menstruation","name-":"menstruation","NAME":"MENSTRUATION","index$":10}, {"active":true,"entity":"menstruation","key$":"BasicMenstruationFlow","kind":"basic","name":"BasicMenstruationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"menstruation_ref01","srcdatavar":"menstruation_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-menstruation_ref01"}}],"index$":0}]}, 'Menstruation', {"GET /menstruation":{"protocol":"http","parameters":[{"name":"user_id","in":"query","description":"Terra user ID (UUID format) to retrieve data for","schema":{"type":"string"},"required":true,"index$":0},{"name":"start_date","in":"query","description":"Start date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)","schema":{"oneOf":[{"type":"integer"},{"type":"string","format":"date"}]},"required":true,"index$":1},{"name":"end_date","in":"query","description":"End date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)","schema":{"oneOf":[{"type":"integer"},{"type":"string","format":"date"}]},"required":false,"index$":2},{"name":"to_webhook","in":"query","description":"Boolean flag specifying whether to send the data retrieved to the webhook instead of in the response (default: true if not provided)\n","schema":{"type":"boolean"},"required":false,"index$":3},{"name":"with_samples","in":"query","description":"Boolean flag specifying whether to include detailed samples in the returned payload (default: false)\n","schema":{"type":"boolean"},"required":false,"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let menstruation_ref01_data = Object.values(setup.data.existing.menstruation)[0]

    // LOAD
    const menstruation_ref01_ent = client.Menstruation()
    const menstruation_ref01_match_dt0 = {}
    const menstruation_ref01_data_dt0 = (await menstruation_ref01_ent.load(menstruation_ref01_match_dt0)).data()
    assert(null != menstruation_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/menstruation/MenstruationTestData.json')

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
    ['menstruation01','menstruation02','menstruation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_MENSTRUATION_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_MENSTRUATION_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_MENSTRUATION_ENTID']
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
  
