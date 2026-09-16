
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


describe('MenstruationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TERRA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TerraSDK.test()
    const ent = testsdk.Menstruation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"menstruation","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$ANY`","index$":0},{"active":true,"kind":"query","name":"start_date","orig":"start_date","reqd":true,"type":"`$ANY`","index$":1},{"active":true,"kind":"query","name":"to_webhook","orig":"to_webhook","reqd":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"kind":"query","name":"user_id","orig":"user_id","reqd":true,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"with_sample","orig":"with_sample","reqd":false,"type":"`$BOOLEAN`","index$":4}]},"contract":{"id":"GET /menstruation","json":"{\"operationId\":\"Menstruation_Get\",\"parameters\":[{\"description\":\"Terra user ID (UUID format) to retrieve data for\",\"in\":\"query\",\"name\":\"user_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)\",\"in\":\"query\",\"name\":\"start_date\",\"required\":true,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"date\",\"type\":\"string\"}]}},{\"description\":\"End date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"date\",\"type\":\"string\"}]}},{\"description\":\"Boolean flag specifying whether to send the data retrieved to the webhook instead of in the response (default: true if not provided)\\n\",\"in\":\"query\",\"name\":\"to_webhook\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Boolean flag specifying whether to include detailed samples in the returned payload (default: false)\\n\",\"in\":\"query\",\"name\":\"with_samples\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"data\":{\"items\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"menstruation_data\":{\"anyOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"current_phase\":{\"anyOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"Represents menstrual cycle phases.\",\"examples\":[1],\"oneOf\":[{\"const\":0,\"description\":\"Cycle phase is unknown or could not be determined.\",\"title\":\"Unknown\",\"type\":\"number\"},{\"const\":1,\"description\":\"Menstrual bleeding (period) phase.\",\"title\":\"Period\",\"type\":\"number\"},{\"const\":2,\"description\":\"Follicular phase, when ovarian follicles develop.\",\"title\":\"Follicular\",\"type\":\"number\"},{\"const\":3,\"description\":\"Fertile window, when conception is most likely.\",\"title\":\"Fertile Window\",\"type\":\"number\"},{\"const\":4,\"description\":\"Ovulation phase, when an egg is released.\",\"title\":\"Ovulation\",\"type\":\"number\"},{\"const\":5,\"description\":\"Luteal phase, following ovulation.\",\"title\":\"Luteal\",\"type\":\"number\"},{\"const\":6,\"description\":\"Premenstrual syndrome phase before menstruation begins.\",\"title\":\"PMS\",\"type\":\"number\"},{\"const\":7,\"description\":\"First third of pregnancy, weeks 1-12.\",\"title\":\"First Trimester\",\"type\":\"number\"},{\"const\":8,\"description\":\"Middle third of pregnancy, weeks 13-26.\",\"title\":\"Second Trimester\",\"type\":\"number\"},{\"const\":9,\"description\":\"Final third of pregnancy, weeks 27-40.\",\"title\":\"Third Trimester\",\"type\":\"number\"}]},{\"type\":\"null\"}],\"description\":\"Phase in associated cycle, (i.e. menstruation, fertile etc).\"},\"cycle_length_days\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"Total cycle length in days.\",\"examples\":[28]},\"day_in_cycle\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"Number of day in cycle this object is associated with.\",\"examples\":[24]},\"days_until_next_phase\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"Number of days to reach the next phase (predicted).\",\"examples\":[23]},\"fertility_window_end\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"End of the fertility window, in ISO8601 format.\",\"examples\":[\"2022-11-17\"]},\"fertility_window_start\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Start of the fertility window, in ISO8601 format.\",\"examples\":[\"2022-11-12\"]},\"intervals\":{\"anyOf\":[{\"items\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"end_timestamp\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"End of the cycle-phase interval, in ISO8601 format.\",\"examples\":[\"2022-11-28T09:00:00.000000+02:00\"]},\"phase\":{\"anyOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"Represents menstrual cycle phases.\",\"examples\":[1],\"oneOf\":[{\"const\":0,\"description\":\"Cycle phase is unknown or could not be determined.\",\"title\":\"Unknown\",\"type\":\"number\"},{\"const\":1,\"description\":\"Menstrual bleeding (period) phase.\",\"title\":\"Period\",\"type\":\"number\"},{\"const\":2,\"description\":\"Follicular phase, when ovarian follicles develop.\",\"title\":\"Follicular\",\"type\":\"number\"},{\"const\":3,\"description\":\"Fertile window, when conception is most likely.\",\"title\":\"Fertile Window\",\"type\":\"number\"},{\"const\":4,\"description\":\"Ovulation phase, when an egg is released.\",\"title\":\"Ovulation\",\"type\":\"number\"},{\"const\":5,\"description\":\"Luteal phase, following ovulation.\",\"title\":\"Luteal\",\"type\":\"number\"},{\"const\":6,\"description\":\"Premenstrual syndrome phase before menstruation begins.\",\"title\":\"PMS\",\"type\":\"number\"},{\"const\":7,\"description\":\"First third of pregnancy, weeks 1-12.\",\"title\":\"First Trimester\",\"type\":\"number\"},{\"const\":8,\"description\":\"Middle third of pregnancy, weeks 13-26.\",\"title\":\"Second Trimester\",\"type\":\"number\"},{\"const\":9,\"description\":\"Final third of pregnancy, weeks 27-40.\",\"title\":\"Third Trimester\",\"type\":\"number\"}]},{\"type\":\"null\"}],\"description\":\"Cycle phase covered by this interval.\"},\"start_timestamp\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Start of the cycle-phase interval, in ISO8601 format.\",\"examples\":[\"2022-11-23T09:00:00.000000+02:00\"]}},\"type\":\"object\"},\"type\":\"array\"},{\"type\":\"null\"}],\"description\":\"List of cycle phase intervals, each spanning a contiguous date range within the cycle.\"},\"is_predicted_cycle\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"description\":\"Flag indicating whether associated object is a prediction or user-logged information.\",\"examples\":[true]},\"last_updated_time\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Last time when the user recorded information regarding their cycle, in ISO8601 format, with microseconds precision.\",\"examples\":[\"2022-12-12T14:03:05.000000-05:00\"]},\"length_of_current_phase_days\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"Length of current phase.\",\"examples\":[5]},\"menstruation_flow\":{\"anyOf\":[{\"items\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"flow\":{\"anyOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"Flag indicating the strength of the user's menstrual flow\",\"examples\":[4],\"oneOf\":[{\"const\":0,\"description\":\"Flow status is unknown or not recorded.\",\"title\":\"Unknown\",\"type\":\"number\"},{\"const\":1,\"description\":\"No menstrual flow present.\",\"title\":\"None\",\"type\":\"number\"},{\"const\":2,\"description\":\"Light menstrual flow.\",\"title\":\"Light\",\"type\":\"number\"},{\"const\":3,\"description\":\"Moderate menstrual flow.\",\"title\":\"Medium\",\"type\":\"number\"},{\"const\":4,\"description\":\"Heavy menstrual flow.\",\"title\":\"Heavy\",\"type\":\"number\"},{\"const\":5,\"description\":\"Menstrual flow occurred but intensity not specified.\",\"title\":\"Had\",\"type\":\"number\"}]},{\"type\":\"null\"}],\"description\":\"Flag indicating the strength of the user's menstrual flow.\"},\"timestamp\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Time with which the record is associated, in ISO8601 format with microsecond precision. TimeZone info will be provided whenever possible. If absent, the time corresponds to the user's local time.\",\"examples\":[\"2022-11-23T09:00:00.000000+02:00\"]}},\"type\":\"object\"},\"type\":\"array\"},{\"type\":\"null\"}],\"description\":\"List of user logs of information related to the strength of user's menstrual flow.\"},\"ovulation_day\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Predicted ovulation day, in ISO8601 format.\",\"examples\":[\"2022-11-15\"]},\"period_length_days\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"Total length of period (i.e. menstrual bleeding).\",\"examples\":[5]},\"period_start_date\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Start date of menstrual cycle, in ISO8601 format.\",\"examples\":[\"2022-11-28\"]},\"predicted_cycle_length_days\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"description\":\"Prediction of the cycle's total length.\",\"examples\":[28]}},\"type\":\"object\"},{\"type\":\"null\"}],\"description\":\"Object containing information on user's menstruation for a given day.\"},\"metadata\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"Object containing daily summary metadata.\",\"properties\":{\"end_time\":{\"description\":\"The end time of the associated day, in ISO8601 format with microsecond precision. Will always fall on midnight of any given day, and will always be equal to 24h after start_time. TimeZone info will be provided whenever possible. If absent, the time corresponds to the user's local time.\",\"examples\":[\"2022-10-28T10:00:00.000000+01:00\"],\"type\":\"string\"},\"start_time\":{\"description\":\"The start time of the associated day, in ISO8601 format with microsecond precision. Will always fall on midnight of any given day, and will always be equal to 24h before end_time. TimeZone info will be provided whenever possible. If absent, the time corresponds to the user's local time.\",\"examples\":[\"1999-11-23T09:00:00.000000+02:00\"],\"type\":\"string\"},\"timestamp_localization\":{\"anyOf\":[{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"Indicates whether the timestamps in this payload are localized (LOCAL) or in UTC.\",\"enum\":[0,1],\"examples\":[0],\"type\":\"number\"},{\"type\":\"null\"}]}},\"required\":[\"end_time\",\"start_time\"],\"type\":\"object\"}},\"required\":[\"metadata\"],\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"type\":[\"string\",\"null\"]},\"user\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"active\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"description\":\"whether the user is active or not (inactive users will not receive any data updates and are in considered \",\"examples\":[true]},\"created_at\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Time at which the connection was created\",\"examples\":[\"2022-12-12T10:00:00.000000+00:00\"]},\"last_webhook_update\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Last time at which a webhook update was sent for the connection\",\"examples\":[\"2022-12-12T10:00:00.000000+00:00\"]},\"provider\":{\"description\":\"Connection data source\",\"examples\":[\"FITBIT\"],\"minLength\":1,\"type\":\"string\"},\"reference_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"Connection identifier on the developer's end, used to tie connection back to a user on the developer's platform\",\"examples\":[\"user123@email.com\"]},\"scopes\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"description\":\"(when available) Permissions granted by the user during authentication - to be used as debugging metadata\",\"examples\":[\"activity:read,sleep:read\"]},\"user_id\":{\"description\":\"Terra identifier for the wearable connection\",\"examples\":[\"123e4567-e89b-12d3-a456-426614174000\"],\"minLength\":1,\"type\":\"string\"}},\"required\":[\"user_id\",\"provider\"],\"type\":\"object\"}},\"type\":\"object\"},{\"description\":\"Acknowledgement returned when `to_webhook` is true (the default): the requested data is fetched asynchronously and delivered to your configured destination, and this body confirms the request was accepted.\\n\",\"properties\":{\"message\":{\"description\":\"Present only for large requests (date range over one month), which are delivered in chunks.\",\"example\":\"Large request submitted. The data is being processed and will be sent to your destination in chunks\",\"type\":\"string\"},\"reference\":{\"description\":\"Payload reference, tying this request to the webhook payload you will receive.\",\"example\":\"5a3c2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"},\"status\":{\"enum\":[\"success\"],\"example\":\"success\",\"type\":\"string\"},\"trace_id\":{\"description\":\"Trace identifier for this request (equal to `reference`).\",\"example\":\"5a3c2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"},\"type\":{\"description\":\"The data type that was requested (e.g. `activity`, `sleep`).\",\"example\":\"activity\",\"type\":\"string\"},\"user\":{\"description\":\"Summary of the connection the data was requested for.\",\"properties\":{\"active\":{\"example\":true,\"type\":\"boolean\"},\"created_at\":{\"example\":\"2024-01-15T09:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"last_webhook_update\":{\"example\":\"2024-01-20T11:00:00Z\",\"format\":\"date-time\",\"type\":[\"string\",\"null\"]},\"provider\":{\"example\":\"GARMIN\",\"type\":\"string\"},\"reference_id\":{\"example\":\"user123@email.com\",\"type\":[\"string\",\"null\"]},\"scopes\":{\"description\":\"Comma-separated list of granted scopes.\",\"example\":\"activity,sleep,daily\",\"type\":\"string\"},\"user_id\":{\"example\":\"5a3c2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}]}}},\"description\":\"Returned upon successful data request\"},\"400\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"invalid start_date\",\"instance\":\"/activity\",\"title\":\"bad request\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"One or more parameters is malformed. The `detail` field describes the specific problem.\"},\"401\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"dev-id or x-api-key headers are missing\",\"instance\":\"/activity\",\"title\":\"unauthorized\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"Authentication credentials are missing or invalid.\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/menstruation","segments":[{"lit":"menstruation"}],"select":{"exist":["end_date","start_date","to_webhook","user_id","with_sample"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"menstruation","name__orig":"menstruation","Name":"Menstruation","name_":"menstruation","name-":"menstruation","NAME":"MENSTRUATION","index$":10}, {"active":true,"entity":"menstruation","key$":"BasicMenstruationFlow","kind":"basic","name":"BasicMenstruationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"menstruation_ref01","srcdatavar":"menstruation_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-menstruation_ref01"}}],"index$":0}]}, 'Menstruation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let menstruation_ref01_data = Object.values(setup.data.existing.menstruation)[0]

    // LOAD
    const menstruation_ref01_ent = client.Menstruation()
    const menstruation_ref01_match_dt0 = {}
    const menstruation_ref01_data_dt0 = (await menstruation_ref01_ent.load(menstruation_ref01_match_dt0)).data()
    assert(null != menstruation_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/menstruation/MenstruationTestData.json')

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
    ['menstruation01','menstruation02','menstruation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TERRA_TEST_MENSTRUATION_ENTID': idmap,
    'TERRA_TEST_LIVE': 'FALSE',
    'TERRA_TEST_EXPLAIN': 'FALSE',
    'TERRA_APIKEY': '',
  })

  idmap = env['TERRA_TEST_MENSTRUATION_ENTID']

  const live = 'TRUE' === env.TERRA_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TERRA_TEST_MENSTRUATION_ENTID']
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
  
