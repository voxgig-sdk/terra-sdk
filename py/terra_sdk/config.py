# Terra SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Terra",
            "slug": "terra",
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://access.tryterra.co/api/v2",
            "auth": {
                "prefix": "",
                "name": "x-api-key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "activity": {},
                "athlete": {},
                "authentication": {},
                "body": {},
                "bulk_user_info": {},
                "daily": {},
                "integration": {},
                "lab_report": {},
                "lab_report_delivery": {},
                "lab_report_file": {},
                "menstruation": {},
                "nutrition": {},
                "planned_workout": {},
                "sleep": {},
                "user": {},
                "workout": {},
            },
        },
        "entity": {
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
                    "lit": "activity",
                  },
                ],
                "parts": [
                  "activity",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "athlete",
                  },
                ],
                "parts": [
                  "athlete",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "to_webhook",
                    "user_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "authentication": {
        "fields": [
          {
            "name": "auth_failure_redirect_url",
            "title": "Auth Failure Redirect Url",
            "type": "`$STRING`",
            "short": "URL the user is redirected to upon unsuccessful authentication",
          },
          {
            "name": "auth_success_redirect_url",
            "title": "Auth Success Redirect Url",
            "type": "`$STRING`",
            "short": "URL the user is redirected to upon successful authentication",
          },
          {
            "name": "auth_url",
            "title": "Auth Url",
            "type": "`$STRING`",
            "short": "authentication URL the user must be redirected to in order to link their account",
          },
          {
            "name": "expires_in",
            "title": "Expires In",
            "type": "`$INTEGER`",
            "short": "a number in seconds depicting how long the url is valid for",
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
            "short": "Display language of the widget",
          },
          {
            "name": "providers",
            "title": "Providers",
            "type": "`$STRING`",
            "short": "Comma separated list of providers to display on the device selection page.",
          },
          {
            "name": "reference_id",
            "title": "Reference Id",
            "type": "`$STRING`",
            "short": "Identifier of the end user on your system, such as a user ID or email associated with them",
          },
          {
            "name": "session_id",
            "title": "Session Id",
            "type": "`$STRING`",
            "short": "Session ID for the widget authentication session",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "indicates that the request was successful",
          },
          {
            "name": "token",
            "title": "Token",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "the widget URL the user must be redirected to in order to link their account",
          },
          {
            "name": "user_id",
            "title": "User Id",
            "type": "`$STRING`",
            "short": "User ID for the user being created",
          },
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
                    "lit": "auth",
                  },
                  {
                    "lit": "authenticateUser",
                  },
                ],
                "parts": [
                  "auth",
                  "authenticateUser",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dev_id",
                      "orig": "dev_id",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                      "example": "testingTerra",
                    },
                  ],
                  "query": [
                    {
                      "name": "resource",
                      "orig": "resource",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "FITBIT",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dev_id",
                    "resource",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/generateAuthToken",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "generateAuthToken",
                  },
                ],
                "parts": [
                  "auth",
                  "generateAuthToken",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/generateWidgetSession",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "generateWidgetSession",
                  },
                ],
                "parts": [
                  "auth",
                  "generateWidgetSession",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "auth",
                  },
                  {
                    "lit": "deauthenticateUser",
                  },
                ],
                "parts": [
                  "auth",
                  "deauthenticateUser",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "body",
                  },
                ],
                "parts": [
                  "body",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "kind": "http",
                "method": "POST",
                "orig": "/bulkUserInfo",
                "segments": [
                  {
                    "lit": "bulkUserInfo",
                  },
                ],
                "parts": [
                  "bulkUserInfo",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "daily",
                  },
                ],
                "parts": [
                  "daily",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "integration": {
        "fields": [
          {
            "name": "providers",
            "title": "Providers",
            "type": "`$ARRAY`",
          },
          {
            "name": "sdk_providers",
            "title": "Sdk Providers",
            "type": "`$ARRAY`",
            "short": "Providers available through Terra's mobile SDKs rather than cloud connections",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
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
                "orig": "/integrations/detailed",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                  {
                    "lit": "detailed",
                  },
                ],
                "parts": [
                  "integrations",
                  "detailed",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.providers`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sdk",
                      "orig": "sdk",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "detailed",
                  "exist": [
                    "sdk",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/integrations",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                ],
                "parts": [
                  "integrations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "lab_report": {
        "fields": [
          {
            "name": "collection_date",
            "title": "Collection Date",
            "type": "`$STRING`",
            "short": "Specimen collection date (YYYY-MM-DD); omitted if not extracted.",
          },
          {
            "name": "collection_time",
            "title": "Collection Time",
            "type": "`$STRING`",
            "short": "Specimen collection time (HH:MM, 24-hour); omitted if not extracted.",
          },
          {
            "name": "current_status",
            "title": "Current Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Current status as a clean lowercase string (open enum), e.g.",
          },
          {
            "name": "file_count",
            "title": "File Count",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "input_bytes",
            "title": "Input Bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "lab_name",
            "title": "Lab Name",
            "type": "`$STRING`",
          },
          {
            "name": "output_bytes",
            "title": "Output Bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "panels",
            "title": "Panels",
            "type": "`$ARRAY`",
            "short": "Report-level panels that results reference by panel_id.",
          },
          {
            "name": "patient_age_at_collection",
            "title": "Patient Age At Collection",
            "type": "`$INTEGER`",
            "short": "Patient age in years; omitted if unknown.",
          },
          {
            "name": "patient_sex",
            "title": "Patient Sex",
            "type": "`$STRING`",
            "short": "Clean lowercase string (open enum); omitted if unspecified.",
          },
          {
            "name": "reference_id",
            "title": "Reference Id",
            "type": "`$STRING`",
            "short": "Your external reference; omitted if not set.",
          },
          {
            "name": "report_date",
            "title": "Report Date",
            "type": "`$STRING`",
            "short": "Date printed on the report (YYYY-MM-DD); omitted if not extracted.",
          },
          {
            "name": "report_locale",
            "title": "Report Locale",
            "type": "`$STRING`",
          },
          {
            "name": "report_notes",
            "title": "Report Notes",
            "type": "`$STRING`",
          },
          {
            "name": "report_time",
            "title": "Report Time",
            "type": "`$STRING`",
            "short": "Time printed on the report (HH:MM, 24-hour); omitted if not extracted.",
          },
          {
            "name": "report_type",
            "title": "Report Type",
            "type": "`$STRING`",
            "req": True,
            "short": "Report type as a clean lowercase string (open enum — handle unknown values gracefully).",
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
            "short": "The layered biomarker results.",
          },
          {
            "name": "results_count",
            "title": "Results Count",
            "type": "`$INTEGER`",
          },
          {
            "name": "session_id",
            "title": "Session Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status_history",
            "title": "Status History",
            "type": "`$ARRAY`",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "upload_id",
            "title": "Upload Id",
            "type": "`$STRING`",
          },
          {
            "name": "uploaded_at",
            "title": "Uploaded At",
            "type": "`$STRING`",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                "orig": "/lab-reports",
                "segments": [
                  {
                    "lit": "lab-reports",
                  },
                ],
                "parts": [
                  "lab-reports",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "reference_id",
                      "orig": "reference_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "patient_456",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "reference_id",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/lab-reports",
                "segments": [
                  {
                    "lit": "lab-reports",
                  },
                ],
                "parts": [
                  "lab-reports",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sessions`",
                },
                "args": {
                  "query": [
                    {
                      "name": "reference_id",
                      "orig": "reference_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "report_date_from",
                      "orig": "report_date_from",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "report_date_to",
                      "orig": "report_date_to",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "upload_id",
                      "orig": "upload_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "uploaded_at_from",
                      "orig": "uploaded_at_from",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "uploaded_at_to",
                      "orig": "uploaded_at_to",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "reference_id",
                    "report_date_from",
                    "report_date_to",
                    "upload_id",
                    "uploaded_at_from",
                    "uploaded_at_to",
                  ],
                },
              },
            ],
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
                    "lit": "lab-reports",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "lab-reports",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "session_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "session_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "297405620317847552",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "lab-reports",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "lab-reports",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "session_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "session_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "297405620317847552",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "lab_report_delivery": {
        "fields": [
          {
            "name": "attempt_count",
            "title": "Attempt Count",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Retry count — 0 on the first attempt, incremented per retry.",
          },
          {
            "name": "destination_id",
            "title": "Destination Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "destination_type",
            "title": "Destination Type",
            "type": "`$STRING`",
            "short": "The destination's type (e.g.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "last_error",
            "title": "Last Error",
            "type": "`$STRING`",
            "short": "Most recent delivery error; omitted when delivered.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "pending, delivered, or failed.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "lab-reports",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "deliveries",
                  },
                ],
                "parts": [
                  "lab-reports",
                  "{id}",
                  "deliveries",
                ],
                "rename": {
                  "param": {
                    "session_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.deliveries`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "session_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "297405620317847552",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "lab_report_file": {
        "fields": [
          {
            "name": "filename",
            "title": "Filename",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "presigned_url",
            "title": "Presigned Url",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "lab-reports",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "files",
                  },
                ],
                "parts": [
                  "lab-reports",
                  "{id}",
                  "files",
                ],
                "rename": {
                  "param": {
                    "session_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "session_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "297405620317847552",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "menstruation",
                  },
                ],
                "parts": [
                  "menstruation",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "nutrition",
                  },
                ],
                "parts": [
                  "nutrition",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "planned_workout": {
        "fields": [
          {
            "name": "athlete_metrics",
            "title": "Athlete Metrics",
            "type": "`$ANY`",
          },
          {
            "name": "coercion_warnings",
            "title": "Coercion Warnings",
            "type": "`$STRING`",
            "short": "Set when the template could not be represented exactly on the provider.",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$ANY`",
            "short": "Creation time (RFC 3339)",
          },
          {
            "name": "details",
            "title": "Details",
            "type": "`$ANY`",
            "short": "Full workout body (title, description, planned metrics, structured steps) fetched live from the provider.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "is_external",
            "title": "Is External",
            "type": "`$BOOLEAN`",
            "short": "True when the workout was created on the provider side rather than through Terra.",
          },
          {
            "name": "last_updated_at",
            "title": "Last Updated At",
            "type": "`$ANY`",
            "short": "Last update time (RFC 3339)",
          },
          {
            "name": "planned_date",
            "title": "Planned Date",
            "type": "`$STRING`",
            "op": {
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "New scheduled date (YYYY-MM-DD)",
            "format": "date",
          },
          {
            "name": "planned_workout_id",
            "title": "Planned Workout Id",
            "type": "`$STRING`",
            "short": "Terra identifier of the planned workout",
          },
          {
            "name": "provider_workout_id",
            "title": "Provider Workout Id",
            "type": "`$STRING`",
            "short": "Identifier assigned by the provider, once pushed.",
          },
          {
            "name": "workout_id",
            "title": "Workout Id",
            "type": "`$STRING`",
            "short": "Identifier of the source template.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "plannedWorkouts",
                  },
                ],
                "parts": [
                  "plannedWorkouts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "user_id",
                  ],
                },
              },
            ],
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
                    "lit": "plannedWorkouts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "plannedWorkouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "planned_workout_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "planned_workout_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "user_id",
                  ],
                },
              },
            ],
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
                    "lit": "plannedWorkouts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "plannedWorkouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "planned_workout_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "planned_workout_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "user_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "sleep",
                  },
                ],
                "parts": [
                  "sleep",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "kind": "http",
                "method": "GET",
                "orig": "/subscriptions",
                "segments": [
                  {
                    "lit": "subscriptions",
                  },
                ],
                "parts": [
                  "subscriptions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 500,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/userInfo",
                "segments": [
                  {
                    "lit": "userInfo",
                  },
                ],
                "parts": [
                  "userInfo",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "reference_id",
                      "orig": "reference_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "reference_id",
                    "user_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "workout": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Description of the workout",
          },
          {
            "name": "environment",
            "title": "Environment",
            "type": "`$ANY`",
          },
          {
            "name": "estimated_calories",
            "title": "Estimated Calories",
            "type": "`$ANY`",
            "short": "Estimated calories burned",
          },
          {
            "name": "estimated_distance_meters",
            "title": "Estimated Distance Meters",
            "type": "`$ANY`",
            "short": "Estimated total distance in meters",
          },
          {
            "name": "estimated_duration_seconds",
            "title": "Estimated Duration Seconds",
            "type": "`$ANY`",
            "short": "Estimated total duration in seconds",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the workout",
          },
          {
            "name": "pool_length_meters",
            "title": "Pool Length Meters",
            "type": "`$ANY`",
            "short": "Pool length in meters, for swim workouts",
          },
          {
            "name": "sport",
            "title": "Sport",
            "type": "`$ANY`",
            "req": True,
            "short": "Sport a workout template targets.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "step_blocks",
            "title": "Step Blocks",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "workout_id",
            "title": "Workout Id",
            "type": "`$STRING`",
            "short": "Terra identifier of the stored template.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "workouts",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "plan",
                  },
                ],
                "parts": [
                  "workouts",
                  "{id}",
                  "plan",
                ],
                "rename": {
                  "param": {
                    "workout_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workout_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "plan",
                  "exist": [
                    "id",
                    "user_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/workouts",
                "segments": [
                  {
                    "lit": "workouts",
                  },
                ],
                "parts": [
                  "workouts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "workouts",
                  },
                ],
                "parts": [
                  "workouts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "workouts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "workouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workout_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workout_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "plannedWorkouts",
                  },
                  {
                    "var": "planned_workout_id",
                  },
                ],
                "parts": [
                  "plannedWorkouts",
                  "{planned_workout_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "planned_workout_id",
                      "orig": "planned_workout_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "planned_workout_id",
                    "user_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/workouts/{workout_id}",
                "segments": [
                  {
                    "lit": "workouts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "workouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workout_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "workout_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.planned_workout",
            ],
          ],
        },
      },
    },
    }
