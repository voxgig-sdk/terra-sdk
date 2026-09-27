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
(0, node_test_1.describe)('LabReportDeliveryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TERRA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TerraSDK.test();
        const ent = testsdk.LabReportDelivery();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TERRA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'lab_report_delivery.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attempt_count": { "a": true, "h": "Attempt Count", "n": "attempt_count", "r": true, "sh": "Retry count — 0 on the first attempt, incremented per retry.", "t": "`$INTEGER`", "key$": "attempt_count", "index$": 0 }, "destination_id": { "a": true, "h": "Destination Id", "n": "destination_id", "r": true, "t": "`$STRING`", "key$": "destination_id", "index$": 1 }, "destination_type": { "a": true, "h": "Destination Type", "n": "destination_type", "r": false, "sh": "The destination's type (e.g.", "t": "`$STRING`", "key$": "destination_type", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "last_error": { "a": true, "h": "Last Error", "n": "last_error", "r": false, "sh": "Most recent delivery error; omitted when delivered.", "t": "`$STRING`", "key$": "last_error", "index$": 4 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "pending, delivered, or failed.", "t": "`$STRING`", "key$": "status", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "lab_report_delivery", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /lab-reports/{session_id}/deliveries", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "297405620317847552", "k": "param", "n": "id", "or": "session_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/lab-reports/{session_id}/deliveries", "q": { "exist": ["id"] }, "r": { "param": { "session_id": "id" } }, "s": [{ "lit": "lab-reports" }, { "var": "id" }, { "lit": "deliveries" }], "t": { "req": "`reqdata`", "res": "`body.deliveries`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "lab_report_delivery", "name__orig": "lab_report_delivery", "Name": "LabReportDelivery", "name_": "lab_report_delivery", "name-": "lab-report-delivery", "NAME": "LAB_REPORT_DELIVERY", "index$": 8 }, { "active": true, "entity": "lab_report_delivery", "key$": "BasicLabReportDeliveryFlow", "kind": "basic", "name": "BasicLabReportDeliveryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "session_id": "session01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "lab_report_delivery_ref01" } }], "index$": 0 }] }, 'LabReportDelivery', { "GET /lab-reports/{session_id}/deliveries": { "protocol": "http", "parameters": [{ "name": "session_id", "in": "path", "required": true, "description": "The session's snowflake ID.", "schema": { "type": "string" }, "example": "297405620317847552", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let lab_report_delivery_ref01_data = Object.values(setup.data.existing.lab_report_delivery)[0];
        // LIST
        const lab_report_delivery_ref01_ent = client.LabReportDelivery();
        const lab_report_delivery_ref01_match = {};
        lab_report_delivery_ref01_match['session_id'] = setup.idmap['session01'];
        const lab_report_delivery_ref01_list = (await lab_report_delivery_ref01_ent.list(lab_report_delivery_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/lab_report_delivery/LabReportDeliveryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TerraSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['lab_report_delivery01', 'lab_report_delivery02', 'lab_report_delivery03', 'session01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TERRA_TEST_LAB_REPORT_DELIVERY_ENTID': idmap,
        'TERRA_TEST_LIVE': 'FALSE',
        'TERRA_TEST_EXPLAIN': 'FALSE',
        'TERRA_APIKEY': '',
    });
    idmap = env['TERRA_TEST_LAB_REPORT_DELIVERY_ENTID'];
    const live = 'TRUE' === env.TERRA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TERRA_TEST_LAB_REPORT_DELIVERY_ENTID'];
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
//# sourceMappingURL=LabReportDeliveryEntity.test.js.map