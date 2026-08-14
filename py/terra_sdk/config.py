# Terra SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://access.tryterra.co/api/v2",
            "auth": {
                "prefix": "",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/activity",
                "parts": [
                  "activity",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/athlete",
                "parts": [
                  "athlete",
                ],
                "select": {
                  "exist": [
                    "to_webhook",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "auth_success_redirect_url",
            "type": "`$STRING`",
          },
          {
            "name": "auth_url",
            "type": "`$STRING`",
          },
          {
            "name": "expires_in",
            "type": "`$INTEGER`",
          },
          {
            "name": "language",
            "type": "`$STRING`",
          },
          {
            "name": "providers",
            "type": "`$STRING`",
          },
          {
            "name": "reference_id",
            "type": "`$STRING`",
          },
          {
            "name": "session_id",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "token",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "FITBIT",
                      "kind": "query",
                      "name": "resource",
                      "orig": "resource",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/auth/authenticateUser",
                "parts": [
                  "auth",
                  "authenticateUser",
                ],
                "select": {
                  "exist": [
                    "dev_id",
                    "resource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/auth/generateAuthToken",
                "parts": [
                  "auth",
                  "generateAuthToken",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/auth/generateWidgetSession",
                "parts": [
                  "auth",
                  "generateWidgetSession",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/auth/deauthenticateUser",
                "parts": [
                  "auth",
                  "deauthenticateUser",
                ],
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/body",
                "parts": [
                  "body",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/bulkUserInfo",
                "parts": [
                  "bulkUserInfo",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/daily",
                "parts": [
                  "daily",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "name": "enabled",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "icon",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "provider",
            "type": "`$STRING`",
          },
          {
            "name": "setup",
            "type": "`$STRING`",
          },
          {
            "name": "types",
            "type": "`$OBJECT`",
          },
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
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/integrations/detailed",
                "parts": [
                  "integrations",
                  "detailed",
                ],
                "select": {
                  "exist": [
                    "sdk",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.providers`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "collection_time",
            "type": "`$STRING`",
          },
          {
            "name": "current_status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "file_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "input_bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "lab_name",
            "type": "`$STRING`",
          },
          {
            "name": "output_bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "panels",
            "type": "`$ARRAY`",
          },
          {
            "name": "patient_age_at_collection",
            "type": "`$INTEGER`",
          },
          {
            "name": "patient_sex",
            "type": "`$STRING`",
          },
          {
            "name": "reference_id",
            "type": "`$STRING`",
          },
          {
            "name": "report_date",
            "type": "`$STRING`",
          },
          {
            "name": "report_locale",
            "type": "`$STRING`",
          },
          {
            "name": "report_notes",
            "type": "`$STRING`",
          },
          {
            "name": "report_time",
            "type": "`$STRING`",
          },
          {
            "name": "report_type",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "results",
            "type": "`$ARRAY`",
          },
          {
            "name": "results_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "session_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "status_history",
            "type": "`$ARRAY`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "upload_id",
            "type": "`$STRING`",
          },
          {
            "name": "uploaded_at",
            "type": "`$STRING`",
          },
        ],
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
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/lab-reports",
                "parts": [
                  "lab-reports",
                ],
                "select": {
                  "exist": [
                    "reference_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "report_date_from",
                      "orig": "report_date_from",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "report_date_to",
                      "orig": "report_date_to",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "upload_id",
                      "orig": "upload_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "uploaded_at_from",
                      "orig": "uploaded_at_from",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "uploaded_at_to",
                      "orig": "uploaded_at_to",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lab-reports",
                "parts": [
                  "lab-reports",
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sessions`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lab-reports/{session_id}",
                "parts": [
                  "lab-reports",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "session_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/lab-reports/{session_id}",
                "parts": [
                  "lab-reports",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "session_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "destination_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "destination_type",
            "type": "`$STRING`",
          },
          {
            "name": "last_error",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lab-reports/{session_id}/deliveries",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.deliveries`",
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
            "type": "`$STRING`",
          },
          {
            "name": "presigned_url",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lab-reports/{session_id}/files",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/menstruation",
                "parts": [
                  "menstruation",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/nutrition",
                "parts": [
                  "nutrition",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$ANY`",
          },
          {
            "name": "coercion_warnings",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$ANY`",
          },
          {
            "name": "details",
            "type": "`$ANY`",
          },
          {
            "name": "is_external",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "last_updated_at",
            "type": "`$ANY`",
          },
          {
            "name": "planned_date",
            "op": {
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "type": "`$STRING`",
          },
          {
            "name": "planned_workout_id",
            "type": "`$STRING`",
          },
          {
            "name": "provider_workout_id",
            "type": "`$STRING`",
          },
          {
            "name": "workout_id",
            "type": "`$STRING`",
          },
        ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/plannedWorkouts",
                "parts": [
                  "plannedWorkouts",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/plannedWorkouts/{planned_workout_id}",
                "parts": [
                  "plannedWorkouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "planned_workout_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/plannedWorkouts/{planned_workout_id}",
                "parts": [
                  "plannedWorkouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "planned_workout_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "to_webhook",
                      "orig": "to_webhook",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "with_sample",
                      "orig": "with_sample",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sleep",
                "parts": [
                  "sleep",
                ],
                "select": {
                  "exist": [
                    "end_date",
                    "start_date",
                    "to_webhook",
                    "user_id",
                    "with_sample",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "query": [
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 500,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/subscriptions",
                "parts": [
                  "subscriptions",
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "reference_id",
                      "orig": "reference_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/userInfo",
                "parts": [
                  "userInfo",
                ],
                "select": {
                  "exist": [
                    "reference_id",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "environment",
            "type": "`$ANY`",
            "union": {
              "branches": 3,
              "count": 1,
              "depth": 2,
            },
          },
          {
            "name": "estimated_calories",
            "type": "`$ANY`",
          },
          {
            "name": "estimated_distance_meters",
            "type": "`$ANY`",
          },
          {
            "name": "estimated_duration_seconds",
            "type": "`$ANY`",
          },
          {
            "name": "ftp",
            "type": "`$NUMBER`",
          },
          {
            "name": "max_heart_rate",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "planned_date",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "pool_length_meters",
            "type": "`$ANY`",
          },
          {
            "name": "sport",
            "req": True,
            "type": "`$ANY`",
            "union": {
              "branches": 15,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "step_blocks",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 11,
              "count": 8,
              "depth": 13,
            },
          },
          {
            "name": "threshold_heart_rate",
            "type": "`$NUMBER`",
          },
          {
            "name": "threshold_speed",
            "type": "`$NUMBER`",
          },
          {
            "name": "workout_id",
            "type": "`$STRING`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/workouts/{workout_id}/plan",
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
                "select": {
                  "$action": "plan",
                  "exist": [
                    "id",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/workouts",
                "parts": [
                  "workouts",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                "parts": [
                  "workouts",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/workouts/{workout_id}",
                "parts": [
                  "workouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workout_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/plannedWorkouts/{planned_workout_id}",
                "parts": [
                  "plannedWorkouts",
                  "{planned_workout_id}",
                ],
                "select": {
                  "exist": [
                    "planned_workout_id",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "workout_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/workouts/{workout_id}",
                "parts": [
                  "workouts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "workout_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "planned_workout",
            ],
          ],
        },
      },
    },
    }
