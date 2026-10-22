

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LabReport().load({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lab_report.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"current_status":{"a":true,"h":"Current Status","n":"current_status","r":true,"sh":"Processing status as a clean lowercase string.","t":"`$STRING`","key$":"current_status","index$":0},"file":{"a":true,"fo":"binary","h":"File","n":"file","r":true,"sh":"A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image.","t":"`$STRING`","key$":"file","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"upload_id":{"a":true,"h":"Upload Id","n":"upload_id","r":true,"sh":"Durable correlation key for the upload; every resulting session and webhook carries it.","t":"`$STRING`","key$":"upload_id","index$":3}},"id":{"field":"id","name":"id"},"name":"lab_report","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /lab-reports/{session_id}/reprocess","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"legacy_format","or":"legacy_format","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"POST","o":"/lab-reports/{session_id}/reprocess","q":{"$action":"reprocess","exist":["id"]},"r":{"param":{"session_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"},{"var":"id"},{"lit":"reprocess"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /lab-reports","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"patient_456","k":"query","n":"reference_id","or":"reference_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/lab-reports","q":{"$action":"legacy"},"r":{},"rb":{"fields":[{"binary":true,"name":"file"}],"kind":"multipart","media":"multipart/form-data"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /reports","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"patient_456","k":"query","n":"reference_id","or":"reference_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/reports","q":{},"r":{},"rb":{"fields":[{"binary":true,"name":"file"}],"kind":"multipart","media":"multipart/form-data"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /lab-reports/{session_id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lab-reports/{session_id}","q":{"$action":"legacy","exist":["id"]},"r":{"param":{"session_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /lab-reports","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"reference_id","or":"reference_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"report_date_from","or":"report_date_from","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"report_date_to","or":"report_date_to","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"dexa","k":"query","n":"report_type","or":"report_type","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"upload_id","or":"upload_id","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"uploaded_at_from","or":"uploaded_at_from","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"uploaded_at_to","or":"uploaded_at_to","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/lab-reports","q":{"$action":"legacy"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /reports","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"reference_id","or":"reference_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"report_date_from","or":"report_date_from","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"report_date_to","or":"report_date_to","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"dexa","k":"query","n":"report_type","or":"report_type","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"upload_id","or":"upload_id","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"uploaded_at_from","or":"uploaded_at_from","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"uploaded_at_to","or":"uploaded_at_to","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/reports","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /lab-reports/{session_id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/lab-reports/{session_id}","q":{"$action":"legacy","exist":["id"]},"r":{"param":{"session_id":"id"}},"s":[{"lit":"lab-reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /reports/{session_id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_terra_version","or":"X-Terra-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/reports/{session_id}","q":{"exist":["id"]},"r":{"param":{"session_id":"id"}},"s":[{"lit":"reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"lab_report","name__orig":"lab_report","Name":"LabReport","name_":"lab_report","name-":"lab-report","NAME":"LAB_REPORT","index$":7}, {"active":true,"entity":"lab_report","key$":"BasicLabReportFlow","kind":"basic","name":"BasicLabReportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lab_report_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"lab_report_ref01","srcdatavar":"lab_report_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lab_report_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"lab_report_ref01","suffix":"_rm0"},"m":{"id":"lab_report01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'LabReport', {"POST /lab-reports/{session_id}/reprocess":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":1},{"name":"legacy_format","in":"query","required":false,"description":"Deliver the re-run in the pre-v6 webhook shape. Only needed for a session uploaded on the pre-v6 surface before the upload's shape was recorded with the session; otherwise the recorded shape is used.","schema":{"type":"boolean"},"index$":2}]},"POST /lab-reports":{"protocol":"http","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["file"],"properties":{"file":{"type":"string","format":"binary","description":"A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image. Repeat the `file` part, up to 20 times, to send a report's pages as separate files, in the order of the pages. At most 20 MB per file and 50 MB per upload, of which at most 22.5 MB PDF. Files are stored as uploaded, so a HEIC photo keeps its EXIF metadata, location included; strip it before uploading if that matters."}}}}}},"parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"reference_id","in":"query","required":false,"description":"Your external identifier for this report or patient.","schema":{"type":"string"},"example":"patient_456","index$":1}]},"POST /reports":{"protocol":"http","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["file"],"properties":{"file":{"type":"string","format":"binary","description":"A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image. Repeat the `file` part, up to 20 times, to send a report's pages as separate files, in the order of the pages. At most 20 MB per file and 50 MB per upload, of which at most 22.5 MB PDF. Files are stored as uploaded, so a HEIC photo keeps its EXIF metadata, location included; strip it before uploading if that matters.","key$":"file"}},"index$":1}}}},"parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"reference_id","in":"query","required":false,"description":"Your external identifier for this report or patient.","schema":{"type":"string"},"example":"patient_456","index$":1}]},"GET /lab-reports/{session_id}":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":1}]},"GET /lab-reports":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"limit","in":"query","required":false,"description":"Page size; defaults to 50, and a larger value than 200 is served as 200. From API version 2026-10-21.","schema":{"type":"integer","minimum":1,"default":50},"index$":1},{"name":"cursor","in":"query","required":false,"description":"The previous page's `next_cursor`, sent with the same filters it was issued for; with different filters it is a 400 with code `validation_failed`. From API version 2026-10-21.","schema":{"type":"string"},"index$":2},{"name":"reference_id","in":"query","required":false,"description":"Filter by your external reference ID.","schema":{"type":"string"},"index$":3},{"name":"report_type","in":"query","required":false,"description":"Return only sessions of this kind. Omit for both.","schema":{"type":"string","enum":["lab","dexa"]},"example":"dexa","index$":4},{"name":"upload_id","in":"query","required":false,"description":"Filter by upload handle — returns every report from that upload.","schema":{"type":"string"},"index$":5},{"name":"report_date_from","in":"query","required":false,"description":"Lab report date lower bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":6},{"name":"report_date_to","in":"query","required":false,"description":"Lab report date upper bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":7},{"name":"uploaded_at_from","in":"query","required":false,"description":"Upload date lower bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":8},{"name":"uploaded_at_to","in":"query","required":false,"description":"Upload date upper bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":9}]},"GET /reports":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"limit","in":"query","required":false,"description":"Page size; defaults to 50, and a larger value than 200 is served as 200. From API version 2026-10-21.","schema":{"type":"integer","minimum":1,"default":50},"index$":1},{"name":"cursor","in":"query","required":false,"description":"The previous page's `next_cursor`, sent with the same filters it was issued for; with different filters it is a 400 with code `validation_failed`. From API version 2026-10-21.","schema":{"type":"string"},"index$":2},{"name":"reference_id","in":"query","required":false,"description":"Filter by your external reference ID.","schema":{"type":"string"},"index$":3},{"name":"report_type","in":"query","required":false,"description":"Return only sessions of this kind. Omit for both.","schema":{"type":"string","enum":["lab","dexa"]},"example":"dexa","index$":4},{"name":"upload_id","in":"query","required":false,"description":"Filter by upload handle — returns every report from that upload.","schema":{"type":"string"},"index$":5},{"name":"report_date_from","in":"query","required":false,"description":"Lab report date lower bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":6},{"name":"report_date_to","in":"query","required":false,"description":"Lab report date upper bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":7},{"name":"uploaded_at_from","in":"query","required":false,"description":"Upload date lower bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":8},{"name":"uploaded_at_to","in":"query","required":false,"description":"Upload date upper bound (inclusive, ISO-8601 `YYYY-MM-DD`).","schema":{"type":"string","format":"date"},"index$":9}]},"DELETE /lab-reports/{session_id}":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":1}]},"DELETE /reports/{session_id}":{"protocol":"http","parameters":[{"name":"X-Terra-Version","in":"header","required":false,"description":"The lab-reports API version to serve this request in, as a YYYY-MM-DD date: the newest version on or before it, or 2026-03-24 for an earlier date. Defaults to the environment's pinned version, else the latest. A malformed or future date is a 400 with code `invalid_api_version`.","schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/LabReportsApiVersion","index$":0},{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":1}]}}, { strict: LIVE_STRICT, t })
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


    // LOAD
    const lab_report_ref01_match_dt0: any = {}
    lab_report_ref01_match_dt0.id = lab_report_ref01_data.id
    const lab_report_ref01_data_dt0 = (await lab_report_ref01_ent.load(lab_report_ref01_match_dt0)).data()
    assert(lab_report_ref01_data_dt0.id === lab_report_ref01_data.id)


    // REMOVE
    const lab_report_ref01_match_rm0: any = { id: lab_report_ref01_data.id }
    await lab_report_ref01_ent.remove(lab_report_ref01_match_rm0)
  

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
  
