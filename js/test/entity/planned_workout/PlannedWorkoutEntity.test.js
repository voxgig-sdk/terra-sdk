
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


describe('PlannedWorkoutEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.PlannedWorkout()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    constructor() {
      super()
      this.name = 'failhook'
      this.version = '0.0.1'
      this.active = true
      this.unexpected = 0
    }
    init() { }
    PreSpec() { throw new Error('planned_workout hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TerraSDK.test(offline).PlannedWorkout().stream('list')) { }
    }, /offline/)

    for await (const _item of TerraSDK.test(offline).PlannedWorkout()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != config.feature?.rbac) {
      const denied = TerraSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.PlannedWorkout().stream('list')) { }
      }, (err) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain = {}
    const ctrl = { explain }
    for await (const _item of TerraSDK.test().PlannedWorkout().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TerraSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.PlannedWorkout().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.PlannedWorkout().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == config.feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TerraSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PlannedWorkout().list({"end_date":1,"user_id":"x"}),
      (err) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"athlete_metrics":{"a":true,"h":"Athlete Metrics","n":"athlete_metrics","r":false,"t":"`$ANY`","key$":"athlete_metrics","index$":0},"coercion_warnings":{"a":true,"h":"Coercion Warnings","n":"coercion_warnings","r":false,"sh":"Set when the template could not be represented exactly on the provider.","t":"`$STRING`","key$":"coercion_warnings","index$":1},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"sh":"Creation time (RFC 3339)","t":"`$ANY`","key$":"created_at","index$":2},"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Full workout body (title, description, planned metrics, structured steps) fetched live from the provider.","t":"`$ANY`","key$":"details","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"is_external":{"a":true,"h":"Is External","n":"is_external","r":false,"sh":"True when the workout was created on the provider side rather than through Terra.","t":"`$BOOLEAN`","key$":"is_external","index$":5},"last_updated_at":{"a":true,"h":"Last Updated At","n":"last_updated_at","r":false,"sh":"Last update time (RFC 3339)","t":"`$ANY`","key$":"last_updated_at","index$":6},"planned_date":{"a":true,"fo":"date","h":"Planned Date","n":"planned_date","op":{"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"New scheduled date (YYYY-MM-DD)","t":"`$STRING`","key$":"planned_date","index$":7},"planned_workout_id":{"a":true,"h":"Planned Workout Id","n":"planned_workout_id","r":false,"sh":"Terra identifier of the planned workout","t":"`$STRING`","key$":"planned_workout_id","index$":8},"provider_workout_id":{"a":true,"h":"Provider Workout Id","n":"provider_workout_id","r":false,"sh":"Identifier assigned by the provider, once pushed.","t":"`$STRING`","key$":"provider_workout_id","index$":9},"workout_id":{"a":true,"h":"Workout Id","n":"workout_id","r":false,"sh":"Identifier of the source template.","t":"`$STRING`","key$":"workout_id","index$":10}},"id":{"field":"id","name":"id"},"name":"planned_workout","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /plannedWorkouts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/plannedWorkouts","q":{"exist":["user_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"plannedWorkouts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /plannedWorkouts/{planned_workout_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"planned_workout_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/plannedWorkouts/{planned_workout_id}","q":{"exist":["id","user_id"]},"r":{"param":{"planned_workout_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"plannedWorkouts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["planned_date"],"co":{"id":"PATCH /plannedWorkouts/{planned_workout_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"planned_workout_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/plannedWorkouts/{planned_workout_id}","q":{"exist":["id","user_id"]},"r":{"param":{"planned_workout_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"plannedWorkouts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"planned_workout","name__orig":"planned_workout","Name":"PlannedWorkout","name_":"planned_workout","name-":"planned-workout","NAME":"PLANNED_WORKOUT","index$":12}, {"active":true,"entity":"planned_workout","key$":"BasicPlannedWorkoutFlow","kind":"basic","name":"BasicPlannedWorkoutFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"planned_workout_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"planned_workout_ref01","srcdatavar":"planned_workout_ref01_data","suffix":"_up0","textfield":"coercion_warnings"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-planned_workout_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"planned_workout_ref01","srcdatavar":"planned_workout_ref01_data","suffix":"_dt0"},"m":{"id":"planned_workout01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-planned_workout_ref01"}}],"index$":2}]}, 'PlannedWorkout', {"GET /plannedWorkouts":{"protocol":"http","parameters":[{"name":"user_id","in":"query","required":true,"schema":{"type":"string"},"index$":0},{"name":"start_date","in":"query","required":false,"schema":{"type":"string","format":"date"},"description":"Start of the planned-date window (YYYY-MM-DD). When start_date and end_date are omitted, provider-side workouts default to the trailing 30 days; pass an explicit window to list upcoming workouts.\n","index$":1},{"name":"end_date","in":"query","required":false,"schema":{"type":"string","format":"date"},"description":"End of the planned-date window (YYYY-MM-DD), inclusive.","index$":2}]},"GET /plannedWorkouts/{planned_workout_id}":{"protocol":"http","parameters":[{"name":"planned_workout_id","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"index$":0},{"name":"user_id","in":"query","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /plannedWorkouts/{planned_workout_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["planned_date"],"properties":{"planned_date":{"type":"string","format":"date","description":"New scheduled date (YYYY-MM-DD)","key$":"planned_date"}},"index$":1}}}},"parameters":[{"name":"planned_workout_id","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"index$":0},{"name":"user_id","in":"query","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let planned_workout_ref01_data = Object.values(setup.data.existing.planned_workout)[0]

    // LIST
    const planned_workout_ref01_ent = client.PlannedWorkout()
    const planned_workout_ref01_match = {}

    const planned_workout_ref01_list = (await planned_workout_ref01_ent.list(planned_workout_ref01_match)).map((e) => e.data())


    // UPDATE
    const planned_workout_ref01_data_up0 = {}
    planned_workout_ref01_data_up0.id = planned_workout_ref01_data.id

    const planned_workout_ref01_markdef_up0 = { name: 'coercion_warnings', value: 'Mark01-planned_workout_ref01_' + setup.now }
    planned_workout_ref01_data_up0 [planned_workout_ref01_markdef_up0.name] = planned_workout_ref01_markdef_up0.value

    const planned_workout_ref01_resdata_up0 = (await planned_workout_ref01_ent.update(planned_workout_ref01_data_up0)).data()
    assert(planned_workout_ref01_resdata_up0.id === planned_workout_ref01_data_up0.id)

    assert(planned_workout_ref01_resdata_up0[planned_workout_ref01_markdef_up0.name] === planned_workout_ref01_markdef_up0.value)


    // LOAD
    const planned_workout_ref01_match_dt0 = {}
    planned_workout_ref01_match_dt0.id = planned_workout_ref01_data.id
    const planned_workout_ref01_data_dt0 = (await planned_workout_ref01_ent.load(planned_workout_ref01_match_dt0)).data()
    assert(planned_workout_ref01_data_dt0.id === planned_workout_ref01_data.id)


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
      '../../../../.sdk/test/entity/planned_workout/PlannedWorkoutTestData.json')

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
    ['planned_workout01','planned_workout02','planned_workout03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_PLANNED_WORKOUT_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_PLANNED_WORKOUT_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_PLANNED_WORKOUT_ENTID']
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
  
