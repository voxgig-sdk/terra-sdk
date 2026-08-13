
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Terra',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://access.tryterra.co/api/v2',

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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "with_sample",
                    "orig": "with_sample",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "authentication": {
      "fields": [
        {
          "active": true,
          "name": "auth_failure_redirect_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "auth_success_redirect_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "auth_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "expires_in",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "language",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "providers",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "reference_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "session_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "token",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "user_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        }
      ],
      "name": "authentication",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "header": [
                  {
                    "active": true,
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
                    "active": true,
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
              },
              "index$": 0
            },
            {
              "active": true,
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
              },
              "index$": 1
            },
            {
              "active": true,
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
              },
              "index$": 2
            }
          ],
          "key$": "create"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "remove"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "with_sample",
                    "orig": "with_sample",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
              "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "with_sample",
                    "orig": "with_sample",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "integration": {
      "fields": [
        {
          "active": true,
          "name": "enabled",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "icon",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "provider",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "setup",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "types",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 5
        }
      ],
      "name": "integration",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "sdk",
                    "orig": "sdk",
                    "reqd": false,
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
                "exist": [
                  "sdk"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.providers`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "lab_report": {
      "fields": [
        {
          "active": true,
          "name": "collection_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "collection_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "current_status",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "file_count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "input_bytes",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "lab_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "output_bytes",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "panels",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 7
        },
        {
          "active": true,
          "name": "patient_age_at_collection",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "patient_sex",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "reference_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "report_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "report_locale",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "report_notes",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "report_time",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        },
        {
          "active": true,
          "name": "report_type",
          "req": true,
          "type": "`$STRING`",
          "index$": 15
        },
        {
          "active": true,
          "name": "results",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 16
        },
        {
          "active": true,
          "name": "results_count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 17
        },
        {
          "active": true,
          "name": "session_id",
          "req": true,
          "type": "`$STRING`",
          "index$": 18
        },
        {
          "active": true,
          "name": "status_history",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 19
        },
        {
          "active": true,
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 20
        },
        {
          "active": true,
          "name": "upload_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 21
        },
        {
          "active": true,
          "name": "uploaded_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 22
        }
      ],
      "name": "lab_report",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "patient_456",
                    "kind": "query",
                    "name": "reference_id",
                    "orig": "reference_id",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "reference_id",
                    "orig": "reference_id",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "report_date_from",
                    "orig": "report_date_from",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "report_date_to",
                    "orig": "report_date_to",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "upload_id",
                    "orig": "upload_id",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "uploaded_at_from",
                    "orig": "uploaded_at_from",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "uploaded_at_to",
                    "orig": "uploaded_at_to",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "297405620317847552",
                    "kind": "param",
                    "name": "id",
                    "orig": "session_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "297405620317847552",
                    "kind": "param",
                    "name": "id",
                    "orig": "session_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "lab_report_delivery": {
      "fields": [
        {
          "active": true,
          "name": "attempt_count",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "destination_id",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "destination_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "last_error",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "status",
          "req": true,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "lab_report_delivery",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "297405620317847552",
                    "kind": "param",
                    "name": "id",
                    "orig": "session_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "lab_report_file": {
      "fields": [
        {
          "active": true,
          "name": "filename",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "presigned_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "lab_report_file",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "297405620317847552",
                    "kind": "param",
                    "name": "id",
                    "orig": "session_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "with_sample",
                    "orig": "with_sample",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "with_sample",
                    "orig": "with_sample",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "planned_workout": {
      "fields": [
        {
          "active": true,
          "name": "athlete_metrics",
          "req": false,
          "type": "`$ANY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "coercion_warnings",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "created_at",
          "req": false,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "details",
          "req": false,
          "type": "`$ANY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "is_external",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 4
        },
        {
          "active": true,
          "name": "last_updated_at",
          "req": false,
          "type": "`$ANY`",
          "index$": 5
        },
        {
          "active": true,
          "name": "planned_date",
          "op": {
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "planned_workout_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "provider_workout_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "workout_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        }
      ],
      "name": "planned_workout",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "planned_workout_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "planned_workout_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "update"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": true,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "to_webhook",
                    "orig": "to_webhook",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "with_sample",
                    "orig": "with_sample",
                    "reqd": false,
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 500,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "reference_id",
                    "orig": "reference_id",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": false,
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
              },
              "index$": 1
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "workout": {
      "fields": [
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "environment",
          "req": false,
          "type": "`$ANY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "estimated_calories",
          "req": false,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "estimated_distance_meters",
          "req": false,
          "type": "`$ANY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "estimated_duration_seconds",
          "req": false,
          "type": "`$ANY`",
          "index$": 4
        },
        {
          "active": true,
          "name": "ftp",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "max_heart_rate",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "planned_date",
          "req": true,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "pool_length_meters",
          "req": false,
          "type": "`$ANY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "sport",
          "req": true,
          "type": "`$ANY`",
          "index$": 10
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "step_blocks",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 12
        },
        {
          "active": true,
          "name": "threshold_heart_rate",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 13
        },
        {
          "active": true,
          "name": "threshold_speed",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 14
        },
        {
          "active": true,
          "name": "workout_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 15
        }
      ],
      "name": "workout",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "workout_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
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
              },
              "index$": 0
            },
            {
              "active": true,
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
              },
              "index$": 1
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "workout_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "planned_workout_id",
                    "orig": "planned_workout_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "workout_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
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
              },
              "index$": 1
            }
          ],
          "key$": "remove"
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

export {
  config
}

