
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


describe('LabReportFileEntity', async () => {

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.LabReportFile()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lab_report_file_ref01_data = Object.values(setup.data.existing.lab_report_file)[0]

    // LIST
    const lab_report_file_ref01_ent = client.LabReportFile()
    const lab_report_file_ref01_match = {}
    lab_report_file_ref01_match['session_id'] = setup.idmap['session01']

    const lab_report_file_ref01_list = (await lab_report_file_ref01_ent.list(lab_report_file_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/lab_report_file/LabReportFileTestData.json')

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
    ['lab_report_file01','lab_report_file02','lab_report_file03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_LAB_REPORT_FILE_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': 'NONE',
  })

  idmap = env['TERRA_TEST_LAB_REPORT_FILE_ENTID']

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
  
