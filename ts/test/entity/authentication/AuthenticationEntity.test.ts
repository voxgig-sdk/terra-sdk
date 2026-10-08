

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


describe('AuthenticationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Authentication()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Authentication().create({"resource":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TERRA_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'authentication.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auth_failure_redirect_url":{"a":true,"h":"Auth Failure Redirect Url","n":"auth_failure_redirect_url","r":false,"sh":"URL the user is redirected to upon unsuccessful authentication","t":"`$STRING`","key$":"auth_failure_redirect_url","index$":0},"auth_success_redirect_url":{"a":true,"h":"Auth Success Redirect Url","n":"auth_success_redirect_url","r":false,"sh":"URL the user is redirected to upon successful authentication","t":"`$STRING`","key$":"auth_success_redirect_url","index$":1},"auth_url":{"a":true,"h":"Auth Url","n":"auth_url","r":false,"sh":"authentication URL the user must be redirected to in order to link their account","t":"`$STRING`","key$":"auth_url","index$":2},"expires_in":{"a":true,"h":"Expires In","n":"expires_in","r":false,"sh":"a number in seconds depicting how long the url is valid for","t":"`$INTEGER`","key$":"expires_in","index$":3},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"Display language of the widget","t":"`$STRING`","key$":"language","index$":4},"providers":{"a":true,"h":"Providers","n":"providers","r":false,"sh":"Comma separated list of providers to display on the device selection page.","t":"`$STRING`","key$":"providers","index$":5},"reference_id":{"a":true,"h":"Reference Id","n":"reference_id","r":false,"sh":"Identifier of the end user on your system, such as a user ID or email associated with them","t":"`$STRING`","key$":"reference_id","index$":6},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":false,"sh":"Session ID for the widget authentication session","t":"`$STRING`","key$":"session_id","index$":7},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"indicates that the request was successful","t":"`$STRING`","key$":"status","index$":8},"token":{"a":true,"h":"Token","n":"token","r":false,"t":"`$STRING`","key$":"token","index$":9},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"the widget URL the user must be redirected to in order to link their account","t":"`$STRING`","key$":"url","index$":10},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"User ID for the user being created","t":"`$STRING`","key$":"user_id","index$":11}},"name":"authentication","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["auth_failure_redirect_url","auth_success_redirect_url","language","reference_id"],"co":{"id":"POST /auth/authenticateUser","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"testingTerra","k":"header","n":"dev_id","or":"dev-id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"FITBIT","k":"query","n":"resource","or":"resource","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/auth/authenticateUser","q":{"exist":["dev_id","resource"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"authenticateUser"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /auth/generateAuthToken","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/generateAuthToken","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"generateAuthToken"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["auth_failure_redirect_url","auth_success_redirect_url","language","providers","reference_id"],"co":{"id":"POST /auth/generateWidgetSession","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/generateWidgetSession","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"generateWidgetSession"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /auth/deauthenticateUser","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/auth/deauthenticateUser","q":{"exist":["user_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"deauthenticateUser"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"authentication","name__orig":"authentication","Name":"Authentication","name_":"authentication","name-":"authentication","NAME":"AUTHENTICATION","index$":2}, {"active":true,"entity":"authentication","key$":"BasicAuthenticationFlow","kind":"basic","name":"BasicAuthenticationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"authentication_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"authentication_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":1}]}, 'Authentication', {"POST /auth/authenticateUser":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"language":{"type":"string","key$":"language"},"reference_id":{"type":"string","key$":"reference_id"},"auth_success_redirect_url":{"type":"string","key$":"auth_success_redirect_url"},"auth_failure_redirect_url":{"type":"string","key$":"auth_failure_redirect_url"}},"index$":1}}},"required":false},"parameters":[{"name":"resource","in":"query","description":"Provider resource identifier (e.g., 'FITBIT', 'GARMIN', 'OURA'). See \"Get detailed list of integrations\" for available providers","schema":{"type":"string"},"example":"FITBIT","required":true,"index$":0},{"name":"dev-id","in":"header","description":"your developer ID","required":true,"schema":{"type":"string"},"example":"testingTerra","index$":1}]},"POST /auth/generateAuthToken":{"protocol":"http","parameters":[]},"POST /auth/generateWidgetSession":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"providers":{"type":"string","description":"Comma separated list of providers to display on the device selection page. This overrides your selected sources on your dashboard","example":"GARMIN,FITBIT,OURA,WITHINGS,SUUNTO","key$":"providers"},"language":{"type":"string","description":"Display language of the widget","example":"en","key$":"language"},"reference_id":{"type":"string","description":"Identifier of the end user on your system, such as a user ID or email associated with them","example":"user123@email.com","key$":"reference_id"},"auth_success_redirect_url":{"type":"string","description":"URL the user is redirected to upon successful authentication","example":"https://myapp.com/success","key$":"auth_success_redirect_url"},"auth_failure_redirect_url":{"type":"string","description":"URL the user is redirected to upon unsuccessful authentication","example":"https://myapp.com/failure","key$":"auth_failure_redirect_url"}},"x-ref":"#/components/schemas/WidgetSessionParams","index$":1}}},"required":true},"parameters":[]},"DELETE /auth/deauthenticateUser":{"protocol":"http","parameters":[{"name":"user_id","in":"query","description":"Terra user ID (UUID format) to deauthenticate and remove from Terra system","schema":{"type":"string"},"required":true,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const authentication_ref01_ent = client.Authentication()
    let authentication_ref01_data = setup.data.new.authentication['authentication_ref01']

    authentication_ref01_data = (await authentication_ref01_ent.create(authentication_ref01_data)).data()
    assert(null != authentication_ref01_data)



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
      '../../../../.sdk/test/entity/authentication/AuthenticationTestData.json')

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
    ['authentication01','authentication02','authentication03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_AUTHENTICATION_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_AUTHENTICATION_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_AUTHENTICATION_ENTID']
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
  
