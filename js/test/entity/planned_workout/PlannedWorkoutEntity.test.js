
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')


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


  test('basic', async () => {

    const setup = basicSetup()
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

  if ('TRUE' === env.TERRA_TEST_LIVE) {
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
      extra || {}
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
    now: Date.now(),
  }

  return setup
}
  
