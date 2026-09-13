
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


describe('WorkoutEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Workout()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const workout_ref01_ent = client.Workout()
    let workout_ref01_data = setup.data.new.workout['workout_ref01']

    workout_ref01_data = (await workout_ref01_ent.create(workout_ref01_data)).data()
    assert(null != workout_ref01_data.id)


    // LIST
    const workout_ref01_match = {}

    const workout_ref01_list = (await workout_ref01_ent.list(workout_ref01_match)).map((e) => e.data())

    assert(!isempty(select(workout_ref01_list, { id: workout_ref01_data.id })))


    // LOAD
    const workout_ref01_match_dt0 = {}
    workout_ref01_match_dt0.id = workout_ref01_data.id
    const workout_ref01_data_dt0 = (await workout_ref01_ent.load(workout_ref01_match_dt0)).data()
    assert(workout_ref01_data_dt0.id === workout_ref01_data.id)


    // REMOVE
    const workout_ref01_match_rm0 = {}
    workout_ref01_match_rm0.id = workout_ref01_data.id
    await workout_ref01_ent.remove(workout_ref01_match_rm0)
  

    // LIST
    const workout_ref01_match_rt0 = {}

    const workout_ref01_list_rt0 = (await workout_ref01_ent.list(workout_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(workout_ref01_list_rt0, { id: workout_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/workout/WorkoutTestData.json')

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
    ['workout01','workout02','workout03','planned_workout01','planned_workout02','planned_workout03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_WORKOUT_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_WORKOUT_ENTID']

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
  
