
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Terra',
        slug: "terra",
    version: "0.1.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://access.tryterra.co/api/v2",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      activity: {
      },

      athlete: {
      },

      authentication: {
      },

      body: {
      },

      bulk_user_info: {
      },

      daily: {
      },

      integration: {
      },

      lab_report: {
      },

      lab_report_delivery: {
      },

      lab_report_file: {
      },

      menstruation: {
      },

      nutrition: {
      },

      planned_workout: {
      },

      sleep: {
      },

      user: {
      },

      workout: {
      },

    }
  }


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
              "parts": [
                "activity"
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
              "parts": [
                "athlete"
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
              "parts": [
                "auth",
                "authenticateUser"
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
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/auth/generateAuthToken",
              "parts": [
                "auth",
                "generateAuthToken"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/auth/generateWidgetSession",
              "parts": [
                "auth",
                "generateWidgetSession"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "auth",
                "deauthenticateUser"
              ],
              "select": {
                "exist": [
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "parts": [
                "body"
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
                "bulkUserInfo"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "parts": [
                "daily"
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
              "parts": [
                "integrations",
                "detailed"
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
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/integrations",
              "parts": [
                "integrations"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "name": "updated_at",
          "type": "`$STRING`"
        },
        {
          "name": "upload_id",
          "type": "`$STRING`"
        },
        {
          "name": "uploaded_at",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/lab-reports",
              "parts": [
                "lab-reports"
              ],
              "select": {
                "exist": [
                  "reference_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "lab-reports"
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
              }
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
              "parts": [
                "lab-reports",
                "{id}"
              ],
              "rename": {
                "param": {
                  "session_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "lab-reports",
                "{id}"
              ],
              "rename": {
                "param": {
                  "session_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.deliveries`"
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
          "name": "filename",
          "type": "`$STRING`"
        },
        {
          "name": "presigned_url",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lab-reports/{session_id}/files",
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "parts": [
                "menstruation"
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
              "parts": [
                "nutrition"
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
              "parts": [
                "plannedWorkouts"
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
              }
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
              "parts": [
                "plannedWorkouts",
                "{id}"
              ],
              "rename": {
                "param": {
                  "planned_workout_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "plannedWorkouts",
                "{id}"
              ],
              "rename": {
                "param": {
                  "planned_workout_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "user_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "parts": [
                "sleep"
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
              "parts": [
                "subscriptions"
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
              }
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
              "parts": [
                "userInfo"
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
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/workouts",
              "parts": [
                "workouts"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "workouts"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "workouts",
                "{id}"
              ],
              "rename": {
                "param": {
                  "workout_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "plannedWorkouts",
                "{planned_workout_id}"
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
              }
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
              "parts": [
                "workouts",
                "{id}"
              ],
              "rename": {
                "param": {
                  "workout_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  }
}


const config = new Config()

module.exports = {
  config
}

