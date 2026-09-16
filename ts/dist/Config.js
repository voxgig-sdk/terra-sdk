"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Terra',
        slug: "terra",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://access.tryterra.co/api/v2",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            activity: {},
            athlete: {},
            authentication: {},
            body: {},
            bulk_user_info: {},
            daily: {},
            integration: {},
            lab_report: {},
            lab_report_delivery: {},
            lab_report_file: {},
            menstruation: {},
            nutrition: {},
            planned_workout: {},
            sleep: {},
            user: {},
            workout: {},
        }
    };
    entity = {
        "activity": {
            "fields": [],
            "name": "activity",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "reqd": true,
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "with_sample",
                                        "orig": "with_sample",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/activity",
                            "segments": [
                                {
                                    "lit": "activity"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "to_webhook",
                                    "user_id",
                                    "with_sample"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "activity"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "athlete": {
            "fields": [],
            "name": "athlete",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/athlete",
                            "segments": [
                                {
                                    "lit": "athlete"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "to_webhook",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "athlete"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "authentication": {
            "fields": [
                {
                    "name": "auth_failure_redirect_url",
                    "short": "URL the user is redirected to upon unsuccessful authentication",
                    "type": "`$STRING`"
                },
                {
                    "name": "auth_success_redirect_url",
                    "short": "URL the user is redirected to upon successful authentication",
                    "type": "`$STRING`"
                },
                {
                    "name": "auth_url",
                    "short": "authentication URL the user must be redirected to in order to link their account",
                    "type": "`$STRING`"
                },
                {
                    "name": "expires_in",
                    "short": "a number in seconds depicting how long the url is valid for",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "language",
                    "short": "Display language of the widget",
                    "type": "`$STRING`"
                },
                {
                    "name": "providers",
                    "short": "Comma separated list of providers to display on the device selection page.",
                    "type": "`$STRING`"
                },
                {
                    "name": "reference_id",
                    "short": "Identifier of the end user on your system, such as a user ID or email associated with them",
                    "type": "`$STRING`"
                },
                {
                    "name": "session_id",
                    "short": "Session ID for the widget authentication session",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "short": "indicates that the request was successful",
                    "type": "`$STRING`"
                },
                {
                    "name": "token",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "short": "the widget URL the user must be redirected to in order to link their account",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "short": "User ID for the user being created",
                    "type": "`$STRING`"
                }
            ],
            "name": "authentication",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "header": [
                                    {
                                        "example": "testingTerra",
                                        "kind": "header",
                                        "name": "dev_id",
                                        "orig": "dev_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": "FITBIT",
                                        "kind": "query",
                                        "name": "resource",
                                        "orig": "resource",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/auth/authenticateUser",
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "authenticateUser"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "dev_id",
                                    "resource"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "auth",
                                "authenticateUser"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/auth/generateAuthToken",
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "generateAuthToken"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "auth",
                                "generateAuthToken"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/auth/generateWidgetSession",
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "generateWidgetSession"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "auth",
                                "generateWidgetSession"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/auth/deauthenticateUser",
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "deauthenticateUser"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "auth",
                                "deauthenticateUser"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "body": {
            "fields": [],
            "name": "body",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "reqd": true,
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "with_sample",
                                        "orig": "with_sample",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/body",
                            "segments": [
                                {
                                    "lit": "body"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "to_webhook",
                                    "user_id",
                                    "with_sample"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "body"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "bulk_user_info": {
            "fields": [],
            "name": "bulk_user_info",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/bulkUserInfo",
                            "segments": [
                                {
                                    "lit": "bulkUserInfo"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "bulkUserInfo"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "daily": {
            "fields": [],
            "name": "daily",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "reqd": true,
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "with_sample",
                                        "orig": "with_sample",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/daily",
                            "segments": [
                                {
                                    "lit": "daily"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "to_webhook",
                                    "user_id",
                                    "with_sample"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "daily"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "integration": {
            "fields": [
                {
                    "name": "enabled",
                    "short": "Whether the integration is enabled",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "icon",
                    "short": "URL for the provider's icon image",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Display name of the integration",
                    "type": "`$STRING`"
                },
                {
                    "name": "provider",
                    "short": "Identifier for the provider",
                    "type": "`$STRING`"
                },
                {
                    "name": "providers",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "sdk_providers",
                    "short": "Providers available through Terra's mobile SDKs rather than cloud connections",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "setup",
                    "short": "Indicates how the integration is set up",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "types",
                    "short": "Indicates the types of data available through the provider",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "integration",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "sdk",
                                        "orig": "sdk",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/integrations/detailed",
                            "segments": [
                                {
                                    "lit": "integrations"
                                },
                                {
                                    "lit": "detailed"
                                }
                            ],
                            "select": {
                                "$action": "detailed",
                                "exist": [
                                    "sdk"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.providers`"
                            },
                            "parts": [
                                "integrations",
                                "detailed"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/integrations",
                            "segments": [
                                {
                                    "lit": "integrations"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "integrations"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "lab_report": {
            "fields": [
                {
                    "name": "collection_date",
                    "short": "Specimen collection date (YYYY-MM-DD); omitted if not extracted.",
                    "type": "`$STRING`"
                },
                {
                    "name": "collection_time",
                    "short": "Specimen collection time (HH:MM, 24-hour); omitted if not extracted.",
                    "type": "`$STRING`"
                },
                {
                    "name": "current_status",
                    "req": true,
                    "short": "Current status as a clean lowercase string (open enum), e.g.",
                    "type": "`$STRING`"
                },
                {
                    "name": "file_count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "input_bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "lab_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "output_bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "panels",
                    "short": "Report-level panels that results reference by panel_id.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "patient_age_at_collection",
                    "short": "Patient age in years; omitted if unknown.",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "patient_sex",
                    "short": "Clean lowercase string (open enum); omitted if unspecified.",
                    "type": "`$STRING`"
                },
                {
                    "name": "reference_id",
                    "short": "Your external reference; omitted if not set.",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_date",
                    "short": "Date printed on the report (YYYY-MM-DD); omitted if not extracted.",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_locale",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_notes",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_time",
                    "short": "Time printed on the report (HH:MM, 24-hour); omitted if not extracted.",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_type",
                    "req": true,
                    "short": "Report type as a clean lowercase string (open enum — handle unknown values gracefully).",
                    "type": "`$STRING`"
                },
                {
                    "name": "results",
                    "short": "The layered biomarker results.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "results_count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "session_id",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "status_history",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "date-time",
                    "name": "updated_at",
                    "type": "`$STRING`"
                },
                {
                    "name": "upload_id",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "uploaded_at",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "lab_report",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient_456",
                                        "kind": "query",
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/lab-reports",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "reference_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "lab-reports"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "report_date_from",
                                        "orig": "report_date_from",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "report_date_to",
                                        "orig": "report_date_to",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "upload_id",
                                        "orig": "upload_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "uploaded_at_from",
                                        "orig": "uploaded_at_from",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "uploaded_at_to",
                                        "orig": "uploaded_at_to",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "reference_id",
                                    "report_date_from",
                                    "report_date_to",
                                    "upload_id",
                                    "uploaded_at_from",
                                    "uploaded_at_to"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.sessions`"
                            },
                            "parts": [
                                "lab-reports"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "297405620317847552",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "session_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports/{session_id}",
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "lab-reports",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "297405620317847552",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "session_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/lab-reports/{session_id}",
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "lab-reports",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "lab_report_delivery": {
            "fields": [
                {
                    "name": "attempt_count",
                    "req": true,
                    "short": "Retry count — 0 on the first attempt, incremented per retry.",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "destination_id",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "destination_type",
                    "short": "The destination's type (e.g.",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_error",
                    "short": "Most recent delivery error; omitted when delivered.",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "req": true,
                    "short": "pending, delivered, or failed.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "lab_report_delivery",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "297405620317847552",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "session_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports/{session_id}/deliveries",
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "deliveries"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.deliveries`"
                            },
                            "parts": [
                                "lab-reports",
                                "{id}",
                                "deliveries"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "lab_report_file": {
            "fields": [
                {
                    "name": "filename",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "presigned_url",
                    "req": true,
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "lab_report_file",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "297405620317847552",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "session_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports/{session_id}/files",
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "files"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "lab-reports",
                                "{id}",
                                "files"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "menstruation": {
            "fields": [],
            "name": "menstruation",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "reqd": true,
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "with_sample",
                                        "orig": "with_sample",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/menstruation",
                            "segments": [
                                {
                                    "lit": "menstruation"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "to_webhook",
                                    "user_id",
                                    "with_sample"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "menstruation"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "nutrition": {
            "fields": [],
            "name": "nutrition",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "reqd": true,
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "with_sample",
                                        "orig": "with_sample",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/nutrition",
                            "segments": [
                                {
                                    "lit": "nutrition"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "to_webhook",
                                    "user_id",
                                    "with_sample"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "nutrition"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "planned_workout": {
            "fields": [
                {
                    "name": "athlete_metrics",
                    "type": "`$ANY`"
                },
                {
                    "name": "coercion_warnings",
                    "short": "Set when the template could not be represented exactly on the provider.",
                    "type": "`$STRING`"
                },
                {
                    "name": "created_at",
                    "short": "Creation time (RFC 3339)",
                    "type": "`$ANY`"
                },
                {
                    "name": "details",
                    "short": "Full workout body (title, description, planned metrics, structured steps) fetched live from the provider.",
                    "type": "`$ANY`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "is_external",
                    "short": "True when the workout was created on the provider side rather than through Terra.",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "last_updated_at",
                    "short": "Last update time (RFC 3339)",
                    "type": "`$ANY`"
                },
                {
                    "format": "date",
                    "name": "planned_date",
                    "op": {
                        "update": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "New scheduled date (YYYY-MM-DD)",
                    "type": "`$STRING`"
                },
                {
                    "name": "planned_workout_id",
                    "short": "Terra identifier of the planned workout",
                    "type": "`$STRING`"
                },
                {
                    "name": "provider_workout_id",
                    "short": "Identifier assigned by the provider, once pushed.",
                    "type": "`$STRING`"
                },
                {
                    "name": "workout_id",
                    "short": "Identifier of the source template.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "planned_workout",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/plannedWorkouts",
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "plannedWorkouts"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "planned_workout_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/plannedWorkouts/{planned_workout_id}",
                            "rename": {
                                "param": {
                                    "planned_workout_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "plannedWorkouts",
                                "{id}"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "planned_workout_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/plannedWorkouts/{planned_workout_id}",
                            "rename": {
                                "param": {
                                    "planned_workout_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "plannedWorkouts",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "sleep": {
            "fields": [],
            "name": "sleep",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "reqd": true,
                                        "type": "`$ANY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "with_sample",
                                        "orig": "with_sample",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/sleep",
                            "segments": [
                                {
                                    "lit": "sleep"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "start_date",
                                    "to_webhook",
                                    "user_id",
                                    "with_sample"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "sleep"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "user": {
            "fields": [],
            "name": "user",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 500,
                                        "kind": "query",
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/subscriptions",
                            "segments": [
                                {
                                    "lit": "subscriptions"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "page",
                                    "per_page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "subscriptions"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/userInfo",
                            "segments": [
                                {
                                    "lit": "userInfo"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "reference_id",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "userInfo"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "workout": {
            "fields": [
                {
                    "name": "description",
                    "short": "Description of the workout",
                    "type": "`$STRING`"
                },
                {
                    "name": "environment",
                    "type": "`$ANY`",
                    "union": {
                        "branches": 3,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "estimated_calories",
                    "short": "Estimated calories burned",
                    "type": "`$ANY`"
                },
                {
                    "name": "estimated_distance_meters",
                    "short": "Estimated total distance in meters",
                    "type": "`$ANY`"
                },
                {
                    "name": "estimated_duration_seconds",
                    "short": "Estimated total duration in seconds",
                    "type": "`$ANY`"
                },
                {
                    "name": "ftp",
                    "short": "Functional Threshold Power in watts",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "max_heart_rate",
                    "short": "Maximum heart rate in BPM",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "name",
                    "req": true,
                    "short": "Name of the workout",
                    "type": "`$STRING`"
                },
                {
                    "format": "date",
                    "name": "planned_date",
                    "req": true,
                    "short": "Date to schedule the workout on (YYYY-MM-DD)",
                    "type": "`$STRING`"
                },
                {
                    "name": "pool_length_meters",
                    "short": "Pool length in meters, for swim workouts",
                    "type": "`$ANY`"
                },
                {
                    "name": "sport",
                    "req": true,
                    "short": "Sport a workout template targets.",
                    "type": "`$ANY`",
                    "union": {
                        "branches": 15,
                        "count": 1,
                        "depth": 0
                    }
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "step_blocks",
                    "req": true,
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 11,
                        "count": 8,
                        "depth": 13
                    }
                },
                {
                    "name": "threshold_heart_rate",
                    "short": "Threshold heart rate in BPM",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "threshold_speed",
                    "short": "Threshold speed in m/s",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "workout_id",
                    "short": "Terra identifier of the stored template.",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "workout",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "workout_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/workouts/{workout_id}/plan",
                            "rename": {
                                "param": {
                                    "workout_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "workouts"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "plan"
                                }
                            ],
                            "select": {
                                "$action": "plan",
                                "exist": [
                                    "id",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "workouts",
                                "{id}",
                                "plan"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/workouts",
                            "segments": [
                                {
                                    "lit": "workouts"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "workouts"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/workouts",
                            "segments": [
                                {
                                    "lit": "workouts"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "workouts"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "workout_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/workouts/{workout_id}",
                            "rename": {
                                "param": {
                                    "workout_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "workouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "workouts",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "planned_workout_id",
                                        "orig": "planned_workout_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/plannedWorkouts/{planned_workout_id}",
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                },
                                {
                                    "var": "planned_workout_id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "planned_workout_id",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "plannedWorkouts",
                                "{planned_workout_id}"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "workout_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/workouts/{workout_id}",
                            "rename": {
                                "param": {
                                    "workout_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "workouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "workouts",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "planned_workout"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map