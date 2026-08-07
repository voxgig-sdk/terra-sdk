
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { TerraSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('PlannedWorkoutEntity', async () => {

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

    const planned_workout_ref01_list = await planned_workout_ref01_ent.list(planned_workout_ref01_match)


    // UPDATE
    const planned_workout_ref01_data_up0 = {}

    const planned_workout_ref01_markdef_up0 = { name: 'coercion_warnings', value: 'Mark01-planned_workout_ref01_' + setup.now }
    planned_workout_ref01_data_up0 [planned_workout_ref01_markdef_up0.name] = planned_workout_ref01_markdef_up0.value

    const planned_workout_ref01_resdata_up0 = await planned_workout_ref01_ent.update(planned_workout_ref01_data_up0)
    assert(null != planned_workout_ref01_resdata_up0)

    assert(planned_workout_ref01_resdata_up0[planned_workout_ref01_markdef_up0.name] === planned_workout_ref01_markdef_up0.value)


    // LOAD
    const planned_workout_ref01_match_dt0 = {}
    const planned_workout_ref01_data_dt0 = await planned_workout_ref01_ent.load(planned_workout_ref01_match_dt0)
    assert(null != planned_workout_ref01_data_dt0)


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
    'TERRA_APIKEY': 'NONE',
  })

  idmap = env['TERRA_TEST_PLANNED_WORKOUT_ENTID']

  if ('TRUE' === env.TERRA_TEST_LIVE) {
    client = new TerraSDK(merge([
      {
        apikey: env.TERRA_APIKEY,
      },
      extra
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
  
