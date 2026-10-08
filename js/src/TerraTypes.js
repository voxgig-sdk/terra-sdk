// Typed models for the Terra SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Activity
 */

/**
 * @typedef {Object} ActivityLoadMatch
 * @property {*} [end_date]
 * @property {*} start_date
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 * @property {boolean} [with_sample]
 */

/**
 * @typedef {Object} Athlete
 */

/**
 * @typedef {Object} AthleteLoadMatch
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 */

/**
 * @typedef {Object} Authentication
 * @property {string} [apple_app_url]
 * @property {string} [auth_failure_redirect_url]
 * @property {string} [auth_success_redirect_url]
 * @property {string} [auth_url]
 * @property {boolean} [bypass_feedback]
 * @property {Array} [connected_uids]
 * @property {number} [expires_in]
 * @property {string} [language]
 * @property {boolean} [multi_auth]
 * @property {string} [providers]
 * @property {string} [reference_id]
 * @property {string} [samsung_app_url]
 * @property {string} [sdk_app]
 * @property {string} [session_id]
 * @property {boolean} [show_disconnect]
 * @property {string} [status]
 * @property {string} [token]
 * @property {string} [url]
 * @property {boolean} [use_terra_avengers_app]
 * @property {string} [user_id]
 * @property {Array} [warnings]
 */

/**
 * @typedef {Object} AuthenticationCreateData
 * @property {string} resource
 * @property {string} [apple_app_url]
 * @property {string} [auth_failure_redirect_url]
 * @property {string} [auth_success_redirect_url]
 * @property {string} [auth_url]
 * @property {boolean} [bypass_feedback]
 * @property {Array} [connected_uids]
 * @property {number} [expires_in]
 * @property {string} [language]
 * @property {boolean} [multi_auth]
 * @property {string} [providers]
 * @property {string} [reference_id]
 * @property {string} [samsung_app_url]
 * @property {string} [sdk_app]
 * @property {string} [session_id]
 * @property {boolean} [show_disconnect]
 * @property {string} [status]
 * @property {string} [token]
 * @property {string} [url]
 * @property {boolean} [use_terra_avengers_app]
 * @property {string} [user_id]
 * @property {Array} [warnings]
 */

/**
 * @typedef {Object} AuthenticationRemoveMatch
 * @property {string} user_id
 */

/**
 * @typedef {Object} Body
 */

/**
 * @typedef {Object} BodyLoadMatch
 * @property {*} [end_date]
 * @property {*} start_date
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 * @property {boolean} [with_sample]
 */

/**
 * @typedef {Object} BulkUserInfo
 * @property {Array} [bulk_user_infos]
 */

/**
 * @typedef {Object} BulkUserInfoCreateData
 * @property {Array} [bulk_user_infos]
 */

/**
 * @typedef {Object} Daily
 */

/**
 * @typedef {Object} DailyLoadMatch
 * @property {*} [end_date]
 * @property {*} start_date
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 * @property {boolean} [with_sample]
 */

/**
 * @typedef {Object} Integration
 * @property {Array} [providers]
 * @property {Array} [sdk_providers]
 * @property {string} [status]
 */

/**
 * @typedef {Object} IntegrationListMatch
 * @property {Array} [providers]
 * @property {Array} [sdk_providers]
 * @property {string} [status]
 */

/**
 * @typedef {Object} LabReport
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} current_status
 * @property {number} [file_count]
 * @property {string} [id]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panels]
 * @property {number} [patient_age_at_collection]
 * @property {string} [patient_sex]
 * @property {string} [reference_id]
 * @property {string} [report_date]
 * @property {string} [report_locale]
 * @property {string} [report_notes]
 * @property {string} [report_time]
 * @property {string} report_type
 * @property {Array} [results]
 * @property {number} [results_count]
 * @property {string} session_id
 * @property {Array} [status_history]
 * @property {string} [updated_at]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at]
 */

/**
 * @typedef {Object} LabReportLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} LabReportListMatch
 * @property {string} [reference_id]
 * @property {string} [report_date_from]
 * @property {string} [report_date_to]
 * @property {string} [report_type]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at_from]
 * @property {string} [uploaded_at_to]
 */

/**
 * @typedef {Object} LabReportCreateData
 * @property {string} [reference_id]
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} current_status
 * @property {number} [file_count]
 * @property {string} [id]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panels]
 * @property {number} [patient_age_at_collection]
 * @property {string} [patient_sex]
 * @property {string} [report_date]
 * @property {string} [report_locale]
 * @property {string} [report_notes]
 * @property {string} [report_time]
 * @property {string} report_type
 * @property {Array} [results]
 * @property {number} [results_count]
 * @property {string} session_id
 * @property {Array} [status_history]
 * @property {string} [updated_at]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at]
 */

/**
 * @typedef {Object} LabReportRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} LabReportDelivery
 * @property {number} attempt_count
 * @property {string} destination_id
 * @property {string} [destination_type]
 * @property {string} [id]
 * @property {string} [last_error]
 * @property {string} status
 */

/**
 * @typedef {Object} LabReportDeliveryListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} LabReportFile
 * @property {string} [filename]
 * @property {string} [id]
 * @property {string} presigned_url
 */

