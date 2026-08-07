-- Typed models for the Terra SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Activity

---@class ActivityLoadMatch

---@class Athlete

---@class AthleteLoadMatch

---@class Authentication
---@field auth_failure_redirect_url? string
---@field auth_success_redirect_url? string
---@field auth_url? string
---@field expires_in? number
---@field language? string
---@field provider? string
---@field reference_id? string
---@field session_id? string
---@field status? string
---@field token? string
---@field url? string
---@field user_id? string

---@class AuthenticationCreateData
---@field auth_failure_redirect_url? string
---@field auth_success_redirect_url? string
---@field auth_url? string
---@field expires_in? number
---@field language? string
---@field provider? string
---@field reference_id? string
---@field session_id? string
---@field status? string
---@field token? string
---@field url? string
---@field user_id? string

---@class AuthenticationRemoveMatch
---@field auth_failure_redirect_url? string
---@field auth_success_redirect_url? string
---@field auth_url? string
---@field expires_in? number
---@field language? string
---@field provider? string
---@field reference_id? string
---@field session_id? string
---@field status? string
---@field token? string
---@field url? string
---@field user_id? string

---@class Body

---@class BodyLoadMatch

---@class BulkUserInfo

---@class BulkUserInfoCreateData

---@class Daily

---@class DailyLoadMatch

---@class Integration
---@field enabled? boolean
---@field icon? string
---@field name? string
---@field provider? string
---@field setup? string
---@field type? table

---@class IntegrationListMatch
---@field enabled? boolean
---@field icon? string
---@field name? string
---@field provider? string
---@field setup? string
---@field type? table

---@class LabReport
---@field collection_date? string
---@field collection_time? string
---@field current_status string
---@field file_count? number
---@field input_bytes? number
---@field lab_name? string
---@field output_bytes? number
---@field panel? table
---@field patient_age_at_collection? number
---@field patient_sex? string
---@field reference_id? string
---@field report_date? string
---@field report_locale? string
---@field report_notes? string
---@field report_time? string
---@field report_type string
---@field results? table
---@field results_count? number
---@field session_id string
---@field status_history? table
---@field updated_at? string
---@field upload_id? string
---@field uploaded_at? string

---@class LabReportLoadMatch
---@field id string

---@class LabReportListMatch
---@field collection_date? string
---@field collection_time? string
---@field current_status? string
---@field file_count? number
---@field input_bytes? number
---@field lab_name? string
---@field output_bytes? number
---@field panel? table
---@field patient_age_at_collection? number
---@field patient_sex? string
---@field reference_id? string
---@field report_date? string
---@field report_locale? string
---@field report_notes? string
---@field report_time? string
---@field report_type? string
---@field results? table
---@field results_count? number
---@field session_id? string
---@field status_history? table
---@field updated_at? string
---@field upload_id? string
---@field uploaded_at? string

---@class LabReportCreateData
---@field collection_date? string
---@field collection_time? string
---@field current_status string
---@field file_count? number
---@field input_bytes? number
---@field lab_name? string
---@field output_bytes? number
---@field panel? table
---@field patient_age_at_collection? number
---@field patient_sex? string
---@field reference_id? string
---@field report_date? string
---@field report_locale? string
---@field report_notes? string
---@field report_time? string
---@field report_type string
---@field results? table
---@field results_count? number
---@field session_id string
---@field status_history? table
---@field updated_at? string
---@field upload_id? string
---@field uploaded_at? string

---@class LabReportRemoveMatch
---@field id string

---@class LabReportDelivery
---@field attempt_count number
---@field destination_id string
---@field destination_type? string
---@field last_error? string
---@field status string

---@class LabReportDeliveryListMatch
---@field id string

---@class LabReportFile
---@field filename? string
---@field presigned_url string

---@class LabReportFileListMatch
---@field id string

---@class Menstruation

---@class MenstruationLoadMatch

---@class Nutrition

---@class NutritionLoadMatch

---@class PlannedWorkout
---@field athlete_metrics? any
---@field coercion_warnings? string
---@field created_at? any
---@field detail? any
---@field is_external? boolean
---@field last_updated_at? any
---@field planned_date? string
---@field planned_workout_id? string
---@field provider_workout_id? string
---@field workout_id? string

---@class PlannedWorkoutLoadMatch
---@field id number

---@class PlannedWorkoutListMatch
---@field athlete_metrics? any
---@field coercion_warnings? string
---@field created_at? any
---@field detail? any
---@field is_external? boolean
---@field last_updated_at? any
---@field planned_date? string
---@field planned_workout_id? string
---@field provider_workout_id? string
---@field workout_id? string

---@class PlannedWorkoutUpdateData
---@field id number
---@field athlete_metrics? any
---@field coercion_warnings? string
---@field created_at? any
---@field detail? any
---@field is_external? boolean
---@field last_updated_at? any
---@field planned_date? string
---@field planned_workout_id? string
---@field provider_workout_id? string
---@field workout_id? string

---@class Sleep

---@class SleepLoadMatch

---@class User

---@class UserLoadMatch

---@class Workout
---@field description? string
---@field environment? any
---@field estimated_calories? any
---@field estimated_distance_meters? any
---@field estimated_duration_seconds? any
---@field ftp? number
---@field max_heart_rate? number
---@field name string
---@field planned_date string
---@field pool_length_meters? any
---@field sport any
---@field status? string
---@field step_blocks table
---@field threshold_heart_rate? number
---@field threshold_speed? number
---@field workout_id? string

---@class WorkoutLoadMatch
---@field id number

---@class WorkoutListMatch
---@field description? string
---@field environment? any
---@field estimated_calories? any
---@field estimated_distance_meters? any
---@field estimated_duration_seconds? any
---@field ftp? number
---@field max_heart_rate? number
---@field name? string
---@field planned_date? string
---@field pool_length_meters? any
---@field sport? any
---@field status? string
---@field step_blocks? table
---@field threshold_heart_rate? number
---@field threshold_speed? number
---@field workout_id? string

---@class WorkoutCreateData
---@field description? string
---@field environment? any
---@field estimated_calories? any
---@field estimated_distance_meters? any
---@field estimated_duration_seconds? any
---@field ftp? number
---@field max_heart_rate? number
---@field name string
---@field planned_date string
---@field pool_length_meters? any
---@field sport any
---@field status? string
---@field step_blocks table
---@field threshold_heart_rate? number
---@field threshold_speed? number
---@field workout_id? string

---@class WorkoutRemoveMatch
---@field planned_workout_id? number
---@field id? number

local M = {}

return M
