package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Terra",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://access.tryterra.co/api/v2",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"activity": map[string]any{},
				"athlete": map[string]any{},
				"authentication": map[string]any{},
				"body": map[string]any{},
				"bulk_user_info": map[string]any{},
				"daily": map[string]any{},
				"integration": map[string]any{},
				"lab_report": map[string]any{},
				"lab_report_delivery": map[string]any{},
				"lab_report_file": map[string]any{},
				"menstruation": map[string]any{},
				"nutrition": map[string]any{},
				"planned_workout": map[string]any{},
				"sleep": map[string]any{},
				"user": map[string]any{},
				"workout": map[string]any{},
			},
		},
		"entity": map[string]any{
			"activity": map[string]any{
				"fields": []any{},
				"name": "activity",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "with_sample",
											"orig": "with_sample",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/activity",
								"parts": []any{
									"activity",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"to_webhook",
										"user_id",
										"with_sample",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"athlete": map[string]any{
				"fields": []any{},
				"name": "athlete",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/athlete",
								"parts": []any{
									"athlete",
								},
								"select": map[string]any{
									"exist": []any{
										"to_webhook",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"authentication": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auth_failure_redirect_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "auth_success_redirect_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "auth_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "providers",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reference_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "session_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"type": "`$STRING`",
					},
				},
				"name": "authentication",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "testingTerra",
											"kind": "header",
											"name": "dev_id",
											"orig": "dev_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "FITBIT",
											"kind": "query",
											"name": "resource",
											"orig": "resource",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/authenticateUser",
								"parts": []any{
									"auth",
									"authenticateUser",
								},
								"select": map[string]any{
									"exist": []any{
										"dev_id",
										"resource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/generateAuthToken",
								"parts": []any{
									"auth",
									"generateAuthToken",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/generateWidgetSession",
								"parts": []any{
									"auth",
									"generateWidgetSession",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/auth/deauthenticateUser",
								"parts": []any{
									"auth",
									"deauthenticateUser",
								},
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"body": map[string]any{
				"fields": []any{},
				"name": "body",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "with_sample",
											"orig": "with_sample",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/body",
								"parts": []any{
									"body",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"to_webhook",
										"user_id",
										"with_sample",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bulk_user_info": map[string]any{
				"fields": []any{},
				"name": "bulk_user_info",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/bulkUserInfo",
								"parts": []any{
									"bulkUserInfo",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"daily": map[string]any{
				"fields": []any{},
				"name": "daily",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "with_sample",
											"orig": "with_sample",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/daily",
								"parts": []any{
									"daily",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"to_webhook",
										"user_id",
										"with_sample",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"integration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "enabled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "icon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "setup",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "types",
						"type": "`$OBJECT`",
					},
				},
				"name": "integration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "sdk",
											"orig": "sdk",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/integrations/detailed",
								"parts": []any{
									"integrations",
									"detailed",
								},
								"select": map[string]any{
									"exist": []any{
										"sdk",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.providers`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lab_report": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "collection_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "collection_time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "current_status",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "file_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "input_bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lab_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "output_bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "panels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "patient_age_at_collection",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "patient_sex",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reference_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_locale",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "results",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "results_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "session_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status_history",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "upload_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uploaded_at",
						"type": "`$STRING`",
					},
				},
				"name": "lab_report",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient_456",
											"kind": "query",
											"name": "reference_id",
											"orig": "reference_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/lab-reports",
								"parts": []any{
									"lab-reports",
								},
								"select": map[string]any{
									"exist": []any{
										"reference_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "reference_id",
											"orig": "reference_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "report_date_from",
											"orig": "report_date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "report_date_to",
											"orig": "report_date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "upload_id",
											"orig": "upload_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "uploaded_at_from",
											"orig": "uploaded_at_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "uploaded_at_to",
											"orig": "uploaded_at_to",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports",
								"parts": []any{
									"lab-reports",
								},
								"select": map[string]any{
									"exist": []any{
										"reference_id",
										"report_date_from",
										"report_date_to",
										"upload_id",
										"uploaded_at_from",
										"uploaded_at_to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sessions`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "297405620317847552",
											"kind": "param",
											"name": "id",
											"orig": "session_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports/{session_id}",
								"parts": []any{
									"lab-reports",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"session_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "297405620317847552",
											"kind": "param",
											"name": "id",
											"orig": "session_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/lab-reports/{session_id}",
								"parts": []any{
									"lab-reports",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"session_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lab_report_delivery": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attempt_count",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "destination_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "destination_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_error",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "lab_report_delivery",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "297405620317847552",
											"kind": "param",
											"name": "id",
											"orig": "session_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports/{session_id}/deliveries",
								"parts": []any{
									"lab-reports",
									"{id}",
									"deliveries",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"session_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.deliveries`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lab_report_file": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "filename",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "presigned_url",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "lab_report_file",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "297405620317847552",
											"kind": "param",
											"name": "id",
											"orig": "session_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports/{session_id}/files",
								"parts": []any{
									"lab-reports",
									"{id}",
									"files",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"session_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"menstruation": map[string]any{
				"fields": []any{},
				"name": "menstruation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "with_sample",
											"orig": "with_sample",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/menstruation",
								"parts": []any{
									"menstruation",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"to_webhook",
										"user_id",
										"with_sample",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"nutrition": map[string]any{
				"fields": []any{},
				"name": "nutrition",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "with_sample",
											"orig": "with_sample",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/nutrition",
								"parts": []any{
									"nutrition",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"to_webhook",
										"user_id",
										"with_sample",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"planned_workout": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "athlete_metrics",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "coercion_warnings",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "details",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "is_external",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "last_updated_at",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "planned_date",
						"op": map[string]any{
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "planned_workout_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider_workout_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "workout_id",
						"type": "`$STRING`",
					},
				},
				"name": "planned_workout",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/plannedWorkouts",
								"parts": []any{
									"plannedWorkouts",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "planned_workout_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/plannedWorkouts/{planned_workout_id}",
								"parts": []any{
									"plannedWorkouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"planned_workout_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "planned_workout_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/plannedWorkouts/{planned_workout_id}",
								"parts": []any{
									"plannedWorkouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"planned_workout_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sleep": map[string]any{
				"fields": []any{},
				"name": "sleep",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "with_sample",
											"orig": "with_sample",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sleep",
								"parts": []any{
									"sleep",
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"start_date",
										"to_webhook",
										"user_id",
										"with_sample",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{},
				"name": "user",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 500,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/subscriptions",
								"parts": []any{
									"subscriptions",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "reference_id",
											"orig": "reference_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/userInfo",
								"parts": []any{
									"userInfo",
								},
								"select": map[string]any{
									"exist": []any{
										"reference_id",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workout": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "environment",
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 3,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "estimated_calories",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "estimated_distance_meters",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "estimated_duration_seconds",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ftp",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "max_heart_rate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "planned_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pool_length_meters",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "sport",
						"req": true,
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 15,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "step_blocks",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 11,
							"count": 8,
							"depth": 13,
						},
					},
					map[string]any{
						"name": "threshold_heart_rate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "threshold_speed",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "workout_id",
						"type": "`$STRING`",
					},
				},
				"name": "workout",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workout_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/workouts/{workout_id}/plan",
								"parts": []any{
									"workouts",
									"{id}",
									"plan",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workout_id": "id",
									},
								},
								"select": map[string]any{
									"$action": "plan",
									"exist": []any{
										"id",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/workouts",
								"parts": []any{
									"workouts",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/workouts",
								"parts": []any{
									"workouts",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workout_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/workouts/{workout_id}",
								"parts": []any{
									"workouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workout_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "planned_workout_id",
											"orig": "planned_workout_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/plannedWorkouts/{planned_workout_id}",
								"parts": []any{
									"plannedWorkouts",
									"{planned_workout_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"planned_workout_id",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workout_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/workouts/{workout_id}",
								"parts": []any{
									"workouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workout_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"planned_workout",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
