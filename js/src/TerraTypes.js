// Typed models for the Terra SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Activity
 */

/**
 * @typedef {Object} ActivityLoadMatch
 */

/**
 * @typedef {Object} Athlete
 */

/**
 * @typedef {Object} AthleteLoadMatch
 */

/**
 * @typedef {Object} Authentication
 * @property {string} [auth_failure_redirect_url]
 * @property {string} [auth_success_redirect_url]
 * @property {string} [auth_url]
 * @property {number} [expires_in]
 * @property {string} [language]
 * @property {string} [provider]
 * @property {string} [reference_id]
 * @property {string} [session_id]
 * @property {string} [status]
 * @property {string} [token]
 * @property {string} [url]
 * @property {string} [user_id]
 */

/**
 * @typedef {Object} AuthenticationCreateData
 * @property {string} [auth_failure_redirect_url]
 * @property {string} [auth_success_redirect_url]
 * @property {string} [auth_url]
 * @property {number} [expires_in]
 * @property {string} [language]
 * @property {string} [provider]
 * @property {string} [reference_id]
 * @property {string} [session_id]
 * @property {string} [status]
 * @property {string} [token]
 * @property {string} [url]
 * @property {string} [user_id]
 */

/**
 * @typedef {Object} AuthenticationRemoveMatch
 * @property {string} [auth_failure_redirect_url]
 * @property {string} [auth_success_redirect_url]
 * @property {string} [auth_url]
 * @property {number} [expires_in]
 * @property {string} [language]
 * @property {string} [provider]
 * @property {string} [reference_id]
 * @property {string} [session_id]
 * @property {string} [status]
 * @property {string} [token]
 * @property {string} [url]
 * @property {string} [user_id]
 */

/**
 * @typedef {Object} Body
 */

/**
 * @typedef {Object} BodyLoadMatch
 */

/**
 * @typedef {Object} BulkUserInfo
 */

/**
 * @typedef {Object} BulkUserInfoCreateData
 */

/**
 * @typedef {Object} Daily
 */

/**
 * @typedef {Object} DailyLoadMatch
 */

/**
 * @typedef {Object} Integration
 * @property {boolean} [enabled]
 * @property {string} [icon]
 * @property {string} [name]
 * @property {string} [provider]
 * @property {string} [setup]
 * @property {Object} [type]
 */

/**
 * @typedef {Object} IntegrationListMatch
 * @property {boolean} [enabled]
 * @property {string} [icon]
 * @property {string} [name]
 * @property {string} [provider]
 * @property {string} [setup]
 * @property {Object} [type]
 */

/**
 * @typedef {Object} LabReport
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} current_status
 * @property {number} [file_count]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panel]
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
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} [current_status]
 * @property {number} [file_count]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panel]
 * @property {number} [patient_age_at_collection]
 * @property {string} [patient_sex]
 * @property {string} [reference_id]
 * @property {string} [report_date]
 * @property {string} [report_locale]
 * @property {string} [report_notes]
 * @property {string} [report_time]
 * @property {string} [report_type]
 * @property {Array} [results]
 * @property {number} [results_count]
 * @property {string} [session_id]
 * @property {Array} [status_history]
 * @property {string} [updated_at]
 * @property {string} [upload_id]
 * @property {string} [uploaded_at]
 */

/**
 * @typedef {Object} LabReportCreateData
 * @property {string} [collection_date]
 * @property {string} [collection_time]
 * @property {string} current_status
 * @property {number} [file_count]
 * @property {number} [input_bytes]
 * @property {string} [lab_name]
 * @property {number} [output_bytes]
 * @property {Array} [panel]
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
 * @typedef {Object} LabReportRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} LabReportDelivery
 * @property {number} attempt_count
 * @property {string} destination_id
 * @property {string} [destination_type]
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
 * @property {string} presigned_url
 */

/**
 * @typedef {Object} LabReportFileListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Menstruation
 */

/**
 * @typedef {Object} MenstruationLoadMatch
 */

/**
 * @typedef {Object} Nutrition
 */

/**
 * @typedef {Object} NutritionLoadMatch
 */

/**
 * @typedef {Object} PlannedWorkout
 * @property {*} [athlete_metrics]
 * @property {string} [coercion_warnings]
 * @property {*} [created_at]
 * @property {*} [detail]
 * @property {boolean} [is_external]
 * @property {*} [last_updated_at]
 * @property {string} [planned_date]
 * @property {string} [planned_workout_id]
 * @property {string} [provider_workout_id]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} PlannedWorkoutLoadMatch
 * @property {number} id
 */

/**
 * @typedef {Object} PlannedWorkoutListMatch
 * @property {*} [athlete_metrics]
 * @property {string} [coercion_warnings]
 * @property {*} [created_at]
 * @property {*} [detail]
 * @property {boolean} [is_external]
 * @property {*} [last_updated_at]
 * @property {string} [planned_date]
 * @property {string} [planned_workout_id]
 * @property {string} [provider_workout_id]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} PlannedWorkoutUpdateData
 * @property {number} id
 * @property {*} [athlete_metrics]
 * @property {string} [coercion_warnings]
 * @property {*} [created_at]
 * @property {*} [detail]
 * @property {boolean} [is_external]
 * @property {*} [last_updated_at]
 * @property {string} [planned_date]
 * @property {string} [planned_workout_id]
 * @property {string} [provider_workout_id]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} Sleep
 */

/**
 * @typedef {Object} SleepLoadMatch
 */

/**
 * @typedef {Object} User
 */

/**
 * @typedef {Object} UserLoadMatch
 */

/**
 * @typedef {Object} Workout
 * @property {string} [description]
 * @property {*} [environment]
 * @property {*} [estimated_calories]
 * @property {*} [estimated_distance_meters]
 * @property {*} [estimated_duration_seconds]
 * @property {number} [ftp]
 * @property {number} [max_heart_rate]
 * @property {string} name
 * @property {string} planned_date
 * @property {*} [pool_length_meters]
 * @property {*} sport
 * @property {string} [status]
 * @property {Array} step_blocks
 * @property {number} [threshold_heart_rate]
 * @property {number} [threshold_speed]
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
 * @property {number} [ftp]
 * @property {number} [max_heart_rate]
 * @property {string} [name]
 * @property {string} [planned_date]
 * @property {*} [pool_length_meters]
 * @property {*} [sport]
 * @property {string} [status]
 * @property {Array} [step_blocks]
 * @property {number} [threshold_heart_rate]
 * @property {number} [threshold_speed]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} WorkoutCreateData
 * @property {string} [description]
 * @property {*} [environment]
 * @property {*} [estimated_calories]
 * @property {*} [estimated_distance_meters]
 * @property {*} [estimated_duration_seconds]
 * @property {number} [ftp]
 * @property {number} [max_heart_rate]
 * @property {string} name
 * @property {string} planned_date
 * @property {*} [pool_length_meters]
 * @property {*} sport
 * @property {string} [status]
 * @property {Array} step_blocks
 * @property {number} [threshold_heart_rate]
 * @property {number} [threshold_speed]
 * @property {string} [workout_id]
 */

/**
 * @typedef {Object} WorkoutRemoveMatch
 * @property {number} [planned_workout_id]
 * @property {number} [id]
 */

