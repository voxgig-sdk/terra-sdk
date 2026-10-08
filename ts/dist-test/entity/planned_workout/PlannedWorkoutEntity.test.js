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
(0, node_test_1.describe)('PlannedWorkoutEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TERRA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TerraSDK.test();
        const ent = testsdk.PlannedWorkout();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('planned_workout hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TerraSDK.test(offline).PlannedWorkout().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TerraSDK.test(offline).PlannedWorkout()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TerraSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.PlannedWorkout().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TerraSDK.test().PlannedWorkout().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TerraSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.PlannedWorkout().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.PlannedWorkout().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TerraSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PlannedWorkout().list({ "end_date": 1, "user_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TERRA_TEST_LIVE;
        for (const op of ['list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'planned_workout.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "athlete_metrics": { "a": true, "h": "Athlete Metrics", "n": "athlete_metrics", "r": true, "t": "`$ANY`", "key$": "athlete_metrics", "index$": 0 }, "coercion_warnings": { "a": true, "de": true, "h": "Coercion Warnings", "n": "coercion_warnings", "op": { "list": { "req": true, "type": "`$ANY`" } }, "r": false, "sh": "Deprecated; use warnings.", "t": "`$STRING`", "key$": "coercion_warnings", "index$": 1 }, "completed_at": { "a": true, "h": "Completed At", "n": "completed_at", "op": { "list": { "req": true, "type": "`$ANY`" } }, "r": false, "sh": "Time the session was reported complete by the user's device.", "t": "`$ANY`", "key$": "completed_at", "index$": 2 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "sh": "Creation time (RFC 3339).", "t": "`$ANY`", "key$": "created_at", "index$": 3 }, "details": { "a": true, "de": true, "h": "Details", "n": "details", "r": true, "sh": "Deprecated.", "t": "`$ANY`", "key$": "details", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "is_external": { "a": true, "h": "Is External", "n": "is_external", "op": { "list": { "req": true, "type": "`$BOOLEAN`" } }, "r": false, "sh": "True when the workout was created on the provider side rather than through Terra.", "t": "`$BOOLEAN`", "key$": "is_external", "index$": 6 }, "last_updated_at": { "a": true, "h": "Last Updated At", "n": "last_updated_at", "r": true, "sh": "Last update time (RFC 3339).", "t": "`$ANY`", "key$": "last_updated_at", "index$": 7 }, "planned_date": { "a": true, "fo": "date", "h": "Planned Date", "n": "planned_date", "op": { "list": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "New scheduled date (YYYY-MM-DD)", "t": "`$STRING`", "key$": "planned_date", "index$": 8 }, "planned_workout_id": { "a": true, "h": "Planned Workout Id", "n": "planned_workout_id", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Terra identifier of the planned workout.", "t": "`$STRING`", "key$": "planned_workout_id", "index$": 9 }, "provider_workout_id": { "a": true, "h": "Provider Workout Id", "n": "provider_workout_id", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Identifier assigned by the provider, once pushed.", "t": "`$STRING`", "key$": "provider_workout_id", "index$": 10 }, "warnings": { "a": true, "h": "Warnings", "n": "warnings", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "Adjustments made when the template could not be represented exactly on the provider.", "t": "`$ARRAY`", "key$": "warnings", "index$": 11 }, "workout": { "a": true, "h": "Workout", "n": "workout", "op": { "list": { "req": true, "type": "`$ANY`" } }, "r": false, "sh": "The workout body, as on the list.", "t": "`$ANY`", "union": { "branches": 19, "count": 11, "depth": 17 }, "key$": "workout", "index$": 12 }, "workout_id": { "a": true, "h": "Workout Id", "n": "workout_id", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Identifier of the source template.", "t": "`$STRING`", "key$": "workout_id", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "planned_workout", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /plannedWorkouts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "start_date", "or": "start_date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/plannedWorkouts", "q": { "exist": ["user_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "plannedWorkouts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /plannedWorkouts/{planned_workout_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "planned_workout_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/plannedWorkouts/{planned_workout_id}", "q": { "exist": ["id", "user_id"] }, "r": { "param": { "planned_workout_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "plannedWorkouts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["planned_date"], "co": { "id": "PATCH /plannedWorkouts/{planned_workout_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "planned_workout_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/plannedWorkouts/{planned_workout_id}", "q": { "exist": ["id", "user_id"] }, "r": { "param": { "planned_workout_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "plannedWorkouts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "planned_workout", "name__orig": "planned_workout", "Name": "PlannedWorkout", "name_": "planned_workout", "name-": "planned-workout", "NAME": "PLANNED_WORKOUT", "index$": 13 }, { "active": true, "entity": "planned_workout", "key$": "BasicPlannedWorkoutFlow", "kind": "basic", "name": "BasicPlannedWorkoutFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "planned_workout_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "planned_workout_ref01", "srcdatavar": "planned_workout_ref01_data", "suffix": "_up0", "textfield": "coercion_warnings" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-planned_workout_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "planned_workout_ref01", "srcdatavar": "planned_workout_ref01_data", "suffix": "_dt0" }, "m": { "id": "planned_workout01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-planned_workout_ref01" } }], "index$": 2 }] }, 'PlannedWorkout', { "GET /plannedWorkouts": { "protocol": "http", "parameters": [{ "name": "user_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "start_date", "in": "query", "required": false, "schema": { "type": "string", "format": "date" }, "description": "Start of the planned-date window (YYYY-MM-DD). When start_date and end_date are omitted, provider-side workouts default to the trailing 30 days; pass an explicit window to list upcoming workouts.\n", "index$": 1 }, { "name": "end_date", "in": "query", "required": false, "schema": { "type": "string", "format": "date" }, "description": "End of the planned-date window (YYYY-MM-DD), inclusive.", "index$": 2 }] }, "GET /plannedWorkouts/{planned_workout_id}": { "protocol": "http", "parameters": [{ "name": "planned_workout_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "user_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /plannedWorkouts/{planned_workout_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["planned_date"], "properties": { "planned_date": { "type": "string", "format": "date", "description": "New scheduled date (YYYY-MM-DD)", "key$": "planned_date" } }, "index$": 1 } } } }, "parameters": [{ "name": "planned_workout_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "user_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let planned_workout_ref01_data = Object.values(setup.data.existing.planned_workout)[0];
        // LIST
        const planned_workout_ref01_ent = client.PlannedWorkout();
        const planned_workout_ref01_match = {};
        const planned_workout_ref01_list = (await planned_workout_ref01_ent.list(planned_workout_ref01_match)).map((e) => e.data());
        // UPDATE
        const planned_workout_ref01_data_up0 = {};
        planned_workout_ref01_data_up0.id = planned_workout_ref01_data.id;
        const planned_workout_ref01_markdef_up0 = { name: 'coercion_warnings', value: 'Mark01-planned_workout_ref01_' + setup.now };
        planned_workout_ref01_data_up0[planned_workout_ref01_markdef_up0.name] = planned_workout_ref01_markdef_up0.value;
        const planned_workout_ref01_resdata_up0 = (await planned_workout_ref01_ent.update(planned_workout_ref01_data_up0)).data();
        (0, node_assert_1.default)(planned_workout_ref01_resdata_up0.id === planned_workout_ref01_data_up0.id);
        (0, node_assert_1.default)(planned_workout_ref01_resdata_up0[planned_workout_ref01_markdef_up0.name] === planned_workout_ref01_markdef_up0.value);
        // LOAD
        const planned_workout_ref01_match_dt0 = {};
        planned_workout_ref01_match_dt0.id = planned_workout_ref01_data.id;
        const planned_workout_ref01_data_dt0 = (await planned_workout_ref01_ent.load(planned_workout_ref01_match_dt0)).data();
        (0, node_assert_1.default)(planned_workout_ref01_data_dt0.id === planned_workout_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/planned_workout/PlannedWorkoutTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TerraSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['planned_workout01', 'planned_workout02', 'planned_workout03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TERRA_TEST_PLANNED_WORKOUT_ENTID': idmap,
        'TERRA_TEST_LIVE': 'FALSE',
        'TERRA_TEST_EXPLAIN': 'FALSE',
        'TERRA_APIKEY': '',
    });
    idmap = env['TERRA_TEST_PLANNED_WORKOUT_ENTID'];
    const live = 'TRUE' === env.TERRA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TERRA_TEST_PLANNED_WORKOUT_ENTID'];
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
//# sourceMappingURL=PlannedWorkoutEntity.test.js.map