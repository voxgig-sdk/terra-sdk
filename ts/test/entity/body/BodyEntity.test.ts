

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BodyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Body()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'body.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"body","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /body","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"start_date","or":"start_date","r":true,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"to_webhook","or":"to_webhook","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"with_sample","or":"with_sample","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"GET","o":"/body","q":{"exist":["end_date","start_date","to_webhook","user_id","with_sample"]},"r":{},"s":[{"lit":"body"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"body","name__orig":"body","Name":"Body","name_":"body","name-":"body","NAME":"BODY","index$":3}, {"active":true,"entity":"body","key$":"BasicBodyFlow","kind":"basic","name":"BasicBodyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"body_ref01","srcdatavar":"body_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-body_ref01"}}],"index$":0}]}, 'Body', {"GET /body":{"protocol":"http","parameters":[{"name":"user_id","in":"query","description":"Terra user ID (UUID format) to retrieve data for","schema":{"type":"string"},"required":true,"index$":0},{"name":"start_date","in":"query","description":"Start date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)","schema":{"oneOf":[{"type":"integer"},{"type":"string","format":"date"}]},"required":true,"index$":1},{"name":"end_date","in":"query","description":"End date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)","schema":{"oneOf":[{"type":"integer"},{"type":"string","format":"date"}]},"required":false,"index$":2},{"name":"to_webhook","in":"query","description":"Boolean flag specifying whether to send the data retrieved to the webhook instead of in the response (default: true if not provided)\n","schema":{"type":"boolean"},"required":false,"index$":3},{"name":"with_samples","in":"query","description":"Boolean flag specifying whether to include detailed samples in the returned payload (default: false)\n","schema":{"type":"boolean"},"required":false,"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let body_ref01_data = Object.values(setup.data.existing.body)[0] as any

    // LOAD
    const body_ref01_ent = client.Body()
    const body_ref01_match_dt0: any = {}
    const body_ref01_data_dt0 = (await body_ref01_ent.load(body_ref01_match_dt0)).data()
    assert(null != body_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/body/BodyTestData.json')

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
    ['body01','body02','body03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_BODY_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_BODY_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_BODY_ENTID']
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
  
