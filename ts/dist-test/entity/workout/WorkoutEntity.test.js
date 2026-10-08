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
(0, node_test_1.describe)('WorkoutEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TERRA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TERRA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TerraSDK.test();
        const ent = testsdk.Workout();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('workout hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TerraSDK.test(offline).Workout().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TerraSDK.test(offline).Workout()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TerraSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Workout().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TerraSDK.test().Workout().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TerraSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Workout().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Workout().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TerraSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Workout().list({ "description": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TERRA_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'workout.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the workout", "t": "`$STRING`", "key$": "description", "index$": 0 }, "environment": { "a": true, "h": "Environment", "n": "environment", "r": false, "t": "`$ANY`", "union": { "branches": 3, "count": 1, "depth": 2 }, "key$": "environment", "index$": 1 }, "estimated_calories": { "a": true, "h": "Estimated Calories", "n": "estimated_calories", "r": false, "sh": "Estimated calories burned", "t": "`$ANY`", "key$": "estimated_calories", "index$": 2 }, "estimated_distance_meters": { "a": true, "h": "Estimated Distance Meters", "n": "estimated_distance_meters", "r": false, "sh": "Estimated total distance in meters", "t": "`$ANY`", "key$": "estimated_distance_meters", "index$": 3 }, "estimated_duration_seconds": { "a": true, "h": "Estimated Duration Seconds", "n": "estimated_duration_seconds", "r": false, "sh": "Estimated total duration in seconds", "t": "`$ANY`", "key$": "estimated_duration_seconds", "index$": 4 }, "estimated_intensity_factor": { "a": true, "h": "Estimated Intensity Factor", "n": "estimated_intensity_factor", "r": false, "sh": "Planned intensity factor (0-5), where the provider or author supplies one.", "t": "`$ANY`", "key$": "estimated_intensity_factor", "index$": 5 }, "estimated_tss": { "a": true, "h": "Estimated Tss", "n": "estimated_tss", "r": false, "sh": "Planned training stress score (0-9999), where the provider or author supplies one.", "t": "`$ANY`", "key$": "estimated_tss", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the workout", "t": "`$STRING`", "key$": "name", "index$": 8 }, "pool_length_meters": { "a": true, "h": "Pool Length Meters", "n": "pool_length_meters", "r": false, "sh": "Pool length in meters, for swim workouts", "t": "`$ANY`", "key$": "pool_length_meters", "index$": 9 }, "sport": { "a": true, "h": "Sport", "n": "sport", "r": true, "sh": "Sport a workout template targets.", "t": "`$ANY`", "union": { "branches": 15, "count": 1, "depth": 0 }, "key$": "sport", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 11 }, "step_blocks": { "a": true, "h": "Step Blocks", "n": "step_blocks", "r": true, "t": "`$ARRAY`", "union": { "branches": 19, "count": 8, "depth": 13 }, "key$": "step_blocks", "index$": 12 }, "workout_id": { "a": true, "h": "Workout Id", "n": "workout_id", "r": false, "sh": "Terra identifier of the stored template.", "t": "`$STRING`", "key$": "workout_id", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "workout", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["ftp", "max_heart_rate", "planned_date", "pool_length_meters", "threshold_heart_rate", "threshold_speed"], "co": { "id": "POST /workouts/{workout_id}/plan", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workout_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/workouts/{workout_id}/plan", "q": { "$action": "plan", "exist": ["id", "user_id"] }, "r": { "param": { "workout_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "workouts" }, { "var": "id" }, { "lit": "plan" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["description", "environment", "estimated_calories", "estimated_distance_meters", "estimated_duration_seconds", "estimated_intensity_factor", "estimated_tss", "name", "pool_length_meters", "sport", "step_blocks", "workout_id"], "co": { "id": "POST /workouts", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/workouts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "workouts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /workouts", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/workouts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "workouts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /workouts/{workout_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workout_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/workouts/{workout_id}", "q": { "exist": ["id"] }, "r": { "param": { "workout_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "workouts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /plannedWorkouts/{planned_workout_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "planned_workout_id", "or": "planned_workout_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/plannedWorkouts/{planned_workout_id}", "q": { "exist": ["planned_workout_id", "user_id"] }, "r": {}, "s": [{ "lit": "plannedWorkouts" }, { "var": "planned_workout_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /workouts/{workout_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "workout_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/workouts/{workout_id}", "q": { "exist": ["id"] }, "r": { "param": { "workout_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "workouts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.planned_workout"]] }, "key$": "workout", "name__orig": "workout", "Name": "Workout", "name_": "workout", "name-": "workout", "NAME": "WORKOUT", "index$": 16 }, { "active": true, "entity": "workout", "key$": "BasicWorkoutFlow", "kind": "basic", "name": "BasicWorkoutFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "workout_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "workout_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "workout_ref01", "srcdatavar": "workout_ref01_data", "suffix": "_dt0" }, "m": { "id": "workout01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-workout_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "workout_ref01", "suffix": "_rm0" }, "m": { "id": "workout01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "workout_ref01" } }], "index$": 4 }] }, 'Workout', { "POST /workouts/{workout_id}/plan": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["planned_date"], "properties": { "planned_date": { "type": "string", "format": "date", "description": "Date to schedule the workout on (YYYY-MM-DD)" }, "ftp": { "type": "number", "description": "Functional Threshold Power in watts" }, "max_heart_rate": { "type": "number", "description": "Maximum heart rate in BPM" }, "threshold_heart_rate": { "type": "number", "description": "Threshold heart rate in BPM" }, "threshold_speed": { "type": "number", "description": "Threshold speed in m/s" }, "pool_length_meters": { "type": "number", "description": "Pool length in meters (overrides the template value)" } } } } } }, "parameters": [{ "name": "workout_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "user_id", "in": "query", "required": true, "description": "Terra user ID of the connection to plan the workout for", "schema": { "type": "string" }, "index$": 1 }] }, "POST /workouts": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "$schema": "https://json-schema.org/draft/2020-12/schema", "type": "object", "properties": { "name": { "type": "string", "description": "Name of the workout", "key$": "name" }, "description": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "Description of the workout", "key$": "description" }, "environment": { "anyOf": [{ "$schema": "https://json-schema.org/draft/2020-12/schema", "anyOf": [{}, {}, {}], "description": "Environment a workout takes place in", "x-ref": "#/components/schemas/EnvironmentType" }, { "type": "null" }], "key$": "environment" }, "pool_length_meters": { "anyOf": [{ "type": "number" }, { "type": "null" }], "description": "Pool length in meters, for swim workouts", "key$": "pool_length_meters" }, "step_blocks": { "type": "array", "items": { "$schema": "https://json-schema.org/draft/2020-12/schema", "type": "object", "properties": { "completion_condition": { "$schema": "https://json-schema.org/draft/2020-12/schema", "type": "object", "properties": {}, "required": [], "description": "When this block completes (e.g. repeat count via reps)", "x-ref": "#/components/schemas/CompletionCondition" }, "steps": { "type": "array", "items": {} } }, "required": ["completion_condition", "steps"], "description": "A block of steps, repeated until its completion condition is met", "x-ref": "#/components/schemas/StepBlock" }, "key$": "step_blocks" }, "estimated_duration_seconds": { "anyOf": [{ "type": "number" }, { "type": "null" }], "description": "Estimated total duration in seconds", "key$": "estimated_duration_seconds" }, "estimated_distance_meters": { "anyOf": [{ "type": "number" }, { "type": "null" }], "description": "Estimated total distance in meters", "key$": "estimated_distance_meters" }, "estimated_calories": { "anyOf": [{ "type": "number" }, { "type": "null" }], "description": "Estimated calories burned", "key$": "estimated_calories" }, "estimated_tss": { "anyOf": [{ "type": "number" }, { "type": "null" }], "description": "Planned training stress score (0-9999), where the provider or author supplies one. Forwarded to TrainingPeaks, which ignores it when any step target is not RPE and derives it from the structure instead.", "key$": "estimated_tss" }, "estimated_intensity_factor": { "anyOf": [{ "type": "number" }, { "type": "null" }], "description": "Planned intensity factor (0-5), where the provider or author supplies one. Forwarded to TrainingPeaks, which ignores it when any step target is not RPE and derives it from the structure instead.", "key$": "estimated_intensity_factor" }, "workout_id": { "anyOf": [{ "type": "string" }, { "type": "null" }], "description": "Terra identifier of the stored template. Set by Terra in responses; ignored on create.", "key$": "workout_id" }, "sport": { "$schema": "https://json-schema.org/draft/2020-12/schema", "anyOf": [{ "type": "string", "const": "running" }, { "type": "string", "const": "cycling" }, { "type": "string", "const": "swimming" }, { "type": "string", "const": "strength" }, { "type": "string", "const": "rowing" }, { "type": "string", "const": "yoga" }, { "type": "string", "const": "pilates" }, { "type": "string", "const": "cardio" }, { "type": "string", "const": "trail_running" }, { "type": "string", "const": "mountain_biking" }, { "type": "string", "const": "backcountry_skiing" }, { "type": "string", "const": "hiking" }, { "type": "string", "const": "walking" }, { "type": "string", "const": "elliptical" }, { "type": "string", "const": "stair_climbing" }], "description": "Sport a workout template targets. Indoor/outdoor is expressed separately via environment.", "x-ref": "#/components/schemas/WorkoutSport", "key$": "sport" } }, "required": ["name", "step_blocks", "sport"], "description": "A reusable workout template, created once and planned onto user calendars", "x-ref": "#/components/schemas/WorkoutTemplate", "index$": 1 } } } }, "parameters": [] }, "GET /workouts": { "protocol": "http", "parameters": [] }, "GET /workouts/{workout_id}": { "protocol": "http", "parameters": [{ "name": "workout_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }] }, "DELETE /plannedWorkouts/{planned_workout_id}": { "protocol": "http", "parameters": [{ "name": "planned_workout_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "user_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /workouts/{workout_id}": { "protocol": "http", "parameters": [{ "name": "workout_id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const workout_ref01_ent = client.Workout();
        let workout_ref01_data = setup.data.new.workout['workout_ref01'];
        workout_ref01_data = (await workout_ref01_ent.create(workout_ref01_data)).data();
        (0, node_assert_1.default)(null != workout_ref01_data.id);
        // LIST
        const workout_ref01_match = {};
        const workout_ref01_list = (await workout_ref01_ent.list(workout_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(workout_ref01_list, { id: workout_ref01_data.id })));
        // LOAD
        const workout_ref01_match_dt0 = {};
        workout_ref01_match_dt0.id = workout_ref01_data.id;
        const workout_ref01_data_dt0 = (await workout_ref01_ent.load(workout_ref01_match_dt0)).data();
        (0, node_assert_1.default)(workout_ref01_data_dt0.id === workout_ref01_data.id);
        // REMOVE
        const workout_ref01_match_rm0 = { id: workout_ref01_data.id };
        await workout_ref01_ent.remove(workout_ref01_match_rm0);
        // LIST
        const workout_ref01_match_rt0 = {};
        const workout_ref01_list_rt0 = (await workout_ref01_ent.list(workout_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(workout_ref01_list_rt0, { id: workout_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/workout/WorkoutTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TerraSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['workout01', 'workout02', 'workout03', 'planned_workout01', 'planned_workout02', 'planned_workout03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TERRA_TEST_WORKOUT_ENTID': idmap,
        'TERRA_TEST_LIVE': 'FALSE',
        'TERRA_TEST_EXPLAIN': 'FALSE',
        'TERRA_APIKEY': '',
    });
    idmap = env['TERRA_TEST_WORKOUT_ENTID'];
    const live = 'TRUE' === env.TERRA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TERRA_TEST_WORKOUT_ENTID'];
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
//# sourceMappingURL=WorkoutEntity.test.js.map