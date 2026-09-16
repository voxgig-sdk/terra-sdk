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
(0, node_test_1.describe)('AuthenticationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TERRA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TerraSDK.test();
        const ent = testsdk.Authentication();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TERRA_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'authentication.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "auth_failure_redirect_url", "req": false, "short": "URL the user is redirected to upon unsuccessful authentication", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "auth_success_redirect_url", "req": false, "short": "URL the user is redirected to upon successful authentication", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "auth_url", "req": false, "short": "authentication URL the user must be redirected to in order to link their account", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "expires_in", "req": false, "short": "a number in seconds depicting how long the url is valid for", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "language", "req": false, "short": "Display language of the widget", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "providers", "req": false, "short": "Comma separated list of providers to display on the device selection page.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "reference_id", "req": false, "short": "Identifier of the end user on your system, such as a user ID or email associated with them", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "session_id", "req": false, "short": "Session ID for the widget authentication session", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "status", "req": false, "short": "indicates that the request was successful", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "token", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "url", "req": false, "short": "the widget URL the user must be redirected to in order to link their account", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "user_id", "req": false, "short": "User ID for the user being created", "type": "`$STRING`", "index$": 11 }], "name": "authentication", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "example": "testingTerra", "kind": "header", "name": "dev_id", "orig": "dev_id", "reqd": true, "type": "`$STRING`" }], "query": [{ "active": true, "example": "FITBIT", "kind": "query", "name": "resource", "orig": "resource", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /auth/authenticateUser", "json": "{\"operationId\":\"Authentication_AuthenticateUser\",\"parameters\":[{\"description\":\"Provider resource identifier (e.g., 'FITBIT', 'GARMIN', 'OURA'). See \\\"Get detailed list of integrations\\\" for available providers\",\"example\":\"FITBIT\",\"in\":\"query\",\"name\":\"resource\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"your developer ID\",\"example\":\"testingTerra\",\"in\":\"header\",\"name\":\"dev-id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"auth_failure_redirect_url\":{\"type\":\"string\"},\"auth_success_redirect_url\":{\"type\":\"string\"},\"language\":{\"type\":\"string\"},\"reference_id\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"auth_url\":{\"description\":\"authentication URL the user must be redirected to in order to link their account\",\"example\":\"https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23BBG9&scope=settings+nutrition+sleep+heartrate+electrocardiogram+weight+respiratory_rate+oxygen_saturation+profile+temperature+cardio_fitness+activity+location&state=bLqqjPie9ptwoWm6VBxHCu6JkkoWJp\",\"type\":\"string\"},\"status\":{\"description\":\"indicates that the request was successful\",\"enum\":[\"success\",\"error\"],\"example\":\"success\",\"type\":\"string\"},\"user_id\":{\"description\":\"User ID for the user being created\",\"example\":\"23dc2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Returned when authentication link could be successfully generated\"},\"400\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"invalid start_date\",\"instance\":\"/activity\",\"title\":\"bad request\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"One or more parameters is malformed. The `detail` field describes the specific problem.\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/auth/authenticateUser", "segments": [{ "lit": "auth" }, { "lit": "authenticateUser" }], "select": { "exist": ["dev_id", "resource"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "POST /auth/generateAuthToken", "json": "{\"operationId\":\"Authentication_GenerateAuthToken\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":{\"expires_in\":180,\"status\":\"success\",\"token\":\"250c68b9c21b78e40e7a3285a2d538d3bc24aabd3b4c76a782fb0a571ca4501d\"}}},\"schema\":{\"properties\":{\"expires_in\":{\"default\":0,\"example\":180,\"type\":\"integer\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"token\":{\"example\":\"250c68b9c21b78e40e7a3285a2d538d3bc24aabd3b4c76a782fb0a571ca4501d\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"200\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/auth/generateAuthToken", "segments": [{ "lit": "auth" }, { "lit": "generateAuthToken" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": {}, "contract": { "id": "POST /auth/generateWidgetSession", "json": "{\"operationId\":\"Authentication_GenerateWidgetSession\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"auth_failure_redirect_url\":{\"description\":\"URL the user is redirected to upon unsuccessful authentication\",\"example\":\"https://myapp.com/failure\",\"type\":\"string\"},\"auth_success_redirect_url\":{\"description\":\"URL the user is redirected to upon successful authentication\",\"example\":\"https://myapp.com/success\",\"type\":\"string\"},\"language\":{\"description\":\"Display language of the widget\",\"example\":\"en\",\"type\":\"string\"},\"providers\":{\"description\":\"Comma separated list of providers to display on the device selection page. This overrides your selected sources on your dashboard\",\"example\":\"GARMIN,FITBIT,OURA,WITHINGS,SUUNTO\",\"type\":\"string\"},\"reference_id\":{\"description\":\"Identifier of the end user on your system, such as a user ID or email associated with them\",\"example\":\"user123@email.com\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"expires_in\":{\"description\":\"a number in seconds depicting how long the url is valid for\",\"example\":900,\"type\":\"number\"},\"session_id\":{\"description\":\"Session ID for the widget authentication session\",\"example\":\"23dc2540-7139-44c6-8158-f81196e2cf2e\",\"type\":\"string\"},\"status\":{\"description\":\"indicates that the request was successful (value is success)\",\"enum\":[\"success\",\"error\"],\"example\":\"success\",\"type\":\"string\"},\"url\":{\"description\":\"the widget URL the user must be redirected to in order to link their account\",\"example\":\"https://widget.tryterra.co/session/344d475f-296a-489a-a88c-54183671dafd\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Returned when authentication link could be successfully generated\"},\"400\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"invalid start_date\",\"instance\":\"/activity\",\"title\":\"bad request\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"One or more parameters is malformed. The `detail` field describes the specific problem.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/auth/generateWidgetSession", "segments": [{ "lit": "auth" }, { "lit": "generateWidgetSession" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "user_id", "orig": "user_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "DELETE /auth/deauthenticateUser", "json": "{\"operationId\":\"Authentication_DeauthenticateUser\",\"parameters\":[{\"description\":\"Terra user ID (UUID format) to deauthenticate and remove from Terra system\",\"in\":\"query\",\"name\":\"user_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"status\":{\"description\":\"indicates that the deauthentication was successful (value is success)\",\"enum\":[\"success\",\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Returned when user is successfully deauthenticated and data is deleted\"},\"404\":{\"content\":{\"application/problem+json\":{\"example\":{\"detail\":\"user not found\",\"instance\":\"/activity\",\"title\":\"not found\",\"type\":\"about:blank\"},\"schema\":{\"description\":\"An error response, following RFC 9457 (Problem Details for HTTP APIs, which obsoletes RFC 7807). Returned with `Content-Type: application/problem+json` on every 4xx/5xx response. The HTTP status line carries the status code; it is intentionally not repeated in the body. `type`, `title` and `instance` are always present; `detail` is included when a specific explanation is available.\\n\",\"properties\":{\"detail\":{\"description\":\"A human-readable explanation specific to this occurrence of the problem.\",\"example\":\"dev-id or x-api-key headers are missing\",\"type\":\"string\"},\"instance\":{\"description\":\"The request path, including any query string, that produced this problem.\",\"example\":\"/api/v2/activity?user_id=d4aba475-f714-4663-88fe-28f18b8599b0&to_webhook=false\",\"type\":\"string\"},\"title\":{\"description\":\"A short, human-readable summary of the problem type (the lowercased HTTP status text).\",\"example\":\"unauthorized\",\"type\":\"string\"},\"type\":{\"description\":\"A URI reference identifying the problem type. Defaults to `about:blank`.\",\"example\":\"about:blank\",\"type\":\"string\"}},\"required\":[\"type\",\"title\",\"instance\"],\"type\":\"object\"}}},\"description\":\"A referenced resource does not exist on Terra's end.\"}},\"security\":[{\"ApiKeyAuth\":[],\"DevID\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your API key for authentication\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"DevID\":{\"description\":\"Your developer ID for authentication and tracking\",\"in\":\"header\",\"name\":\"dev-id\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/auth/deauthenticateUser", "segments": [{ "lit": "auth" }, { "lit": "deauthenticateUser" }], "select": { "exist": ["user_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "authentication", "name__orig": "authentication", "Name": "Authentication", "name_": "authentication", "name-": "authentication", "NAME": "AUTHENTICATION", "index$": 2 }, { "active": true, "entity": "authentication", "key$": "BasicAuthenticationFlow", "kind": "basic", "name": "BasicAuthenticationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "authentication_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "authentication_ref01", "suffix": "_rm0" }, "match": {}, "op": "remove", "spec": [], "valid": [], "index$": 1 }] }, 'Authentication');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const authentication_ref01_ent = client.Authentication();
        let authentication_ref01_data = setup.data.new.authentication['authentication_ref01'];
        authentication_ref01_data = (await authentication_ref01_ent.create(authentication_ref01_data)).data();
        (0, node_assert_1.default)(null != authentication_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/authentication/AuthenticationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TerraSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['authentication01', 'authentication02', 'authentication03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TERRA_TEST_AUTHENTICATION_ENTID': idmap,
        'TERRA_TEST_LIVE': 'FALSE',
        'TERRA_TEST_EXPLAIN': 'FALSE',
        'TERRA_APIKEY': '',
    });
    idmap = env['TERRA_TEST_AUTHENTICATION_ENTID'];
    const live = 'TRUE' === env.TERRA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TERRA_TEST_AUTHENTICATION_ENTID'];
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
//# sourceMappingURL=AuthenticationEntity.test.js.map