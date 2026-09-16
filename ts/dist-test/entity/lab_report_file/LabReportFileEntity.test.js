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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LabReportFileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TERRA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TerraSDK.test();
        const ent = testsdk.LabReportFile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TERRA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'lab_report_file.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "filename", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "presigned_url", "req": true, "type": "`$STRING`", "index$": 2 }], "id": { "field": "id", "name": "id" }, "name": "lab_report_file", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "297405620317847552", "kind": "param", "name": "id", "orig": "session_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /lab-reports/{session_id}/files", "json": "{\"operationId\":\"LabReports_ListFiles\",\"parameters\":[{\"description\":\"The session's snowflake ID.\",\"example\":\"297405620317847552\",\"in\":\"path\",\"name\":\"session_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"properties\":{\"expires_at\":{\"description\":\"Applies to every presigned URL in the response.\",\"format\":\"date-time\",\"type\":\"string\"},\"files\":{\"items\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"One downloadable object with a presigned URL.\",\"properties\":{\"filename\":{\"type\":\"string\"},\"presigned_url\":{\"type\":\"string\"}},\"required\":[\"presigned_url\"],\"type\":\"object\"},\"type\":\"array\"},\"thumbnail\":{\"$schema\":\"https://json-schema.org/draft/2020-12/schema\",\"description\":\"One downloadable object with a presigned URL.\",\"properties\":{\"filename\":{\"type\":\"string\"},\"presigned_url\":{\"type\":\"string\"}},\"required\":[\"presigned_url\"],\"type\":\"object\"}},\"required\":[\"files\"],\"type\":\"object\"}}},\"description\":\"Input files and thumbnail with presigned URLs.\"},\"400\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"invalid start_date\",\"instance\":\"/activity\",\"title\":\"bad request\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"One or more parameters is malformed. The `detail` field describes the specific problem.\"},\"401\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"dev-id or x-api-key headers are missing\",\"instance\":\"/activity\",\"title\":\"unauthorized\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"Authentication credentials are missing or invalid.\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/lab-reports/{session_id}/files", "rename": { "param": { "session_id": "id" } }, "segments": [{ "lit": "lab-reports" }, { "var": "id" }, { "lit": "files" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "lab_report_file", "name__orig": "lab_report_file", "Name": "LabReportFile", "name_": "lab_report_file", "name-": "lab-report-file", "NAME": "LAB_REPORT_FILE", "index$": 9 }, { "active": true, "entity": "lab_report_file", "key$": "BasicLabReportFileFlow", "kind": "basic", "name": "BasicLabReportFileFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "session_id": "session01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "lab_report_file_ref01" } }], "index$": 0 }] }, 'LabReportFile');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let lab_report_file_ref01_data = Object.values(setup.data.existing.lab_report_file)[0];
        // LIST
        const lab_report_file_ref01_ent = client.LabReportFile();
        const lab_report_file_ref01_match = {};
        lab_report_file_ref01_match['session_id'] = setup.idmap['session01'];
        const lab_report_file_ref01_list = (await lab_report_file_ref01_ent.list(lab_report_file_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/lab_report_file/LabReportFileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TerraSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['lab_report_file01', 'lab_report_file02', 'lab_report_file03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TERRA_TEST_LAB_REPORT_FILE_ENTID': idmap,
        'TERRA_TEST_LIVE': 'FALSE',
        'TERRA_TEST_EXPLAIN': 'FALSE',
        'TERRA_APIKEY': '',
    });
    idmap = env['TERRA_TEST_LAB_REPORT_FILE_ENTID'];
    const live = 'TRUE' === env.TERRA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TERRA_TEST_LAB_REPORT_FILE_ENTID'];
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
//# sourceMappingURL=LabReportFileEntity.test.js.map