"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const SecretsFeature_1 = require("./feature/secrets/SecretsFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    secrets: SecretsFeature_1.SecretsFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        secrets: {
            "options": {
                "active": false,
                "cache": true,
                "exchange": {
                    "active": false,
                    "method": "POST",
                    "path": "auth/token",
                    "refresh": "",
                    "request": "refresh_token",
                    "response": "access_token",
                    "retries": 1,
                    "statuses": [
                        401
                    ]
                },
                "name": "apikey",
                "providers": []
            },
            "optspec": {},
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
                "now": "`$FUNCTION`",
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
            name: 'x-api-key',
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
            lab_report_session: {},
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/activity",
                            "segments": [
                                {
                                    "lit": "activity"
                                }
                            ],
                            "parts": [
                                "activity"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "with_sample",
                                        "orig": "with_samples",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/athlete",
                            "segments": [
                                {
                                    "lit": "athlete"
                                }
                            ],
                            "parts": [
                                "athlete"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "title": "Auth Failure Redirect Url",
                    "type": "`$STRING`"
                },
                {
                    "name": "auth_success_redirect_url",
                    "title": "Auth Success Redirect Url",
                    "type": "`$STRING`"
                },
                {
                    "name": "auth_url",
                    "title": "Auth Url",
                    "type": "`$STRING`",
                    "short": "authentication URL the user must be redirected to in order to link their account"
                },
                {
                    "name": "expires_in",
                    "title": "Expires In",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "language",
                    "title": "Language",
                    "type": "`$STRING`"
                },
                {
                    "name": "reference_id",
                    "title": "Reference Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "sdk_app",
                    "title": "Sdk App",
                    "type": "`$STRING`",
                    "short": "Which Terra reference app an SDK authentication link hands the end user to."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "indicates that the request was successful"
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "short": "User ID for the user being created"
                }
            ],
            "name": "authentication",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
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
                            "parts": [
                                "auth",
                                "authenticateUser"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dev_id",
                                        "orig": "dev-id",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "testingTerra"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "resource",
                                        "orig": "resource",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "FITBIT"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "dev_id",
                                    "resource"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
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
                            "parts": [
                                "auth",
                                "generateAuthToken"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "user-42",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "generate_auth_token"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
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
                            "parts": [
                                "auth",
                                "generateWidgetSession"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "widget_session"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/auth/tokens",
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "tokens"
                                }
                            ],
                            "parts": [
                                "auth",
                                "tokens"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "user-42",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
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
                            "parts": [
                                "auth",
                                "deauthenticateUser"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/body",
                            "segments": [
                                {
                                    "lit": "body"
                                }
                            ],
                            "parts": [
                                "body"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "with_sample",
                                        "orig": "with_samples",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "bulk_user_info": {
            "fields": [
                {
                    "name": "bulk_user_infos",
                    "title": "Bulk User Infos",
                    "type": "`$ARRAY`",
                    "short": "List of user IDs to get information for"
                }
            ],
            "name": "bulk_user_info",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/bulkUserInfo",
                            "segments": [
                                {
                                    "lit": "bulkUserInfo"
                                }
                            ],
                            "parts": [
                                "bulkUserInfo"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata.bulk_user_infos`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "exist": [
                                    "bulk_user_infos"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/daily",
                            "segments": [
                                {
                                    "lit": "daily"
                                }
                            ],
                            "parts": [
                                "daily"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "with_sample",
                                        "orig": "with_samples",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "name": "providers",
                    "title": "Providers",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "sdk_providers",
                    "title": "Sdk Providers",
                    "type": "`$ARRAY`",
                    "short": "Providers available through Terra's mobile SDKs rather than cloud connections"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                }
            ],
            "name": "integration",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/integrations",
                            "segments": [
                                {
                                    "lit": "integrations"
                                }
                            ],
                            "parts": [
                                "integrations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
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
                            "parts": [
                                "integrations",
                                "detailed"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.providers`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sdk",
                                        "orig": "sdk",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "detailed"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "name": "current_status",
                    "title": "Current Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Processing status as a clean lowercase string."
                },
                {
                    "name": "file",
                    "title": "File",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A file of the report: a PDF or a PNG, JPEG, GIF, WebP or HEIC/HEIF image.",
                    "format": "binary"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "upload_id",
                    "title": "Upload Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Durable correlation key for the upload; every resulting session and webhook carries it."
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/lab-reports/{session_id}/reprocess",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reprocess"
                                }
                            ],
                            "parts": [
                                "lab-reports",
                                "{id}",
                                "reprocess"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "legacy_format",
                                        "orig": "legacy_format",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reprocess",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/lab-reports",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                }
                            ],
                            "parts": [
                                "lab-reports"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "patient_456"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "legacy"
                            },
                            "body": {
                                "fields": [
                                    {
                                        "binary": true,
                                        "name": "file"
                                    }
                                ],
                                "kind": "multipart",
                                "media": "multipart/form-data"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/reports",
                            "segments": [
                                {
                                    "lit": "reports"
                                }
                            ],
                            "parts": [
                                "reports"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "patient_456"
                                    }
                                ]
                            },
                            "select": {},
                            "body": {
                                "fields": [
                                    {
                                        "binary": true,
                                        "name": "file"
                                    }
                                ],
                                "kind": "multipart",
                                "media": "multipart/form-data"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports/{session_id}",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "lab-reports",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "legacy",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                }
                            ],
                            "parts": [
                                "lab-reports"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "report_date_from",
                                        "orig": "report_date_from",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "report_date_to",
                                        "orig": "report_date_to",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "report_type",
                                        "orig": "report_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "dexa"
                                    },
                                    {
                                        "name": "upload_id",
                                        "orig": "upload_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "uploaded_at_from",
                                        "orig": "uploaded_at_from",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "uploaded_at_to",
                                        "orig": "uploaded_at_to",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "legacy"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reports",
                            "segments": [
                                {
                                    "lit": "reports"
                                }
                            ],
                            "parts": [
                                "reports"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "report_date_from",
                                        "orig": "report_date_from",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "report_date_to",
                                        "orig": "report_date_to",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "report_type",
                                        "orig": "report_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "dexa"
                                    },
                                    {
                                        "name": "upload_id",
                                        "orig": "upload_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "uploaded_at_from",
                                        "orig": "uploaded_at_from",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "uploaded_at_to",
                                        "orig": "uploaded_at_to",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/lab-reports/{session_id}",
                            "segments": [
                                {
                                    "lit": "lab-reports"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "lab-reports",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "legacy",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/reports/{session_id}",
                            "segments": [
                                {
                                    "lit": "reports"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "reports",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
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
                    "title": "Attempt Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Retry count — 0 on the first attempt, incremented per retry."
                },
                {
                    "name": "destination_id",
                    "title": "Destination Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "destination_type",
                    "title": "Destination Type",
                    "type": "`$STRING`",
                    "short": "The destination's type (e.g."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_error",
                    "title": "Last Error",
                    "type": "`$STRING`",
                    "short": "Most recent delivery error; omitted when delivered."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "pending, delivered, or failed."
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports/{session_id}/deliveries",
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
                            "parts": [
                                "lab-reports",
                                "{id}",
                                "deliveries"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.deliveries`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reports/{session_id}/deliveries",
                            "segments": [
                                {
                                    "lit": "reports"
                                },
                                {
                                    "var": "report_id"
                                },
                                {
                                    "lit": "deliveries"
                                }
                            ],
                            "parts": [
                                "reports",
                                "{report_id}",
                                "deliveries"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "report_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.deliveries`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "report_id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "report_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "name": "content_type",
                    "title": "Content Type",
                    "type": "`$STRING`",
                    "short": "An uploaded file's content type."
                },
                {
                    "name": "filename",
                    "title": "Filename",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "presigned_url",
                    "title": "Presigned Url",
                    "type": "`$STRING`",
                    "req": true
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lab-reports/{session_id}/files",
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
                            "parts": [
                                "lab-reports",
                                "{id}",
                                "files"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reports/{session_id}/files",
                            "segments": [
                                {
                                    "lit": "reports"
                                },
                                {
                                    "var": "report_id"
                                },
                                {
                                    "lit": "files"
                                }
                            ],
                            "parts": [
                                "reports",
                                "{report_id}",
                                "files"
                            ],
                            "rename": {
                                "param": {
                                    "session_id": "report_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "report_id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "report_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "lab_report_session": {
            "fields": [
                {
                    "name": "collection_date",
                    "title": "Collection Date",
                    "type": "`$STRING`",
                    "short": "Date the sample was collected or the scan was taken (YYYY-MM-DD); omitted if not extracted."
                },
                {
                    "name": "collection_time",
                    "title": "Collection Time",
                    "type": "`$STRING`",
                    "short": "Time the sample was collected or the scan was taken (HH:MM, 24-hour); omitted if not extracted."
                },
                {
                    "name": "current_status",
                    "title": "Current Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Current status as a clean lowercase string (open enum — handle unknown values gracefully)."
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Why the report failed: the same object the lab_report.failed webhook carries."
                },
                {
                    "name": "file_count",
                    "title": "File Count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "input_bytes",
                    "title": "Input Bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "lab_name",
                    "title": "Lab Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "output_bytes",
                    "title": "Output Bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "panels",
                    "title": "Panels",
                    "type": "`$ARRAY`",
                    "short": "Report-level panels that results reference by panel_id."
                },
                {
                    "name": "patient_age_at_collection",
                    "title": "Patient Age At Collection",
                    "type": "`$INTEGER`",
                    "short": "Patient age in years; omitted if unknown."
                },
                {
                    "name": "patient_sex",
                    "title": "Patient Sex",
                    "type": "`$STRING`",
                    "short": "Clean lowercase string (open enum); omitted if unspecified."
                },
                {
                    "name": "reference_id",
                    "title": "Reference Id",
                    "type": "`$STRING`",
                    "short": "Your external reference; omitted if not set."
                },
                {
                    "name": "report_date",
                    "title": "Report Date",
                    "type": "`$STRING`",
                    "short": "Date printed on the report (YYYY-MM-DD); omitted if not extracted."
                },
                {
                    "name": "report_locale",
                    "title": "Report Locale",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_notes",
                    "title": "Report Notes",
                    "type": "`$STRING`"
                },
                {
                    "name": "report_time",
                    "title": "Report Time",
                    "type": "`$STRING`",
                    "short": "Time printed on the report (HH:MM, 24-hour); omitted if not extracted."
                },
                {
                    "name": "report_type",
                    "title": "Report Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "What kind of report this is, as a clean lowercase string (open enum — handle unknown values gracefully)."
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`",
                    "short": "The layered biomarker results."
                },
                {
                    "name": "results_count",
                    "title": "Results Count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "session_id",
                    "title": "Session Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status_history",
                    "title": "Status History",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "upload_id",
                    "title": "Upload Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "uploaded_at",
                    "title": "Uploaded At",
                    "type": "`$STRING`",
                    "format": "date-time"
                }
            ],
            "name": "lab_report_session",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/reports/{session_id}/reprocess",
                            "segments": [
                                {
                                    "lit": "reports"
                                },
                                {
                                    "var": "session_id"
                                },
                                {
                                    "lit": "reprocess"
                                }
                            ],
                            "parts": [
                                "reports",
                                "{session_id}",
                                "reprocess"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "session_id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "legacy_format",
                                        "orig": "legacy_format",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reprocess",
                                "exist": [
                                    "session_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reports/{session_id}",
                            "segments": [
                                {
                                    "lit": "reports"
                                },
                                {
                                    "var": "session_id"
                                }
                            ],
                            "parts": [
                                "reports",
                                "{session_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_terra_version",
                                        "orig": "X-Terra-Version",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "session_id",
                                        "orig": "session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "297405620317847552"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "session_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/menstruation",
                            "segments": [
                                {
                                    "lit": "menstruation"
                                }
                            ],
                            "parts": [
                                "menstruation"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "with_sample",
                                        "orig": "with_samples",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/nutrition",
                            "segments": [
                                {
                                    "lit": "nutrition"
                                }
                            ],
                            "parts": [
                                "nutrition"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "with_sample",
                                        "orig": "with_samples",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "title": "Athlete Metrics",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "coercion_warnings",
                    "title": "Coercion Warnings",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Deprecated; use warnings.",
                    "deprecated": true
                },
                {
                    "name": "completed_at",
                    "title": "Completed At",
                    "type": "`$ANY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Time the session was reported complete by the user's device."
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Creation time (RFC 3339)."
                },
                {
                    "name": "details",
                    "title": "Details",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Deprecated.",
                    "deprecated": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "is_external",
                    "title": "Is External",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "True when the workout was created on the provider side rather than through Terra."
                },
                {
                    "name": "last_updated_at",
                    "title": "Last Updated At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Last update time (RFC 3339)."
                },
                {
                    "name": "planned_date",
                    "title": "Planned Date",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$STRING`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "New scheduled date (YYYY-MM-DD)",
                    "format": "date"
                },
                {
                    "name": "planned_workout_id",
                    "title": "Planned Workout Id",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Terra identifier of the planned workout."
                },
                {
                    "name": "provider_workout_id",
                    "title": "Provider Workout Id",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Identifier assigned by the provider, once pushed."
                },
                {
                    "name": "warnings",
                    "title": "Warnings",
                    "type": "`$ARRAY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Adjustments made when the template could not be represented exactly on the provider."
                },
                {
                    "name": "workout",
                    "title": "Workout",
                    "type": "`$ANY`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$ANY`"
                        }
                    },
                    "short": "The workout body, as on the list."
                },
                {
                    "name": "workout_id",
                    "title": "Workout Id",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Identifier of the source template."
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/plannedWorkouts",
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                }
                            ],
                            "parts": [
                                "plannedWorkouts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/plannedWorkouts/{planned_workout_id}",
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "plannedWorkouts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "planned_workout_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "planned_workout_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/plannedWorkouts/{planned_workout_id}",
                            "segments": [
                                {
                                    "lit": "plannedWorkouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "plannedWorkouts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "planned_workout_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "planned_workout_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/sleep",
                            "segments": [
                                {
                                    "lit": "sleep"
                                }
                            ],
                            "parts": [
                                "sleep"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to_webhook",
                                        "orig": "to_webhook",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "with_sample",
                                        "orig": "with_samples",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "start_date",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "user": {
            "fields": [
                {
                    "name": "max_page",
                    "title": "Max Page",
                    "type": "`$INTEGER`",
                    "short": "Total number of pages available for the requested page size"
                },
                {
                    "name": "next",
                    "title": "Next",
                    "type": [
                        "`$ONE`",
                        [
                            "`$INTEGER`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "The next page number, or null if there is no next page"
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "users",
                    "title": "Users",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "user",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/subscriptions",
                            "segments": [
                                {
                                    "lit": "subscriptions"
                                }
                            ],
                            "parts": [
                                "subscriptions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 500
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/userInfo",
                            "segments": [
                                {
                                    "lit": "userInfo"
                                }
                            ],
                            "parts": [
                                "userInfo"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "reference_id",
                                        "orig": "reference_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Description of the workout"
                },
                {
                    "name": "environment",
                    "title": "Environment",
                    "type": "`$ANY`"
                },
                {
                    "name": "estimated_calories",
                    "title": "Estimated Calories",
                    "type": "`$ANY`",
                    "short": "Estimated calories burned"
                },
                {
                    "name": "estimated_distance_meters",
                    "title": "Estimated Distance Meters",
                    "type": "`$ANY`",
                    "short": "Estimated total distance in meters"
                },
                {
                    "name": "estimated_duration_seconds",
                    "title": "Estimated Duration Seconds",
                    "type": "`$ANY`",
                    "short": "Estimated total duration in seconds"
                },
                {
                    "name": "estimated_intensity_factor",
                    "title": "Estimated Intensity Factor",
                    "type": "`$ANY`",
                    "short": "Planned intensity factor (0-5), where the provider or author supplies one."
                },
                {
                    "name": "estimated_tss",
                    "title": "Estimated Tss",
                    "type": "`$ANY`",
                    "short": "Planned training stress score (0-9999), where the provider or author supplies one."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the workout"
                },
                {
                    "name": "pool_length_meters",
                    "title": "Pool Length Meters",
                    "type": "`$ANY`",
                    "short": "Pool length in meters, for swim workouts"
                },
                {
                    "name": "sport",
                    "title": "Sport",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Sport a workout template targets."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "step_blocks",
                    "title": "Step Blocks",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "workout_id",
                    "title": "Workout Id",
                    "type": "`$STRING`",
                    "short": "Terra identifier of the stored template."
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/workouts/{workout_id}/plan",
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
                            "parts": [
                                "workouts",
                                "{id}",
                                "plan"
                            ],
                            "rename": {
                                "param": {
                                    "workout_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workout_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "plan",
                                "exist": [
                                    "id",
                                    "user_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/workouts",
                            "segments": [
                                {
                                    "lit": "workouts"
                                }
                            ],
                            "parts": [
                                "workouts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/workouts",
                            "segments": [
                                {
                                    "lit": "workouts"
                                }
                            ],
                            "parts": [
                                "workouts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/workouts/{workout_id}",
                            "segments": [
                                {
                                    "lit": "workouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "workouts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workout_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workout_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
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
                            "parts": [
                                "plannedWorkouts",
                                "{planned_workout_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "planned_workout_id",
                                        "orig": "planned_workout_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "planned_workout_id",
                                    "user_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/workouts/{workout_id}",
                            "segments": [
                                {
                                    "lit": "workouts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "workouts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "workout_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "workout_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.planned_workout"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map