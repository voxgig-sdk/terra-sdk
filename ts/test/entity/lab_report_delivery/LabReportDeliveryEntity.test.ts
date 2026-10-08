

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


describe('LabReportDeliveryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.LabReportDelivery()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LabReportDelivery().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lab_report_delivery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attempt_count":{"a":true,"h":"Attempt Count","n":"attempt_count","r":true,"sh":"Retry count — 0 on the first attempt, incremented per retry.","t":"`$INTEGER`","key$":"attempt_count","index$":0},"destination_id":{"a":true,"h":"Destination Id","n":"destination_id","r":true,"t":"`$STRING`","key$":"destination_id","index$":1},"destination_type":{"a":true,"h":"Destination Type","n":"destination_type","r":false,"sh":"The destination's type (e.g.","t":"`$STRING`","key$":"destination_type","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"last_error":{"a":true,"h":"Last Error","n":"last_error","r":false,"sh":"Most recent delivery error; omitted when delivered.","t":"`$STRING`","key$":"last_error","index$":4},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"pending, delivered, or failed.","t":"`$STRING`","key$":"status","index$":5}},"id":{"field":"id","name":"id"},"name":"lab_report_delivery","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /lab-reports/{session_id}/deliveries","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lab-reports/{session_id}/deliveries","q":{"exist":["id"]},"r":{"param":{"session_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"lab-reports"},{"var":"id"},{"lit":"deliveries"}],"t":{"req":"`reqdata`","res":"`body.deliveries`"},"index$":0},{"a":true,"co":{"id":"GET /reports/{session_id}/deliveries","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"297405620317847552","k":"param","n":"report_id","or":"session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/reports/{session_id}/deliveries","q":{"exist":["report_id"]},"r":{"param":{"session_id":"report_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reports"},{"var":"report_id"},{"lit":"deliveries"}],"t":{"req":"`reqdata`","res":"`body.deliveries`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"lab_report_delivery","name__orig":"lab_report_delivery","Name":"LabReportDelivery","name_":"lab_report_delivery","name-":"lab-report-delivery","NAME":"LAB_REPORT_DELIVERY","index$":8}, {"active":true,"entity":"lab_report_delivery","key$":"BasicLabReportDeliveryFlow","kind":"basic","name":"BasicLabReportDeliveryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"report_id":"report01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"lab_report_delivery_ref01"}}],"index$":0}]}, 'LabReportDelivery', {"GET /lab-reports/{session_id}/deliveries":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":0}]},"GET /reports/{session_id}/deliveries":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"description":"The session's snowflake ID.","schema":{"type":"string"},"example":"297405620317847552","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lab_report_delivery_ref01_data = Object.values(setup.data.existing.lab_report_delivery)[0] as any

    // LIST
    const lab_report_delivery_ref01_ent = client.LabReportDelivery()
    const lab_report_delivery_ref01_match: any = {}
    lab_report_delivery_ref01_match['report_id'] = setup.idmap['report01']

    const lab_report_delivery_ref01_list = (await lab_report_delivery_ref01_ent.list(lab_report_delivery_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/lab_report_delivery/LabReportDeliveryTestData.json')

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
    ['lab_report_delivery01','lab_report_delivery02','lab_report_delivery03','report01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_LAB_REPORT_DELIVERY_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_LAB_REPORT_DELIVERY_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_LAB_REPORT_DELIVERY_ENTID']
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
  
