

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

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulk_user_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bulk_user_infos":{"a":true,"h":"Bulk User Infos","n":"bulk_user_infos","r":false,"sh":"List of user IDs to get information for","t":"`$ARRAY`","key$":"bulk_user_infos","index$":0}},"name":"bulk_user_info","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["bulk_user_infos"],"co":{"id":"POST /bulkUserInfo","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/bulkUserInfo","q":{"exist":["bulk_user_infos"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"bulkUserInfo"}],"t":{"req":"`reqdata.bulk_user_infos`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bulk_user_info","name__orig":"bulk_user_info","Name":"BulkUserInfo","name_":"bulk_user_info","name-":"bulk-user-info","NAME":"BULK_USER_INFO","index$":4}, {"active":true,"entity":"bulk_user_info","key$":"BasicBulkUserInfoFlow","kind":"basic","name":"BasicBulkUserInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bulk_user_info_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BulkUserInfo', {"POST /bulkUserInfo":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"array","description":"List of user IDs to get information for","items":{"type":"string"},"index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
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
  
