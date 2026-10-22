

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


describe('LabReportSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.LabReportSession()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LabReportSession().load({"session_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lab_report_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"collection_date":{"a":true,"h":"Collection Date","n":"collection_date","r":false,"sh":"Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted.","t":"`$STRING`","key$":"collection_date","index$":0},"collection_time":{"a":true,"h":"Collection Time","n":"collection_time","r":false,"sh":"Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted.","t":"`$STRING`","key$":"collection_time","index$":1},"current_status":{"a":true,"h":"Current Status","n":"current_status","r":true,"sh":"Current status as a clean lowercase string (open enum — handle unknown values gracefully).","t":"`$STRING`","key$":"current_status","index$":2},"error":{"a":true,"h":"Error","n":"error","r":true,"sh":"Why the report failed: the same object the lab_report.failed webhook carries.","t":"`$OBJECT`","key$":"error","index$":3},"file_count":{"a":true,"h":"File Count","n":"file_count","r":false,"t":"`$INTEGER`","key$":"file_count","index$":4},"input_bytes":{"a":true,"h":"Input Bytes","n":"input_bytes","r":false,"t":"`$INTEGER`","key$":"input_bytes","index$":5},"lab_name":{"a":true,"h":"Lab Name","n":"lab_name","r":false,"t":"`$STRING`","key$":"lab_name","index$":6},"output_bytes":{"a":true,"h":"Output Bytes","n":"output_bytes","r":false,"t":"`$INTEGER`","key$":"output_bytes","index$":7},"panels":{"a":true,"h":"Panels","n":"panels","r":false,"sh":"Report-level panels that results reference by panel_id.","t":"`$ARRAY`","key$":"panels","index$":8},"patient_age_at_collection":{"a":true,"h":"Patient Age At Collection","n":"patient_age_at_collection","r":false,"sh":"Patient age in years; omitted if unknown.","t":"`$INTEGER`","key$":"patient_age_at_collection","index$":9},"patient_sex":{"a":true,"h":"Patient Sex","n":"patient_sex","r":false,"sh":"Clean lowercase string (open enum); omitted if unspecified.","t":"`$STRING`","key$":"patient_sex","index$":10},"reference_id":{"a":true,"h":"Reference Id","n":"reference_id","r":false,"sh":"Your external reference; omitted if not set.","t":"`$STRING`","key$":"reference_id","index$":11},"report_date":{"a":true,"h":"Report Date","n":"report_date","r":false,"sh":"Date printed on the report (YYYY-MM-DD); omitted if not extracted.","t":"`$STRING`","key$":"report_date","index$":12},"report_locale":{"a":true,"h":"Report Locale","n":"report_locale","r":false,"t":"`$STRING`","key$":"report_locale","index$":13},"report_notes":{"a":true,"h":"Report Notes","n":"report_notes","r":false,"t":"`$STRING`","key$":"report_notes","index$":14},"report_time":{"a":true,"h":"Report Time","n":"report_time","r":false,"sh":"Time printed on the report (HH:MM, 24-hour); omitted if not extracted.","t":"`$STRING`","key$":"report_time","index$":15},"report_type":{"a":true,"h":"Report Type","n":"report_type","r":true,"sh":"What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully).","t":"`$STRING`","key$":"report_type","index$":16},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"The layered biomarker results.","t":"`$ARRAY`","key$":"results","index$":17},"results_count":{"a":true,"h":"Results Count","n":"results_count","r":false,"t":"`$INTEGER`","key$":"results_count","index$":18},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":true,"t":"`$STRING`","key$":"session_id","index$":19},"status_history":{"a":true,"h":"Status History","n":"status_history","r":false,"t":"`$ARRAY`","key$":"status_history","index$":20},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":21},"upload_id":{"a":true,"h":"Upload Id","n":"upload_id","r":false,"t":"`$STRING`","key$":"upload_id","index$":22},"uploaded_at":{"a":true,"fo":"date-time","h":"Uploaded At","n":"uploaded_at","r":false,"t":"`$STRING`","key$":"uploaded_at","index$":23}},"name":"lab_report_session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /reports/{session_id}/reprocess","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"session_id","or":"session_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"legacy_format","or":"legacy_format","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"POST","o":"/reports/{session_id}/reprocess","q":{"$action":"reprocess","exist":["session_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reports"},{"var":"session_id"},{"lit":"reprocess"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /reports/{session_id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"session_id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/reports/{session_id}","q":{"exist":["session_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reports"},{"var":"session_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"lab_report_session","name__orig":"lab_report_session","Name":"LabReportSession","name_":"lab_report_session","name-":"lab-report-session","NAME":"LAB_REPORT_SESSION","index$":10}, {"active":true,"entity":"lab_report_session","key$":"BasicLabReportSessionFlow","kind":"basic","name":"BasicLabReportSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lab_report_session_ref01"},"m":{"session_id":"session01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"lab_report_session_ref01","srcdatavar":"lab_report_session_ref01_data","suffix":"_dt0"},"m":{"id":"lab_report_session01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lab_report_session_ref01"}}],"index$":1}]}, 'LabReportSession', {"POST /reports/{session_id}/reprocess":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":1},{"name":"legacy_format","in":"query","required":false,"description":"Deliver the re-run in the pre-v6 webhook shape. Only needed for a session uploaded on the pre-v6 surface before the upload's shape was recorded with the session; otherwise the recorded shape is used.","schema":{"type":"boolean"},"index$":2}]},"GET /reports/{session_id}":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const lab_report_session_ref01_ent = client.LabReportSession()
    let lab_report_session_ref01_data = setup.data.new.lab_report_session['lab_report_session_ref01']
    lab_report_session_ref01_data['session_id'] = setup.idmap['session01']

    lab_report_session_ref01_data = (await lab_report_session_ref01_ent.create(lab_report_session_ref01_data)).data()
    assert(null != lab_report_session_ref01_data)



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
      '../../../../.sdk/test/entity/lab_report_session/LabReportSessionTestData.json')

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
    ['lab_report_session01','lab_report_session02','lab_report_session03','session01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_LAB_REPORT_SESSION_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_LAB_REPORT_SESSION_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_LAB_REPORT_SESSION_ENTID']
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
  
