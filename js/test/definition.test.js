const { describe, test } = require('node:test')
const { SDK } = require('..')
const { runDefinitionPoint } = require('./definition-runner')
const { isControlSkipped } = require('./utility')


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
  {
    "entity": "activity",
    "accessor": "Activity",
    "op": "load",
    "method": "GET",
    "path": "/activity",
    "args": [],
    "select": {
      "start_date": "v1",
      "user_id": "v1",
      "end_date": "v1",
      "to_webhook": "v1",
      "with_sample": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date",
      "to_webhook",
      "with_samples"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "with_sample",
        "wire": "with_samples"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      },
      "data": [
        {
          "active_durations_data": {},
          "calories_data": {},
          "cheat_detection": 1,
          "data_enrichment": {},
          "device_data": {},
          "distance_data": {},
          "energy_data": {},
          "heart_rate_data": {},
          "lap_data": {},
          "MET_data": {},
          "metadata": {
            "city": "x",
            "country": "x",
            "end_time": "x",
            "name": "x",
            "start_time": "x",
            "state": "x",
            "summary_id": "x",
            "timestamp_localization": 0,
            "type": 1,
            "upload_type": 1
          },
          "movement_data": {},
          "oxygen_data": {},
          "polyline_map_data": {},
          "position_data": {},
          "strength_data": {},
          "power_data": {},
          "strain_data": {},
          "TSS_data": {},
          "work_data": {}
        }
      ],
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "athlete",
    "accessor": "Athlete",
    "op": "load",
    "method": "GET",
    "path": "/athlete",
    "args": [],
    "select": {
      "user_id": "v1",
      "to_webhook": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "to_webhook"
    ],
    "queryArgs": [
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "athlete": {
        "age": 1,
        "country": "x",
        "bio": "x",
        "state": "x",
        "last_name": "x",
        "sex": "x",
        "city": "x",
        "email": "x",
        "date_of_birth": "x",
        "first_name": "x",
        "gender": "x",
        "account_creation_date": "x",
        "provider_user_id": "x"
      },
      "type": "athlete",
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      }
    },
    "idField": "id"
  },
  {
    "entity": "authentication",
    "accessor": "Authentication",
    "op": "create",
    "method": "POST",
    "path": "/auth/authenticateUser",
    "args": [],
    "select": {
      "resource": "FITBIT"
    },
    "headers": [
      {
        "name": "dev_id",
        "wire": "dev-id",
        "value": "testingTerra"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "resource"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "user_id": "23dc2540-7139-44c6-8158-f81196e2cf2e",
      "auth_url": "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23BBG9&scope=settings+nutrition+sleep+heartrate+electrocardiogram+weight+respiratory_rate+oxygen_saturation+profile+temperature+cardio_fitness+activity+location&state=bLqqjPie9ptwoWm6VBxHCu6JkkoWJp"
    },
    "idField": "id"
  },
  {
    "entity": "authentication",
    "accessor": "Authentication",
    "op": "remove",
    "method": "DELETE",
    "path": "/auth/deauthenticateUser",
    "args": [],
    "select": {
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id"
    ],
    "queryArgs": [
      {
        "name": "user_id",
        "wire": "user_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "body",
    "accessor": "Body",
    "op": "load",
    "method": "GET",
    "path": "/body",
    "args": [],
    "select": {
      "start_date": "v1",
      "user_id": "v1",
      "end_date": "v1",
      "to_webhook": "v1",
      "with_sample": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date",
      "to_webhook",
      "with_samples"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "with_sample",
        "wire": "with_samples"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      },
      "data": [
        {
          "blood_pressure_data": {},
          "device_data": {},
          "heart_data": {},
          "hydration_data": {},
          "ketone_data": {},
          "measurements_data": {},
          "metadata": {
            "end_time": "x",
            "start_time": "x",
            "timestamp_localization": 0
          },
          "oxygen_data": {},
          "temperature_data": {},
          "glucose_data": {}
        }
      ],
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "bulk_user_info",
    "accessor": "BulkUserInfo",
    "op": "create",
    "method": "POST",
    "path": "/bulkUserInfo",
    "args": [],
    "select": {
      "bulk_user_infos": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "daily",
    "accessor": "Daily",
    "op": "load",
    "method": "GET",
    "path": "/daily",
    "args": [],
    "select": {
      "start_date": "v1",
      "user_id": "v1",
      "end_date": "v1",
      "to_webhook": "v1",
      "with_sample": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date",
      "to_webhook",
      "with_samples"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "with_sample",
        "wire": "with_samples"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      },
      "data": [
        {
          "active_durations_data": {},
          "calories_data": {},
          "data_enrichment": {},
          "trends": {
            "window_days": 1,
            "window_end": "x"
          },
          "device_data": {},
          "distance_data": {},
          "heart_rate_data": {},
          "MET_data": {},
          "metadata": {
            "end_time": "x",
            "start_time": "x",
            "timestamp_localization": 0,
            "upload_type": 1
          },
          "oxygen_data": {},
          "scores": {},
          "strain_data": {},
          "stress_data": {},
          "tag_data": {}
        }
      ],
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "list",
    "method": "GET",
    "path": "/integrations",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "providers": [
        "FITBIT"
      ],
      "sdk_providers": [
        "APPLE"
      ],
      "status": "success"
    },
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "list",
    "method": "GET",
    "path": "/integrations/detailed",
    "action": "detailed",
    "args": [],
    "select": {
      "sdk": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "sdk"
    ],
    "queryArgs": [
      {
        "name": "sdk",
        "wire": "sdk"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "status": "success",
      "providers": [
        {
          "provider": "MAPMYFITNESS",
          "name": "MapMyFitness",
          "icon": "https://access.tryterra.co/api/v2/static/assets/img/app_icons/mapmyfitness.webp",
          "setup": "API_KEYS_MANAGED",
          "enabled": true,
          "types": {
            "activity": true,
            "body": false,
            "nutrition": false,
            "daily": false,
            "sleep": false,
            "menstruation": false
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "lab_report",
    "accessor": "LabReport",
    "op": "create",
    "method": "POST",
    "path": "/lab-reports",
    "args": [],
    "select": {
      "reference_id": "patient_456"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "reference_id"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 202,
    "sample": {
      "upload_id": "x",
      "current_status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "lab_report",
    "accessor": "LabReport",
    "op": "list",
    "method": "GET",
    "path": "/lab-reports",
    "args": [],
    "select": {
      "reference_id": "v1",
      "report_date_from": "v1",
      "report_date_to": "v1",
      "report_type": "dexa",
      "upload_id": "v1",
      "uploaded_at_from": "v1",
      "uploaded_at_to": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "reference_id",
      "report_type",
      "upload_id",
      "report_date_from",
      "report_date_to",
      "uploaded_at_from",
      "uploaded_at_to"
    ],
    "queryArgs": [
      {
        "name": "reference_id",
        "wire": "reference_id"
      },
      {
        "name": "report_date_from",
        "wire": "report_date_from"
      },
      {
        "name": "report_date_to",
        "wire": "report_date_to"
      },
      {
        "name": "report_type",
        "wire": "report_type"
      },
      {
        "name": "upload_id",
        "wire": "upload_id"
      },
      {
        "name": "uploaded_at_from",
        "wire": "uploaded_at_from"
      },
      {
        "name": "uploaded_at_to",
        "wire": "uploaded_at_to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "sessions": [
        {
          "session_id": "x",
          "upload_id": "x",
          "reference_id": "x",
          "report_type": "lab",
          "current_status": "x",
          "uploaded_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "report_date": "x",
          "report_time": "x",
          "collection_date": "x",
          "collection_time": "x",
          "report_locale": "x",
          "lab_name": "x",
          "patient_age_at_collection": 1,
          "patient_sex": "x",
          "input_bytes": 1,
          "results_count": 1,
          "output_bytes": 1,
          "file_count": 1,
          "status_history": [
            {
              "status": "x",
              "timestamp": "2026-01-01T00:00:00Z",
              "note": "x"
            }
          ],
          "results": [
            {
              "source": {
                "name": "x",
                "panel": "x",
                "value": "x",
                "units": "x",
                "flag": "x",
                "method": "x",
                "notes": "x",
                "reference_text": "x",
                "region_name": "x",
                "collection_date": "x",
                "collection_time": "x"
              },
              "biomarker": {
                "display_name": "x",
                "loinc_code": "x",
                "panel_id": 1,
                "panel_key": "x",
                "specimen": "x",
                "region": "head"
              },
              "measurement": {
                "type": "x",
                "numeric": 1,
                "bounded": {},
                "qualitative": {},
                "text": "x",
                "absent_reason": "x",
                "units": "x",
                "ucum_code": "x"
              },
              "interpretation": {
                "flag_raw": "x",
                "source": "x",
                "applied_range": {}
              },
              "reference_ranges": [
                {}
              ]
            }
          ],
          "panels": [
            {
              "id": 1,
              "name": "x",
              "key": "x"
            }
          ],
          "report_notes": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "lab_report",
    "accessor": "LabReport",
    "op": "load",
    "method": "GET",
    "path": "/lab-reports/{session_id}",
    "args": [
      {
        "name": "id",
        "wire": "session_id",
        "value": "297405620317847552"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "session_id": "x",
      "upload_id": "x",
      "reference_id": "x",
      "report_type": "lab",
      "current_status": "x",
      "uploaded_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "report_date": "x",
      "report_time": "x",
      "collection_date": "x",
      "collection_time": "x",
      "report_locale": "x",
      "lab_name": "x",
      "patient_age_at_collection": 1,
      "patient_sex": "x",
      "input_bytes": 1,
      "results_count": 1,
      "output_bytes": 1,
      "file_count": 1,
      "status_history": [
        {
          "status": "x",
          "timestamp": "2026-01-01T00:00:00Z",
          "note": "x"
        }
      ],
      "results": [
        {
          "source": {
            "name": "x",
            "panel": "x",
            "value": "x",
            "units": "x",
            "flag": "x",
            "method": "x",
            "notes": "x",
            "reference_text": "x",
            "region_name": "x",
            "collection_date": "x",
            "collection_time": "x"
          },
          "biomarker": {
            "key": "x",
            "display_name": "x",
            "loinc_code": "x",
            "panel_id": 1,
            "panel_key": "x",
            "specimen": "x",
            "region": "head"
          },
          "measurement": {
            "type": "x",
            "numeric": 1,
            "bounded": {
              "operator": "x",
              "value": 1
            },
            "qualitative": {
              "text": "x",
              "code": "x"
            },
            "text": "x",
            "absent_reason": "x",
            "units": "x",
            "ucum_code": "x"
          },
          "interpretation": {
            "flag": "x",
            "flag_raw": "x",
            "source": "x",
            "applied_range": {
              "lower": 1,
              "upper": 1
            }
          },
          "reference_ranges": [
            {
              "lower": 1,
              "upper": 1,
              "type": "x",
              "label": "x",
              "context": {
                "sex": "x",
                "age_lower": 1,
                "age_upper": 1,
                "pregnancy_status": "x",
                "gestational_week_lower": 1,
                "gestational_week_upper": 1,
                "cycle_phase": "x",
                "reference_population": "x",
                "modifiers": []
              }
            }
          ]
        }
      ],
      "panels": [
        {
          "id": 1,
          "name": "x",
          "key": "x"
        }
      ],
      "report_notes": "x"
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_delivery",
    "accessor": "LabReportDelivery",
    "op": "list",
    "method": "GET",
    "path": "/lab-reports/{session_id}/deliveries",
    "args": [
      {
        "name": "id",
        "wire": "session_id",
        "value": "297405620317847552"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "deliveries": [
        {
          "destination_id": "x",
          "destination_type": "x",
          "status": "x",
          "attempt_count": 1,
          "last_error": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_delivery",
    "accessor": "LabReportDelivery",
    "op": "list",
    "method": "GET",
    "path": "/reports/{session_id}/deliveries",
    "args": [
      {
        "name": "report_id",
        "wire": "session_id",
        "value": "297405620317847552"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "deliveries": [
        {
          "destination_id": "x",
          "destination_type": "x",
          "status": "x",
          "attempt_count": 1,
          "last_error": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_file",
    "accessor": "LabReportFile",
    "op": "list",
    "method": "GET",
    "path": "/lab-reports/{session_id}/files",
    "args": [
      {
        "name": "id",
        "wire": "session_id",
        "value": "297405620317847552"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "files": [
        {
          "filename": "x",
          "presigned_url": "x"
        }
      ],
      "thumbnail": {
        "filename": "x",
        "presigned_url": "x"
      },
      "expires_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_file",
    "accessor": "LabReportFile",
    "op": "list",
    "method": "GET",
    "path": "/reports/{session_id}/files",
    "args": [
      {
        "name": "report_id",
        "wire": "session_id",
        "value": "297405620317847552"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "files": [
        {
          "filename": "x",
          "presigned_url": "x"
        }
      ],
      "thumbnail": {
        "filename": "x",
        "presigned_url": "x"
      },
      "expires_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_session",
    "accessor": "LabReportSession",
    "op": "create",
    "method": "POST",
    "path": "/reports",
    "args": [],
    "select": {
      "reference_id": "patient_456"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "reference_id"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 202,
    "sample": {
      "upload_id": "x",
      "current_status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_session",
    "accessor": "LabReportSession",
    "op": "list",
    "method": "GET",
    "path": "/reports",
    "args": [],
    "select": {
      "reference_id": "v1",
      "report_date_from": "v1",
      "report_date_to": "v1",
      "report_type": "dexa",
      "upload_id": "v1",
      "uploaded_at_from": "v1",
      "uploaded_at_to": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "reference_id",
      "report_type",
      "upload_id",
      "report_date_from",
      "report_date_to",
      "uploaded_at_from",
      "uploaded_at_to"
    ],
    "queryArgs": [
      {
        "name": "reference_id",
        "wire": "reference_id"
      },
      {
        "name": "report_date_from",
        "wire": "report_date_from"
      },
      {
        "name": "report_date_to",
        "wire": "report_date_to"
      },
      {
        "name": "report_type",
        "wire": "report_type"
      },
      {
        "name": "upload_id",
        "wire": "upload_id"
      },
      {
        "name": "uploaded_at_from",
        "wire": "uploaded_at_from"
      },
      {
        "name": "uploaded_at_to",
        "wire": "uploaded_at_to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "sessions": [
        {
          "session_id": "x",
          "upload_id": "x",
          "reference_id": "x",
          "report_type": "lab",
          "current_status": "x",
          "uploaded_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "report_date": "x",
          "report_time": "x",
          "collection_date": "x",
          "collection_time": "x",
          "report_locale": "x",
          "lab_name": "x",
          "patient_age_at_collection": 1,
          "patient_sex": "x",
          "input_bytes": 1,
          "results_count": 1,
          "output_bytes": 1,
          "file_count": 1,
          "status_history": [
            {
              "status": "x",
              "timestamp": "2026-01-01T00:00:00Z",
              "note": "x"
            }
          ],
          "results": [
            {
              "source": {
                "name": "x",
                "panel": "x",
                "value": "x",
                "units": "x",
                "flag": "x",
                "method": "x",
                "notes": "x",
                "reference_text": "x",
                "region_name": "x",
                "collection_date": "x",
                "collection_time": "x"
              },
              "biomarker": {
                "display_name": "x",
                "loinc_code": "x",
                "panel_id": 1,
                "panel_key": "x",
                "specimen": "x",
                "region": "head"
              },
              "measurement": {
                "type": "x",
                "numeric": 1,
                "bounded": {},
                "qualitative": {},
                "text": "x",
                "absent_reason": "x",
                "units": "x",
                "ucum_code": "x"
              },
              "interpretation": {
                "flag_raw": "x",
                "source": "x",
                "applied_range": {}
              },
              "reference_ranges": [
                {}
              ]
            }
          ],
          "panels": [
            {
              "id": 1,
              "name": "x",
              "key": "x"
            }
          ],
          "report_notes": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "lab_report_session",
    "accessor": "LabReportSession",
    "op": "load",
    "method": "GET",
    "path": "/reports/{session_id}",
    "args": [
      {
        "name": "session_id",
        "wire": "session_id",
        "value": "297405620317847552"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "session_id": "x",
      "upload_id": "x",
      "reference_id": "x",
      "report_type": "lab",
      "current_status": "x",
      "uploaded_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "report_date": "x",
      "report_time": "x",
      "collection_date": "x",
      "collection_time": "x",
      "report_locale": "x",
      "lab_name": "x",
      "patient_age_at_collection": 1,
      "patient_sex": "x",
      "input_bytes": 1,
      "results_count": 1,
      "output_bytes": 1,
      "file_count": 1,
      "status_history": [
        {
          "status": "x",
          "timestamp": "2026-01-01T00:00:00Z",
          "note": "x"
        }
      ],
      "results": [
        {
          "source": {
            "name": "x",
            "panel": "x",
            "value": "x",
            "units": "x",
            "flag": "x",
            "method": "x",
            "notes": "x",
            "reference_text": "x",
            "region_name": "x",
            "collection_date": "x",
            "collection_time": "x"
          },
          "biomarker": {
            "key": "x",
            "display_name": "x",
            "loinc_code": "x",
            "panel_id": 1,
            "panel_key": "x",
            "specimen": "x",
            "region": "head"
          },
          "measurement": {
            "type": "x",
            "numeric": 1,
            "bounded": {
              "operator": "x",
              "value": 1
            },
            "qualitative": {
              "text": "x",
              "code": "x"
            },
            "text": "x",
            "absent_reason": "x",
            "units": "x",
            "ucum_code": "x"
          },
          "interpretation": {
            "flag": "x",
            "flag_raw": "x",
            "source": "x",
            "applied_range": {
              "lower": 1,
              "upper": 1
            }
          },
          "reference_ranges": [
            {
              "lower": 1,
              "upper": 1,
              "type": "x",
              "label": "x",
              "context": {
                "sex": "x",
                "age_lower": 1,
                "age_upper": 1,
                "pregnancy_status": "x",
                "gestational_week_lower": 1,
                "gestational_week_upper": 1,
                "cycle_phase": "x",
                "reference_population": "x",
                "modifiers": []
              }
            }
          ]
        }
      ],
      "panels": [
        {
          "id": 1,
          "name": "x",
          "key": "x"
        }
      ],
      "report_notes": "x"
    },
    "idField": "id"
  },
  {
    "entity": "menstruation",
    "accessor": "Menstruation",
    "op": "load",
    "method": "GET",
    "path": "/menstruation",
    "args": [],
    "select": {
      "start_date": "v1",
      "user_id": "v1",
      "end_date": "v1",
      "to_webhook": "v1",
      "with_sample": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date",
      "to_webhook",
      "with_samples"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "with_sample",
        "wire": "with_samples"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      },
      "data": [
        {
          "metadata": {
            "end_time": "x",
            "start_time": "x",
            "timestamp_localization": 0
          },
          "menstruation_data": {}
        }
      ],
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "nutrition",
    "accessor": "Nutrition",
    "op": "load",
    "method": "GET",
    "path": "/nutrition",
    "args": [],
    "select": {
      "start_date": "v1",
      "user_id": "v1",
      "end_date": "v1",
      "to_webhook": "v1",
      "with_sample": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date",
      "to_webhook",
      "with_samples"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "with_sample",
        "wire": "with_samples"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      },
      "data": [
        {
          "drink_samples": [
            {}
          ],
          "meals": [
            {}
          ],
          "metadata": {
            "end_time": "x",
            "start_time": "x",
            "timestamp_localization": 0
          },
          "summary": {}
        }
      ],
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "planned_workout",
    "accessor": "PlannedWorkout",
    "op": "list",
    "method": "GET",
    "path": "/plannedWorkouts",
    "args": [],
    "select": {
      "user_id": "v1",
      "end_date": "v1",
      "start_date": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "planned_workout_id": "x",
        "workout_id": "x",
        "planned_date": "x",
        "provider_workout_id": "x",
        "coercion_warnings": "x",
        "warnings": [
          {
            "path": "x",
            "message": "x"
          }
        ],
        "created_at": "x",
        "last_updated_at": "x",
        "is_external": true,
        "completed_at": "x",
        "athlete_metrics": {
          "threshold_heart_rate": 1,
          "max_heart_rate": 1,
          "threshold_speed": 1,
          "ftp": 1,
          "pool_length_meters": 1
        },
        "workout": {
          "name": "x",
          "description": "x",
          "environment": "x",
          "pool_length_meters": 1,
          "step_blocks": [
            {
              "completion_condition": {},
              "steps": []
            }
          ],
          "estimated_duration_seconds": 1,
          "estimated_distance_meters": 1,
          "estimated_calories": 1,
          "estimated_tss": 1,
          "estimated_intensity_factor": 1,
          "workout_id": "x",
          "sport": "x"
        },
        "details": {
          "metadata": {},
          "steps": [
            {}
          ]
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "planned_workout",
    "accessor": "PlannedWorkout",
    "op": "load",
    "method": "GET",
    "path": "/plannedWorkouts/{planned_workout_id}",
    "args": [
      {
        "name": "id",
        "wire": "planned_workout_id",
        "value": "p1"
      }
    ],
    "select": {
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id"
    ],
    "queryArgs": [
      {
        "name": "user_id",
        "wire": "user_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "planned_workout_id": "2048",
      "planned_date": "2026-01-01",
      "is_external": true,
      "workout_id": "x",
      "provider_workout_id": "x",
      "coercion_warnings": "x",
      "completed_at": "2026-01-01T00:00:00Z",
      "warnings": [
        {
          "path": "x",
          "message": "x"
        }
      ],
      "workout": {
        "name": "x",
        "description": "x",
        "environment": "x",
        "pool_length_meters": 1,
        "step_blocks": [
          {
            "completion_condition": {},
            "steps": [
              {}
            ]
          }
        ],
        "estimated_duration_seconds": 1,
        "estimated_distance_meters": 1,
        "estimated_calories": 1,
        "estimated_tss": 1,
        "estimated_intensity_factor": 1,
        "workout_id": "x",
        "sport": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "planned_workout",
    "accessor": "PlannedWorkout",
    "op": "update",
    "method": "PATCH",
    "path": "/plannedWorkouts/{planned_workout_id}",
    "args": [
      {
        "name": "id",
        "wire": "planned_workout_id",
        "value": "p1"
      }
    ],
    "select": {
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "planned_workout_id": "2048",
      "planned_date": "2026-01-01",
      "is_external": true,
      "workout_id": "x",
      "provider_workout_id": "x",
      "coercion_warnings": "x",
      "completed_at": "2026-01-01T00:00:00Z",
      "warnings": [
        {
          "path": "x",
          "message": "x"
        }
      ],
      "workout": {
        "name": "x",
        "description": "x",
        "environment": "x",
        "pool_length_meters": 1,
        "step_blocks": [
          {
            "completion_condition": {},
            "steps": [
              {}
            ]
          }
        ],
        "estimated_duration_seconds": 1,
        "estimated_distance_meters": 1,
        "estimated_calories": 1,
        "estimated_tss": 1,
        "estimated_intensity_factor": 1,
        "workout_id": "x",
        "sport": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "sleep",
    "accessor": "Sleep",
    "op": "load",
    "method": "GET",
    "path": "/sleep",
    "args": [],
    "select": {
      "start_date": "v1",
      "user_id": "v1",
      "end_date": "v1",
      "to_webhook": "v1",
      "with_sample": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "start_date",
      "end_date",
      "to_webhook",
      "with_samples"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "to_webhook",
        "wire": "to_webhook"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "with_sample",
        "wire": "with_samples"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true
      },
      "data": [
        {
          "data_enrichment": {},
          "trends": {
            "window_days": 1,
            "window_end": "x"
          },
          "device_data": {},
          "heart_rate_data": {},
          "metadata": {
            "end_time": "x",
            "is_nap": true,
            "start_time": "x",
            "summary_id": "x",
            "timestamp_localization": 0,
            "upload_type": 1
          },
          "readiness_data": {},
          "respiration_data": {},
          "scores": {},
          "sleep_durations_data": {},
          "temperature_data": {}
        }
      ],
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "list",
    "method": "GET",
    "path": "/subscriptions",
    "args": [],
    "select": {
      "page": 0,
      "per_page": 500
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "users": [
        {
          "user_id": "x",
          "provider": "x",
          "created_at": "x",
          "last_webhook_update": "x",
          "scopes": "x",
          "reference_id": "x",
          "active": true
        }
      ],
      "next": 1,
      "max_page": 1,
      "results": [
        {
          "user_id": "x",
          "provider": "x",
          "created_at": "x",
          "last_webhook_update": "x",
          "scopes": "x",
          "reference_id": "x",
          "active": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/userInfo",
    "args": [],
    "select": {
      "reference_id": "v1",
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id",
      "reference_id"
    ],
    "queryArgs": [
      {
        "name": "reference_id",
        "wire": "reference_id"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "user": {
        "user_id": "x",
        "provider": "x",
        "created_at": "x",
        "last_webhook_update": "x",
        "scopes": "x",
        "reference_id": "x",
        "active": true,
        "last_polled_at": "2024-01-20T11:00:00Z",
        "most_recent_data_at": "2024-01-19T23:00:00Z"
      },
      "status": "success",
      "is_authenticated": true
    },
    "idField": "id"
  },
  {
    "entity": "workout",
    "accessor": "Workout",
    "op": "create",
    "method": "POST",
    "path": "/workouts/{workout_id}/plan",
    "action": "plan",
    "args": [
      {
        "name": "id",
        "wire": "workout_id",
        "value": "p1"
      }
    ],
    "select": {
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "user_id"
    ],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "status": "success",
      "planned_workout_id": "2048",
      "provider_workout_id": "x",
      "coercion_warnings": "x",
      "warnings": [
        {
          "path": "x",
          "message": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "workout",
    "accessor": "Workout",
    "op": "create",
    "method": "POST",
    "path": "/workouts",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": "success",
      "workout_id": "1024"
    },
    "idField": "id"
  },
  {
    "entity": "workout",
    "accessor": "Workout",
    "op": "list",
    "method": "GET",
    "path": "/workouts",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "name": "x",
        "description": "x",
        "environment": "x",
        "pool_length_meters": 1,
        "step_blocks": [
          {
            "completion_condition": {
              "type": "x",
              "value": 1,
              "value_low": 1,
              "value_high": 1
            },
            "steps": [
              {
                "completion_condition": {}
              }
            ]
          }
        ],
        "estimated_duration_seconds": 1,
        "estimated_distance_meters": 1,
        "estimated_calories": 1,
        "estimated_tss": 1,
        "estimated_intensity_factor": 1,
        "workout_id": "x",
        "sport": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "workout",
    "accessor": "Workout",
    "op": "load",
    "method": "GET",
    "path": "/workouts/{workout_id}",
    "args": [
      {
        "name": "id",
        "wire": "workout_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "name": "x",
      "description": "x",
      "environment": "x",
      "pool_length_meters": 1,
      "step_blocks": [
        {
          "completion_condition": {
            "type": "x",
            "value": 1,
            "value_low": 1,
            "value_high": 1
          },
          "steps": [
            {
              "completion_condition": {},
              "intensity_targets": [],
              "intensity_type": "x",
              "notes": "x",
              "controls": [],
              "strength": {},
              "swimming": {}
            }
          ]
        }
      ],
      "estimated_duration_seconds": 1,
      "estimated_distance_meters": 1,
      "estimated_calories": 1,
      "estimated_tss": 1,
      "estimated_intensity_factor": 1,
      "workout_id": "x",
      "sport": "x"
    },
    "idField": "id"
  },
  {
    "entity": "workout",
    "accessor": "Workout",
    "op": "remove",
    "method": "DELETE",
    "path": "/plannedWorkouts/{planned_workout_id}",
    "args": [
      {
        "name": "planned_workout_id",
        "wire": "planned_workout_id",
        "value": "p1"
      }
    ],
    "select": {
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "user_id"
    ],
    "queryArgs": [
      {
        "name": "user_id",
        "wire": "user_id"
      }
    ],
    "auth": null,
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "workout",
    "accessor": "Workout",
    "op": "remove",
    "method": "DELETE",
    "path": "/workouts/{workout_id}",
    "args": [
      {
        "name": "id",
        "wire": "workout_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 204,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
