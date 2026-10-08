"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SleepEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TERRA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TerraSDK.test();
        const ent = testsdk.Sleep();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TerraSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Sleep().load({ "start_date": "x", "to_webhook": "x", "user_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TERRA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'sleep.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "sleep", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /sleep", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "start_date", "or": "start_date", "r": true, "t": "`$ANY`", "index$": 1 }, { "a": true, "k": "query", "n": "to_webhook", "or": "to_webhook", "r": false, "t": "`$BOOLEAN`", "index$": 2 }, { "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "with_sample", "or": "with_samples", "r": false, "t": "`$BOOLEAN`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/sleep", "q": { "exist": ["start_date", "user_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "sleep" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "sleep", "name__orig": "sleep", "Name": "Sleep", "name_": "sleep", "name-": "sleep", "NAME": "SLEEP", "index$": 13 }, { "active": true, "entity": "sleep", "key$": "BasicSleepFlow", "kind": "basic", "name": "BasicSleepFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "sleep_ref01", "srcdatavar": "sleep_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-sleep_ref01" } }], "index$": 0 }] }, 'Sleep', { "GET /sleep": { "protocol": "http", "parameters": [{ "name": "user_id", "in": "query", "description": "Terra user ID (UUID format) to retrieve data for", "schema": { "type": "string" }, "required": true, "index$": 0 }, { "name": "start_date", "in": "query", "description": "Start date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)", "schema": { "oneOf": [{ "type": "integer" }, { "type": "string", "format": "date" }] }, "required": true, "index$": 1 }, { "name": "end_date", "in": "query", "description": "End date for data query - either ISO8601 date (YYYY-MM-DD) or unix timestamp in seconds (10-digit)", "schema": { "oneOf": [{ "type": "integer" }, { "type": "string", "format": "date" }] }, "required": false, "index$": 2 }, { "name": "to_webhook", "in": "query", "description": "Boolean flag specifying whether to send the data retrieved to the webhook instead of in the response (default: true if not provided)\n", "schema": { "type": "boolean" }, "required": false, "index$": 3 }, { "name": "with_samples", "in": "query", "description": "Boolean flag specifying whether to include detailed samples in the returned payload (default: false)\n", "schema": { "type": "boolean" }, "required": false, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let sleep_ref01_data = Object.values(setup.data.existing.sleep)[0];
        // LOAD
        const sleep_ref01_ent = client.Sleep();
        const sleep_ref01_match_dt0 = {};
        const sleep_ref01_data_dt0 = (await sleep_ref01_ent.load(sleep_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != sleep_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/sleep/SleepTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TerraSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['sleep01', 'sleep02', 'sleep03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TERRA_TEST_SLEEP_ENTID': idmap,
        'TERRA_TEST_LIVE': 'FALSE',
        'TERRA_TEST_EXPLAIN': 'FALSE',
        'TERRA_APIKEY': '',
    });
    idmap = env['TERRA_TEST_SLEEP_ENTID'];
    const live = 'TRUE' === env.TERRA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TERRA_TEST_SLEEP_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TerraSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=SleepEntity.test.js.map