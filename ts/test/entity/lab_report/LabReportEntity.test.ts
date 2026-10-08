

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TerraSDK, BaseFeature, config, stdutil } from '../../..'

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LabReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.LabReport()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('lab_report hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TerraSDK.test(offline).LabReport().stream('list')) { }
    }, /offline/)

    for await (const _item of TerraSDK.test(offline).LabReport()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TerraSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LabReport().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TerraSDK.test().LabReport().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TerraSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LabReport().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LabReport().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LabReport().list({"reference_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lab_report.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"collection_date":{"a":true,"h":"Collection Date","n":"collection_date","r":false,"sh":"Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted.","t":"`$STRING`","key$":"collection_date","index$":0},"collection_time":{"a":true,"h":"Collection Time","n":"collection_time","r":false,"sh":"Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted.","t":"`$STRING`","key$":"collection_time","index$":1},"current_status":{"a":true,"h":"Current Status","n":"current_status","r":true,"sh":"Current status as a clean lowercase string (open enum), e.g.","t":"`$STRING`","key$":"current_status","index$":2},"file_count":{"a":true,"h":"File Count","n":"file_count","r":false,"t":"`$INTEGER`","key$":"file_count","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"input_bytes":{"a":true,"h":"Input Bytes","n":"input_bytes","r":false,"t":"`$INTEGER`","key$":"input_bytes","index$":5},"lab_name":{"a":true,"h":"Lab Name","n":"lab_name","r":false,"t":"`$STRING`","key$":"lab_name","index$":6},"output_bytes":{"a":true,"h":"Output Bytes","n":"output_bytes","r":false,"t":"`$INTEGER`","key$":"output_bytes","index$":7},"panels":{"a":true,"h":"Panels","n":"panels","r":false,"sh":"Report-level panels that results reference by panel_id.","t":"`$ARRAY`","key$":"panels","index$":8},"patient_age_at_collection":{"a":true,"h":"Patient Age At Collection","n":"patient_age_at_collection","r":false,"sh":"Patient age in years; omitted if unknown.","t":"`$INTEGER`","key$":"patient_age_at_collection","index$":9},"patient_sex":{"a":true,"h":"Patient Sex","n":"patient_sex","r":false,"sh":"Clean lowercase string (open enum); omitted if unspecified.","t":"`$STRING`","key$":"patient_sex","index$":10},"reference_id":{"a":true,"h":"Reference Id","n":"reference_id","r":false,"sh":"Your external reference; omitted if not set.","t":"`$STRING`","key$":"reference_id","index$":11},"report_date":{"a":true,"h":"Report Date","n":"report_date","r":false,"sh":"Date printed on the report (YYYY-MM-DD); omitted if not extracted.","t":"`$STRING`","key$":"report_date","index$":12},"report_locale":{"a":true,"h":"Report Locale","n":"report_locale","r":false,"t":"`$STRING`","key$":"report_locale","index$":13},"report_notes":{"a":true,"h":"Report Notes","n":"report_notes","r":false,"t":"`$STRING`","key$":"report_notes","index$":14},"report_time":{"a":true,"h":"Report Time","n":"report_time","r":false,"sh":"Time printed on the report (HH:MM, 24-hour); omitted if not extracted.","t":"`$STRING`","key$":"report_time","index$":15},"report_type":{"a":true,"h":"Report Type","n":"report_type","r":true,"sh":"What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully).","t":"`$STRING`","key$":"report_type","index$":16},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"The layered biomarker results.","t":"`$ARRAY`","key$":"results","index$":17},"results_count":{"a":true,"h":"Results Count","n":"results_count","r":false,"t":"`$INTEGER`","key$":"results_count","index$":18},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":true,"t":"`$STRING`","key$":"session_id","index$":19},"status_history":{"a":true,"h":"Status History","n":"status_history","r":false,"t":"`$ARRAY`","key$":"status_history","index$":20},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":21},"upload_id":{"a":true,"h":"Upload Id","n":"upload_id","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Durable correlation key for the upload; every resulting session and webhook carries it.","t":"`$STRING`","key$":"upload_id","index$":22},"uploaded_at":{"a":true,"fo":"date-time","h":"Uploaded At","n":"uploaded_at","r":false,"t":"`$STRING`","key$":"uploaded_at","index$":23}},"id":{"field":"id","name":"id"},"name":"lab_report","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /lab-reports","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient_456","k":"query","n":"reference_id","or":"reference_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/lab-reports","q":{},"r":{},"rb":{"fields":[{"binary":true,"name":"file"}],"kind":"multipart","media":"multipart/form-data"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /lab-reports","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"reference_id","or":"reference_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"report_date_from","or":"report_date_from","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"report_date_to","or":"report_date_to","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"dexa","k":"query","n":"report_type","or":"report_type","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"upload_id","or":"upload_id","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"uploaded_at_from","or":"uploaded_at_from","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"uploaded_at_to","or":"uploaded_at_to","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/lab-reports","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"}],"t":{"req":"`reqdata`","res":"`body.sessions`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /lab-reports/{session_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lab-reports/{session_id}","q":{"exist":["id"]},"r":{"param":{"session_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /lab-reports/{session_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/lab-reports/{session_id}","q":{"exist":["id"]},"r":{"param":{"session_id":"id"}},"s":[{"lit":"lab-reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /reports/{session_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/reports/{session_id}","q":{"exist":["id"]},"r":{"param":{"session_id":"id"}},"s":[{"lit":"reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"lab_report","name__orig":"lab_report","Name":"LabReport","name_":"lab_report","name-":"lab-report","NAME":"LAB_REPORT","index$":7}, {"active":true,"entity":"lab_report","key$":"BasicLabReportFlow","kind":"basic","name":"BasicLabReportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lab_report_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"lab_report_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"lab_report_ref01","srcdatavar":"lab_report_ref01_data","suffix":"_dt0"},"m":{"id":"lab_report01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lab_report_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"lab_report_ref01","suffix":"_rm0"},"m":{"id":"lab_report01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"lab_report_ref01"}}],"index$":4}]}, 'LabReport', {"POST /lab-reports":{"protocol":"http","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["file"],"properties":{"file":{"type":"string","format":"binary","description":"The lab report file (PDF, PNG, JPEG, GIF, or WebP; max 20 MB)."}}}}}},"parameters":[{"name":"reference_id","in":"query","required":false,"description":"Your external identifier for this report or patient.","schema":{"type":"string"},"example":"patient_456","index$":0}]},"GET /lab-reports":{"protocol":"http","parameters":[{"name":"reference_id","in":"query","required":false,"description":"Filter by your external reference ID.","schema":{"type":"string"},"index$":0},{"name":"report_type","in":"query","required":false,"description":"Return only sessions of this kind. Omit for both.","schema":{"type":"string","enum":["lab","dexa"]},"example":"dexa","index$":1},{"name":"upload_id","in":"query","required":false,"description":"Filter by upload handle — returns every report from that upload.","schema":{"type":"string"},"index$":2},{"name":"report_date_from","in":"query","required":false,"description":"Lab report date lower bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":3},{"name":"report_date_to","in":"query","required":false,"description":"Lab report date upper bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":4},{"name":"uploaded_at_from","in":"query","required":false,"description":"Upload date lower bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":5},{"name":"uploaded_at_to","in":"query","required":false,"description":"Upload date upper bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":6}]},"GET /lab-reports/{session_id}":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":0}]},"DELETE /lab-reports/{session_id}":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":0}]},"DELETE /reports/{session_id}":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const lab_report_ref01_ent = client.LabReport()
    let lab_report_ref01_data = setup.data.new.lab_report['lab_report_ref01']

    lab_report_ref01_data = (await lab_report_ref01_ent.create(lab_report_ref01_data)).data()
    assert(null != lab_report_ref01_data.id)


    // LIST
    const lab_report_ref01_match: any = {}

    const lab_report_ref01_list = (await lab_report_ref01_ent.list(lab_report_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(lab_report_ref01_list, { id: lab_report_ref01_data.id })))


    // LOAD
    const lab_report_ref01_match_dt0: any = {}
    lab_report_ref01_match_dt0.id = lab_report_ref01_data.id
    const lab_report_ref01_data_dt0 = (await lab_report_ref01_ent.load(lab_report_ref01_match_dt0)).data()
    assert(lab_report_ref01_data_dt0.id === lab_report_ref01_data.id)


    // REMOVE
    const lab_report_ref01_match_rm0: any = { id: lab_report_ref01_data.id }
    await lab_report_ref01_ent.remove(lab_report_ref01_match_rm0)
  

    // LIST
    const lab_report_ref01_match_rt0: any = {}

    const lab_report_ref01_list_rt0 = (await lab_report_ref01_ent.list(lab_report_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(lab_report_ref01_list_rt0, { id: lab_report_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/lab_report/LabReportTestData.json')

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
    ['lab_report01','lab_report02','lab_report03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_LAB_REPORT_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_LAB_REPORT_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_LAB_REPORT_ENTID']
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
  
