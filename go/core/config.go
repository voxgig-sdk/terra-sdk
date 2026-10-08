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
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://access.tryterra.co/api/v2",
			"auth": map[string]any{
				"prefix": "",
				"name": "x-api-key",
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
								"kind": "http",
								"method": "GET",
								"orig": "/activity",
								"segments": []any{
									map[string]any{
										"lit": "activity",
									},
								},
								"parts": []any{
									"activity",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "with_sample",
											"orig": "with_samples",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"start_date",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/athlete",
								"segments": []any{
									map[string]any{
										"lit": "athlete",
									},
								},
								"parts": []any{
									"athlete",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Auth Failure Redirect Url",
						"type": "`$STRING`",
						"short": "URL the user is redirected to upon unsuccessful authentication",
					},
					map[string]any{
						"name": "auth_success_redirect_url",
						"title": "Auth Success Redirect Url",
						"type": "`$STRING`",
						"short": "URL the user is redirected to upon successful authentication",
					},
					map[string]any{
						"name": "auth_url",
						"title": "Auth Url",
						"type": "`$STRING`",
						"short": "authentication URL the user must be redirected to in order to link their account",
					},
					map[string]any{
						"name": "expires_in",
						"title": "Expires In",
						"type": "`$INTEGER`",
						"short": "a number in seconds depicting how long the url is valid for",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
						"short": "Display language of the widget",
					},
					map[string]any{
						"name": "providers",
						"title": "Providers",
						"type": "`$STRING`",
						"short": "Comma separated list of providers to display on the device selection page.",
					},
					map[string]any{
						"name": "reference_id",
						"title": "Reference Id",
						"type": "`$STRING`",
						"short": "Identifier of the end user on your system, such as a user ID or email associated with them",
					},
					map[string]any{
						"name": "session_id",
						"title": "Session Id",
						"type": "`$STRING`",
						"short": "Session ID for the widget authentication session",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "indicates that the request was successful",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "the widget URL the user must be redirected to in order to link their account",
					},
					map[string]any{
						"name": "user_id",
						"title": "User Id",
						"type": "`$STRING`",
						"short": "User ID for the user being created",
					},
				},
				"name": "authentication",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/auth/authenticateUser",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "authenticateUser",
									},
								},
								"parts": []any{
									"auth",
									"authenticateUser",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dev_id",
											"orig": "dev-id",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
											"example": "testingTerra",
										},
									},
									"query": []any{
										map[string]any{
											"name": "resource",
											"orig": "resource",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "FITBIT",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dev_id",
										"resource",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/auth/generateAuthToken",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "generateAuthToken",
									},
								},
								"parts": []any{
									"auth",
									"generateAuthToken",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/auth/generateWidgetSession",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "generateWidgetSession",
									},
								},
								"parts": []any{
									"auth",
									"generateWidgetSession",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/auth/deauthenticateUser",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "deauthenticateUser",
									},
								},
								"parts": []any{
									"auth",
									"deauthenticateUser",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/body",
								"segments": []any{
									map[string]any{
										"lit": "body",
									},
								},
								"parts": []any{
									"body",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "with_sample",
											"orig": "with_samples",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"start_date",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
				"fields": []any{
					map[string]any{
						"name": "bulk_user_infos",
						"title": "Bulk User Infos",
						"type": "`$ARRAY`",
						"short": "List of user IDs to get information for",
					},
				},
				"name": "bulk_user_info",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/bulkUserInfo",
								"segments": []any{
									map[string]any{
										"lit": "bulkUserInfo",
									},
								},
								"parts": []any{
									"bulkUserInfo",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata.bulk_user_infos`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"exist": []any{
										"bulk_user_infos",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/daily",
								"segments": []any{
									map[string]any{
										"lit": "daily",
									},
								},
								"parts": []any{
									"daily",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "with_sample",
											"orig": "with_samples",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"start_date",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "providers",
						"title": "Providers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "sdk_providers",
						"title": "Sdk Providers",
						"type": "`$ARRAY`",
						"short": "Providers available through Terra's mobile SDKs rather than cloud connections",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
				},
				"name": "integration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/integrations",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
								},
								"parts": []any{
									"integrations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/integrations/detailed",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
									map[string]any{
										"lit": "detailed",
									},
								},
								"parts": []any{
									"integrations",
									"detailed",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.providers`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sdk",
											"orig": "sdk",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "detailed",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Collection Date",
						"type": "`$STRING`",
						"short": "Specimen collection date (YYYY-MM-DD); omitted if not extracted.",
					},
					map[string]any{
						"name": "collection_time",
						"title": "Collection Time",
						"type": "`$STRING`",
						"short": "Specimen collection time (HH:MM, 24-hour); omitted if not extracted.",
					},
					map[string]any{
						"name": "current_status",
						"title": "Current Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Current status as a clean lowercase string (open enum), e.g.",
					},
					map[string]any{
						"name": "file_count",
						"title": "File Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "input_bytes",
						"title": "Input Bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lab_name",
						"title": "Lab Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "output_bytes",
						"title": "Output Bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "panels",
						"title": "Panels",
						"type": "`$ARRAY`",
						"short": "Report-level panels that results reference by panel_id.",
					},
					map[string]any{
						"name": "patient_age_at_collection",
						"title": "Patient Age At Collection",
						"type": "`$INTEGER`",
						"short": "Patient age in years; omitted if unknown.",
					},
					map[string]any{
						"name": "patient_sex",
						"title": "Patient Sex",
						"type": "`$STRING`",
						"short": "Clean lowercase string (open enum); omitted if unspecified.",
					},
					map[string]any{
						"name": "reference_id",
						"title": "Reference Id",
						"type": "`$STRING`",
						"short": "Your external reference; omitted if not set.",
					},
					map[string]any{
						"name": "report_date",
						"title": "Report Date",
						"type": "`$STRING`",
						"short": "Date printed on the report (YYYY-MM-DD); omitted if not extracted.",
					},
					map[string]any{
						"name": "report_locale",
						"title": "Report Locale",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_notes",
						"title": "Report Notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "report_time",
						"title": "Report Time",
						"type": "`$STRING`",
						"short": "Time printed on the report (HH:MM, 24-hour); omitted if not extracted.",
					},
					map[string]any{
						"name": "report_type",
						"title": "Report Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Report type as a clean lowercase string (open enum — handle unknown values gracefully).",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$ARRAY`",
						"short": "The layered biomarker results.",
					},
					map[string]any{
						"name": "results_count",
						"title": "Results Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "session_id",
						"title": "Session Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status_history",
						"title": "Status History",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "upload_id",
						"title": "Upload Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Durable correlation key for the upload; every resulting session and webhook carries it.",
					},
					map[string]any{
						"name": "uploaded_at",
						"title": "Uploaded At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "lab_report",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/lab-reports",
								"segments": []any{
									map[string]any{
										"lit": "lab-reports",
									},
								},
								"parts": []any{
									"lab-reports",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "reference_id",
											"orig": "reference_id",
											"type": "`$STRING`",
											"kind": "query",
											"example": "patient_456",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"binary": true,
											"name": "file",
										},
									},
									"kind": "multipart",
									"media": "multipart/form-data",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports",
								"segments": []any{
									map[string]any{
										"lit": "lab-reports",
									},
								},
								"parts": []any{
									"lab-reports",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sessions`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "reference_id",
											"orig": "reference_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "report_date_from",
											"orig": "report_date_from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "report_date_to",
											"orig": "report_date_to",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "upload_id",
											"orig": "upload_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "uploaded_at_from",
											"orig": "uploaded_at_from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "uploaded_at_to",
											"orig": "uploaded_at_to",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports/{session_id}",
								"segments": []any{
									map[string]any{
										"lit": "lab-reports",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"lab-reports",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"session_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "297405620317847552",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/lab-reports/{session_id}",
								"segments": []any{
									map[string]any{
										"lit": "lab-reports",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"lab-reports",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"session_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "297405620317847552",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Attempt Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Retry count — 0 on the first attempt, incremented per retry.",
					},
					map[string]any{
						"name": "destination_id",
						"title": "Destination Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "destination_type",
						"title": "Destination Type",
						"type": "`$STRING`",
						"short": "The destination's type (e.g.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_error",
						"title": "Last Error",
						"type": "`$STRING`",
						"short": "Most recent delivery error; omitted when delivered.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "pending, delivered, or failed.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "lab_report_delivery",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports/{session_id}/deliveries",
								"segments": []any{
									map[string]any{
										"lit": "lab-reports",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "deliveries",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.deliveries`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "297405620317847552",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Filename",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "presigned_url",
						"title": "Presigned Url",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "lab_report_file",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lab-reports/{session_id}/files",
								"segments": []any{
									map[string]any{
										"lit": "lab-reports",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "files",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "297405620317847552",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/menstruation",
								"segments": []any{
									map[string]any{
										"lit": "menstruation",
									},
								},
								"parts": []any{
									"menstruation",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "with_sample",
											"orig": "with_samples",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"start_date",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/nutrition",
								"segments": []any{
									map[string]any{
										"lit": "nutrition",
									},
								},
								"parts": []any{
									"nutrition",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "with_sample",
											"orig": "with_samples",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"start_date",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Athlete Metrics",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "coercion_warnings",
						"title": "Coercion Warnings",
						"type": "`$STRING`",
						"short": "Set when the template could not be represented exactly on the provider.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$ANY`",
						"short": "Creation time (RFC 3339)",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$ANY`",
						"short": "Full workout body (title, description, planned metrics, structured steps) fetched live from the provider.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_external",
						"title": "Is External",
						"type": "`$BOOLEAN`",
						"short": "True when the workout was created on the provider side rather than through Terra.",
					},
					map[string]any{
						"name": "last_updated_at",
						"title": "Last Updated At",
						"type": "`$ANY`",
						"short": "Last update time (RFC 3339)",
					},
					map[string]any{
						"name": "planned_date",
						"title": "Planned Date",
						"type": "`$STRING`",
						"op": map[string]any{
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "New scheduled date (YYYY-MM-DD)",
						"format": "date",
					},
					map[string]any{
						"name": "planned_workout_id",
						"title": "Planned Workout Id",
						"type": "`$STRING`",
						"short": "Terra identifier of the planned workout",
					},
					map[string]any{
						"name": "provider_workout_id",
						"title": "Provider Workout Id",
						"type": "`$STRING`",
						"short": "Identifier assigned by the provider, once pushed.",
					},
					map[string]any{
						"name": "workout_id",
						"title": "Workout Id",
						"type": "`$STRING`",
						"short": "Identifier of the source template.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "planned_workout",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/plannedWorkouts",
								"segments": []any{
									map[string]any{
										"lit": "plannedWorkouts",
									},
								},
								"parts": []any{
									"plannedWorkouts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/plannedWorkouts/{planned_workout_id}",
								"segments": []any{
									map[string]any{
										"lit": "plannedWorkouts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"plannedWorkouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"planned_workout_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "planned_workout_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/plannedWorkouts/{planned_workout_id}",
								"segments": []any{
									map[string]any{
										"lit": "plannedWorkouts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"plannedWorkouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"planned_workout_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "planned_workout_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/sleep",
								"segments": []any{
									map[string]any{
										"lit": "sleep",
									},
								},
								"parts": []any{
									"sleep",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to_webhook",
											"orig": "to_webhook",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "with_sample",
											"orig": "with_samples",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"start_date",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/subscriptions",
								"segments": []any{
									map[string]any{
										"lit": "subscriptions",
									},
								},
								"parts": []any{
									"subscriptions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 500,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/userInfo",
								"segments": []any{
									map[string]any{
										"lit": "userInfo",
									},
								},
								"parts": []any{
									"userInfo",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "reference_id",
											"orig": "reference_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the workout",
					},
					map[string]any{
						"name": "environment",
						"title": "Environment",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "estimated_calories",
						"title": "Estimated Calories",
						"type": "`$ANY`",
						"short": "Estimated calories burned",
					},
					map[string]any{
						"name": "estimated_distance_meters",
						"title": "Estimated Distance Meters",
						"type": "`$ANY`",
						"short": "Estimated total distance in meters",
					},
					map[string]any{
						"name": "estimated_duration_seconds",
						"title": "Estimated Duration Seconds",
						"type": "`$ANY`",
						"short": "Estimated total duration in seconds",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the workout",
					},
					map[string]any{
						"name": "pool_length_meters",
						"title": "Pool Length Meters",
						"type": "`$ANY`",
						"short": "Pool length in meters, for swim workouts",
					},
					map[string]any{
						"name": "sport",
						"title": "Sport",
						"type": "`$ANY`",
						"req": true,
						"short": "Sport a workout template targets.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "step_blocks",
						"title": "Step Blocks",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "workout_id",
						"title": "Workout Id",
						"type": "`$STRING`",
						"short": "Terra identifier of the stored template.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "workout",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/workouts/{workout_id}/plan",
								"segments": []any{
									map[string]any{
										"lit": "workouts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "plan",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workout_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "plan",
									"exist": []any{
										"id",
										"user_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/workouts",
								"segments": []any{
									map[string]any{
										"lit": "workouts",
									},
								},
								"parts": []any{
									"workouts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/workouts",
								"segments": []any{
									map[string]any{
										"lit": "workouts",
									},
								},
								"parts": []any{
									"workouts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/workouts/{workout_id}",
								"segments": []any{
									map[string]any{
										"lit": "workouts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"workouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workout_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workout_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/plannedWorkouts/{planned_workout_id}",
								"segments": []any{
									map[string]any{
										"lit": "plannedWorkouts",
									},
									map[string]any{
										"var": "planned_workout_id",
									},
								},
								"parts": []any{
									"plannedWorkouts",
									"{planned_workout_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "planned_workout_id",
											"orig": "planned_workout_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"planned_workout_id",
										"user_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/workouts/{workout_id}",
								"segments": []any{
									map[string]any{
										"lit": "workouts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"workouts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"workout_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "workout_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.planned_workout",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
