
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


describe('LabReportFileEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.LabReportFile()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == config.feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LabReportFile().list({"id":1}),
      (err) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"filename":{"a":true,"h":"Filename","n":"filename","r":false,"t":"`$STRING`","key$":"filename","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"presigned_url":{"a":true,"h":"Presigned Url","n":"presigned_url","r":true,"t":"`$STRING`","key$":"presigned_url","index$":2}},"id":{"field":"id","name":"id"},"name":"lab_report_file","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /lab-reports/{session_id}/files","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lab-reports/{session_id}/files","q":{"exist":["id"]},"r":{"param":{"session_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"},{"var":"id"},{"lit":"files"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"lab_report_file","name__orig":"lab_report_file","Name":"LabReportFile","name_":"lab_report_file","name-":"lab-report-file","NAME":"LAB_REPORT_FILE","index$":9}, {"active":true,"entity":"lab_report_file","key$":"BasicLabReportFileFlow","kind":"basic","name":"BasicLabReportFileFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"session_id":"session01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"lab_report_file_ref01"}}],"unreachable":true}]}, 'LabReportFile', {"GET /lab-reports/{session_id}/files":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lab_report_file_ref01_data = Object.values(setup.data.existing.lab_report_file)[0]

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
      '../../../../.sdk/test/entity/lab_report_file/LabReportFileTestData.json')

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
    ['lab_report_file01','lab_report_file02','lab_report_file03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_LAB_REPORT_FILE_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_LAB_REPORT_FILE_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_LAB_REPORT_FILE_ENTID']
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
  