/**
 * @typedef {Object} LabReportFileListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} LabReportSession
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} current_status
 * @property {number} [file_count]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panels]
 * @property {number} [patient_age_at_collection]
 * @property {string} [patient_sex]
 * @property {string} [reference_id]
 * @property {string} [report_date]
 * @property {string} [report_locale]
 * @property {string} [report_notes]
 * @property {string} [report_time]
 * @property {string} report_type
 * @property {Array} [results]
 * @property {number} [results_count]
 * @property {string} session_id
 * @property {Array} [status_history]
 * @property {string} [updated_at]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at]
 */

/**
 * @typedef {Object} LabReportSessionLoadMatch
 * @property {string} session_id
 */

/**
 * @typedef {Object} LabReportSessionListMatch
 * @property {string} [reference_id]
 * @property {string} [report_date_from]
 * @property {string} [report_date_to]
 * @property {string} [report_type]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at_from]
 * @property {string} [uploaded_at_to]
 */

/**
 * @typedef {Object} LabReportSessionCreateData
 * @property {string} [reference_id]
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} current_status
 * @property {number} [file_count]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panels]
 * @property {number} [patient_age_at_collection]
 * @property {string} [patient_sex]
 * @property {string} [report_date]
 * @property {string} [report_locale]
 * @property {string} [report_notes]
 * @property {string} [report_time]
 * @property {string} report_type
 * @property {Array} [results]
 * @property {number} [results_count]
 * @property {string} session_id
 * @property {Array} [status_history]
 * @property {string} [updated_at]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at]
 */

/**
 * @typedef {Object} Menstruation
 */

/**
 * @typedef {Object} MenstruationLoadMatch
 * @property {*} [end_date]
 * @property {*} start_date
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 * @property {boolean} [with_sample]
 */

/**
 * @typedef {Object} Nutrition
 */

/**
 * @typedef {Object} NutritionLoadMatch
 * @property {*} [end_date]
 * @property {*} start_date
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 * @property {boolean} [with_sample]
 */

/**
 * @typedef {Object} PlannedWorkout
 * @property {*} athlete_metrics
 * @property {string} [coercion_warnings]
 * @property {*} [completed_at]
 * @property {*} created_at
 * @property {*} details
 * @property {string} [id]
 * @property {boolean} [is_external]
 * @property {*} last_updated_at
 * @property {string} [planned_date]
 * @property {string} [planned_workout_id]
 * @property {string} [provider_workout_id]
 * @property {Array} [warnings]
 * @property {*} [workout]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} PlannedWorkoutLoadMatch
 * @property {number} id
 * @property {string} user_id
 */

/**
 * @typedef {Object} PlannedWorkoutListMatch
 * @property {string} [end_date]
 * @property {string} [start_date]
 * @property {string} user_id
 */

/**
 * @typedef {Object} PlannedWorkoutUpdateData
 * @property {number} id
 * @property {string} user_id
 * @property {*} [athlete_metrics]
 * @property {string} [coercion_warnings]
 * @property {*} [completed_at]
 * @property {*} [created_at]
 * @property {*} [details]
 * @property {boolean} [is_external]
 * @property {*} [last_updated_at]
 * @property {string} [planned_date]
 * @property {string} [planned_workout_id]
 * @property {string} [provider_workout_id]
 * @property {Array} [warnings]
 * @property {*} [workout]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} Sleep
 */

/**
 * @typedef {Object} SleepLoadMatch
 * @property {*} [end_date]
 * @property {*} start_date
 * @property {boolean} [to_webhook]
 * @property {string} user_id
 * @property {boolean} [with_sample]
 */

/**
 * @typedef {Object} User
 * @property {number} [max_page]
 * @property {number|null} [next]
 * @property {Array} [results]
 * @property {string} [status]
 * @property {Array} [users]
 */

/**
 * @typedef {Object} UserLoadMatch
 * @property {string} [reference_id]
 * @property {string} [user_id]
 */

/**
 * @typedef {Object} UserListMatch
 * @property {number} [page]
 * @property {number} [per_page]
 */

/**
 * @typedef {Object} Workout
 * @property {string} [description]
 * @property {*} [environment]
 * @property {*} [estimated_calories]
 * @property {*} [estimated_distance_meters]
 * @property {*} [estimated_duration_seconds]
 * @property {*} [estimated_intensity_factor]
 * @property {*} [estimated_tss]
 * @property {string} [id]
 * @property {string} name
 * @property {*} [pool_length_meters]
 * @property {*} sport
 * @property {string} [status]
 * @property {Array} step_blocks
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} WorkoutLoadMatch
 * @property {number} id
 */

/**
 * @typedef {Object} WorkoutListMatch
 * @property {string} [description]
 * @property {*} [environment]
 * @property {*} [estimated_calories]
 * @property {*} [estimated_distance_meters]
 * @property {*} [estimated_duration_seconds]
 * @property {*} [estimated_intensity_factor]
 * @property {*} [estimated_tss]
 * @property {string} [id]
 * @property {string} [name]
 * @property {*} [pool_length_meters]
 * @property {*} [sport]
 * @property {string} [status]
 * @property {Array} [step_blocks]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} WorkoutCreateData
 * @property {string} [description]
 * @property {*} [environment]
 * @property {*} [estimated_calories]
 * @property {*} [estimated_distance_meters]
 * @property {*} [estimated_duration_seconds]
 * @property {*} [estimated_intensity_factor]
 * @property {*} [estimated_tss]
 * @property {string} [id]
 * @property {string} name
 * @property {*} [pool_length_meters]
 * @property {*} sport
 * @property {string} [status]
 * @property {Array} step_blocks
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} WorkoutRemoveMatch
 * @property {number} planned_workout_id
 * @property {string} user_id
 */

