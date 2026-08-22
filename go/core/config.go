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
			"slug": "terra",
			"version": "0.0.1",
			"target": "go",
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
						"short": "URL the user is redirected to upon unsuccessful authentication",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "auth_success_redirect_url",
						"short": "URL the user is redirected to upon successful authentication",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "auth_url",
						"short": "authentication URL the user must be redirected to in order to link their account",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in",
						"short": "a number in seconds depicting how long the url is valid for",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "language",
						"short": "Display language of the widget",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "providers",
						"short": "Comma separated list of providers to display on the device selection page.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reference_id",
						"short": "Identifier of the end user on your system, such as a user ID or email associated with them",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "session_id",
						"short": "Session ID for the widget authentication session",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "indicates that the request was successful",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "the widget URL the user must be redirected to in order to link their account",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"short": "User ID for the user being created",
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
						"short": "Whether the integration is enabled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "icon",
						"short": "URL for the provider's icon image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Display name of the integration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider",
						"short": "Identifier for the provider",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "setup",
						"short": "Indicates how the integration is set up",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "types",
						"short": "Indicates the types of data available through the provider",
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
						"short": "Specimen collection date (YYYY-MM-DD); omitted if not extracted.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "collection_time",
						"short": "Specimen collection time (HH:MM, 24-hour); omitted if not extracted.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "current_status",
						"req": true,
						"short": "Current status as a clean lowercase string (open enum), e.g.",
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
						"short": "Report-level panels that results reference by panel_id.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "patient_age_at_collection",
						"short": "Patient age in years; omitted if unknown.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "patient_sex",
						"short": "Clean lowercase string (open enum); omitted if unspecified.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reference_id",
						"short": "Your external reference; omitted if not set.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_date",
						"short": "Date printed on the report (YYYY-MM-DD); omitted if not extracted.",
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
						"short": "Time printed on the report (HH:MM, 24-hour); omitted if not extracted.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_type",
						"req": true,
						"short": "Report type as a clean lowercase string (open enum — handle unknown values gracefully).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "results",
						"short": "The layered biomarker results.",
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
						"short": "Retry count — 0 on the first attempt, incremented per retry.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "destination_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "destination_type",
						"short": "The destination's type (e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_error",
						"short": "Most recent delivery error; omitted when delivered.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "pending, delivered, or failed.",
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
						"short": "Set when the template could not be represented exactly on the provider.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"short": "Creation time (RFC 3339)",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "details",
						"short": "Full workout body (title, description, planned metrics, structured steps) fetched live from the provider.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "is_external",
						"short": "True when the workout was created on the provider side rather than through Terra.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "last_updated_at",
						"short": "Last update time (RFC 3339)",
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
						"short": "New scheduled date (YYYY-MM-DD)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "planned_workout_id",
						"short": "Terra identifier of the planned workout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider_workout_id",
						"short": "Identifier assigned by the provider, once pushed.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "workout_id",
						"short": "Identifier of the source template.",
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
						"short": "Description of the workout",
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
						"short": "Estimated calories burned",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "estimated_distance_meters",
						"short": "Estimated total distance in meters",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "estimated_duration_seconds",
						"short": "Estimated total duration in seconds",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ftp",
						"short": "Functional Threshold Power in watts",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "max_heart_rate",
						"short": "Maximum heart rate in BPM",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Name of the workout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "planned_date",
						"req": true,
						"short": "Date to schedule the workout on (YYYY-MM-DD)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pool_length_meters",
						"short": "Pool length in meters, for swim workouts",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "sport",
						"req": true,
						"short": "Sport a workout template targets.",
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
						"short": "Threshold heart rate in BPM",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "threshold_speed",
						"short": "Threshold speed in m/s",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "workout_id",
						"short": "Terra identifier of the stored template.",
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
