# frozen_string_literal: true

# Typed models for the Terra SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Activity entity data model.
class Activity
end

# Request payload for Activity#load.
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] start_date
#   @return [Object]
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] with_sample
#   @return [Boolean, nil]
ActivityLoadMatch = Struct.new(
  :end_date,
  :start_date,
  :to_webhook,
  :user_id,
  :with_sample,
  keyword_init: true
)

# Athlete entity data model.
class Athlete
end

# Request payload for Athlete#load.
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
AthleteLoadMatch = Struct.new(
  :to_webhook,
  :user_id,
  keyword_init: true
)

# Authentication entity data model.
#
# @!attribute [rw] auth_failure_redirect_url
#   @return [String, nil]
#
# @!attribute [rw] auth_success_redirect_url
#   @return [String, nil]
#
# @!attribute [rw] auth_url
#   @return [String, nil]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] sdk_app
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
Authentication = Struct.new(
  :auth_failure_redirect_url,
  :auth_success_redirect_url,
  :auth_url,
  :expires_in,
  :language,
  :reference_id,
  :sdk_app,
  :status,
  :token,
  :user_id,
  keyword_init: true
)

# Request payload for Authentication#create.
#
# @!attribute [rw] resource
#   @return [String]
#
# @!attribute [rw] auth_failure_redirect_url
#   @return [String, nil]
#
# @!attribute [rw] auth_success_redirect_url
#   @return [String, nil]
#
# @!attribute [rw] auth_url
#   @return [String, nil]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] sdk_app
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
AuthenticationCreateData = Struct.new(
  :resource,
  :auth_failure_redirect_url,
  :auth_success_redirect_url,
  :auth_url,
  :expires_in,
  :language,
  :reference_id,
  :sdk_app,
  :status,
  :token,
  :user_id,
  keyword_init: true
)

# Request payload for Authentication#remove.
#
# @!attribute [rw] user_id
#   @return [String]
AuthenticationRemoveMatch = Struct.new(
  :user_id,
  keyword_init: true
)

# Body entity data model.
class Body
end

# Request payload for Body#load.
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] start_date
#   @return [Object]
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] with_sample
#   @return [Boolean, nil]
BodyLoadMatch = Struct.new(
  :end_date,
  :start_date,
  :to_webhook,
  :user_id,
  :with_sample,
  keyword_init: true
)

# BulkUserInfo entity data model.
#
# @!attribute [rw] bulk_user_infos
#   @return [Array, nil]
BulkUserInfo = Struct.new(
  :bulk_user_infos,
  keyword_init: true
)

# Request payload for BulkUserInfo#create.
#
# @!attribute [rw] bulk_user_infos
#   @return [Array, nil]
BulkUserInfoCreateData = Struct.new(
  :bulk_user_infos,
  keyword_init: true
)

# Daily entity data model.
class Daily
end

# Request payload for Daily#load.
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] start_date
#   @return [Object]
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] with_sample
#   @return [Boolean, nil]
DailyLoadMatch = Struct.new(
  :end_date,
  :start_date,
  :to_webhook,
  :user_id,
  :with_sample,
  keyword_init: true
)

# Integration entity data model.
#
# @!attribute [rw] providers
#   @return [Array, nil]
#
# @!attribute [rw] sdk_providers
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Integration = Struct.new(
  :providers,
  :sdk_providers,
  :status,
  keyword_init: true
)

# Request payload for Integration#list.
#
# @!attribute [rw] providers
#   @return [Array, nil]
#
# @!attribute [rw] sdk_providers
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
IntegrationListMatch = Struct.new(
  :providers,
  :sdk_providers,
  :status,
  keyword_init: true
)

# LabReport entity data model.
#
# @!attribute [rw] current_status
#   @return [String]
#
# @!attribute [rw] file
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] upload_id
#   @return [String]
LabReport = Struct.new(
  :current_status,
  :file,
  :id,
  :upload_id,
  keyword_init: true
)

# Request payload for LabReport#load.
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] report_date_from
#   @return [String, nil]
#
# @!attribute [rw] report_date_to
#   @return [String, nil]
#
# @!attribute [rw] report_type
#   @return [String, nil]
#
# @!attribute [rw] upload_id
#   @return [String, nil]
#
# @!attribute [rw] uploaded_at_from
#   @return [String, nil]
#
# @!attribute [rw] uploaded_at_to
#   @return [String, nil]
LabReportLoadMatch = Struct.new(
  :cursor,
  :limit,
  :reference_id,
  :report_date_from,
  :report_date_to,
  :report_type,
  :upload_id,
  :uploaded_at_from,
  :uploaded_at_to,
  keyword_init: true
)

# Request payload for LabReport#create.
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] current_status
#   @return [String]
#
# @!attribute [rw] file
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] upload_id
#   @return [String]
LabReportCreateData = Struct.new(
  :reference_id,
  :current_status,
  :file,
  :id,
  :upload_id,
  keyword_init: true
)

# Request payload for LabReport#remove.
#
# @!attribute [rw] id
#   @return [String]
LabReportRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# LabReportDelivery entity data model.
#
# @!attribute [rw] attempt_count
#   @return [Integer]
#
# @!attribute [rw] destination_id
#   @return [String]
#
# @!attribute [rw] destination_type
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
LabReportDelivery = Struct.new(
  :attempt_count,
  :destination_id,
  :destination_type,
  :id,
  :last_error,
  :status,
  keyword_init: true
)

# Request payload for LabReportDelivery#list.
#
# @!attribute [rw] id
#   @return [String]
LabReportDeliveryListMatch = Struct.new(
  :id,
  keyword_init: true
)

# LabReportFile entity data model.
#
# @!attribute [rw] content_type
#   @return [String, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] presigned_url
#   @return [String]
LabReportFile = Struct.new(
  :content_type,
  :filename,
  :id,
  :presigned_url,
  keyword_init: true
)

# Request payload for LabReportFile#list.
#
# @!attribute [rw] id
#   @return [String]
LabReportFileListMatch = Struct.new(
  :id,
  keyword_init: true
)

# LabReportSession entity data model.
#
# @!attribute [rw] collection_date
#   @return [String, nil]
#
# @!attribute [rw] collection_time
#   @return [String, nil]
#
# @!attribute [rw] current_status
#   @return [String]
#
# @!attribute [rw] error
#   @return [Hash]
#
# @!attribute [rw] file_count
#   @return [Integer, nil]
#
# @!attribute [rw] input_bytes
#   @return [Integer, nil]
#
# @!attribute [rw] lab_name
#   @return [String, nil]
#
# @!attribute [rw] output_bytes
#   @return [Integer, nil]
#
# @!attribute [rw] panels
#   @return [Array, nil]
#
# @!attribute [rw] patient_age_at_collection
#   @return [Integer, nil]
#
# @!attribute [rw] patient_sex
#   @return [String, nil]
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] report_date
#   @return [String, nil]
#
# @!attribute [rw] report_locale
#   @return [String, nil]
#
# @!attribute [rw] report_notes
#   @return [String, nil]
#
# @!attribute [rw] report_time
#   @return [String, nil]
#
# @!attribute [rw] report_type
#   @return [String]
#
# @!attribute [rw] results
#   @return [Array, nil]
#
# @!attribute [rw] results_count
#   @return [Integer, nil]
#
# @!attribute [rw] session_id
#   @return [String]
#
# @!attribute [rw] status_history
#   @return [Array, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upload_id
#   @return [String, nil]
#
# @!attribute [rw] uploaded_at
#   @return [String, nil]
LabReportSession = Struct.new(
  :collection_date,
  :collection_time,
  :current_status,
  :error,
  :file_count,
  :input_bytes,
  :lab_name,
  :output_bytes,
  :panels,
  :patient_age_at_collection,
  :patient_sex,
  :reference_id,
  :report_date,
  :report_locale,
  :report_notes,
  :report_time,
  :report_type,
  :results,
  :results_count,
  :session_id,
  :status_history,
  :updated_at,
  :upload_id,
  :uploaded_at,
  keyword_init: true
)

# Request payload for LabReportSession#load.
#
# @!attribute [rw] session_id
#   @return [String]
LabReportSessionLoadMatch = Struct.new(
  :session_id,
  keyword_init: true
)

# Request payload for LabReportSession#create.
#
# @!attribute [rw] session_id
#   @return [String]
#
# @!attribute [rw] legacy_format
#   @return [Boolean, nil]
#
# @!attribute [rw] collection_date
#   @return [String, nil]
#
# @!attribute [rw] collection_time
#   @return [String, nil]
#
# @!attribute [rw] current_status
#   @return [String]
#
# @!attribute [rw] error
#   @return [Hash]
#
# @!attribute [rw] file_count
#   @return [Integer, nil]
#
# @!attribute [rw] input_bytes
#   @return [Integer, nil]
#
# @!attribute [rw] lab_name
#   @return [String, nil]
#
# @!attribute [rw] output_bytes
#   @return [Integer, nil]
#
# @!attribute [rw] panels
#   @return [Array, nil]
#
# @!attribute [rw] patient_age_at_collection
#   @return [Integer, nil]
#
# @!attribute [rw] patient_sex
#   @return [String, nil]
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] report_date
#   @return [String, nil]
#
# @!attribute [rw] report_locale
#   @return [String, nil]
#
# @!attribute [rw] report_notes
#   @return [String, nil]
#
# @!attribute [rw] report_time
#   @return [String, nil]
#
# @!attribute [rw] report_type
#   @return [String]
#
# @!attribute [rw] results
#   @return [Array, nil]
#
# @!attribute [rw] results_count
#   @return [Integer, nil]
#
# @!attribute [rw] status_history
#   @return [Array, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upload_id
#   @return [String, nil]
#
# @!attribute [rw] uploaded_at
#   @return [String, nil]
LabReportSessionCreateData = Struct.new(
  :session_id,
  :legacy_format,
  :collection_date,
  :collection_time,
  :current_status,
  :error,
  :file_count,
  :input_bytes,
  :lab_name,
  :output_bytes,
  :panels,
  :patient_age_at_collection,
  :patient_sex,
  :reference_id,
  :report_date,
  :report_locale,
  :report_notes,
  :report_time,
  :report_type,
  :results,
  :results_count,
  :status_history,
  :updated_at,
  :upload_id,
  :uploaded_at,
  keyword_init: true
)

# Menstruation entity data model.
class Menstruation
end

# Request payload for Menstruation#load.
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] start_date
#   @return [Object]
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] with_sample
#   @return [Boolean, nil]
MenstruationLoadMatch = Struct.new(
  :end_date,
  :start_date,
  :to_webhook,
  :user_id,
  :with_sample,
  keyword_init: true
)

# Nutrition entity data model.
class Nutrition
end

# Request payload for Nutrition#load.
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] start_date
#   @return [Object]
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] with_sample
#   @return [Boolean, nil]
NutritionLoadMatch = Struct.new(
  :end_date,
  :start_date,
  :to_webhook,
  :user_id,
  :with_sample,
  keyword_init: true
)

# PlannedWorkout entity data model.
#
# @!attribute [rw] athlete_metrics
#   @return [Object]
#
# @!attribute [rw] coercion_warnings
#   @return [String, nil]
#
# @!attribute [rw] completed_at
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [Object]
#
# @!attribute [rw] details
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_external
#   @return [Boolean, nil]
#
# @!attribute [rw] last_updated_at
#   @return [Object]
#
# @!attribute [rw] planned_date
#   @return [String, nil]
#
# @!attribute [rw] planned_workout_id
#   @return [String, nil]
#
# @!attribute [rw] provider_workout_id
#   @return [String, nil]
#
# @!attribute [rw] warnings
#   @return [Array, nil]
#
# @!attribute [rw] workout
#   @return [Object, nil]
#
# @!attribute [rw] workout_id
#   @return [String, nil]
PlannedWorkout = Struct.new(
  :athlete_metrics,
  :coercion_warnings,
  :completed_at,
  :created_at,
  :details,
  :id,
  :is_external,
  :last_updated_at,
  :planned_date,
  :planned_workout_id,
  :provider_workout_id,
  :warnings,
  :workout,
  :workout_id,
  keyword_init: true
)

# Request payload for PlannedWorkout#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] user_id
#   @return [String]
PlannedWorkoutLoadMatch = Struct.new(
  :id,
  :user_id,
  keyword_init: true
)

# Request payload for PlannedWorkout#list.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String]
PlannedWorkoutListMatch = Struct.new(
  :end_date,
  :start_date,
  :user_id,
  keyword_init: true
)

# Request payload for PlannedWorkout#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] planned_date
#   @return [String, nil]
PlannedWorkoutUpdateData = Struct.new(
  :id,
  :user_id,
  :planned_date,
  keyword_init: true
)

# Sleep entity data model.
class Sleep
end

# Request payload for Sleep#load.
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] start_date
#   @return [Object]
#
# @!attribute [rw] to_webhook
#   @return [Boolean, nil]
#
# @!attribute [rw] user_id
#   @return [String]
#
# @!attribute [rw] with_sample
#   @return [Boolean, nil]
SleepLoadMatch = Struct.new(
  :end_date,
  :start_date,
  :to_webhook,
  :user_id,
  :with_sample,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] max_page
#   @return [Integer, nil]
#
# @!attribute [rw] next
#   @return [Object, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] users
#   @return [Array, nil]
User = Struct.new(
  :max_page,
  :next,
  :results,
  :status,
  :users,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] reference_id
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
UserLoadMatch = Struct.new(
  :reference_id,
  :user_id,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
UserListMatch = Struct.new(
  :page,
  :per_page,
  keyword_init: true
)

# Workout entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [Object, nil]
#
# @!attribute [rw] estimated_calories
#   @return [Object, nil]
#
# @!attribute [rw] estimated_distance_meters
#   @return [Object, nil]
#
# @!attribute [rw] estimated_duration_seconds
#   @return [Object, nil]
#
# @!attribute [rw] estimated_intensity_factor
#   @return [Object, nil]
#
# @!attribute [rw] estimated_tss
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pool_length_meters
#   @return [Object, nil]
#
# @!attribute [rw] sport
#   @return [Object]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] step_blocks
#   @return [Array]
#
# @!attribute [rw] workout_id
#   @return [String, nil]
Workout = Struct.new(
  :description,
  :environment,
  :estimated_calories,
  :estimated_distance_meters,
  :estimated_duration_seconds,
  :estimated_intensity_factor,
  :estimated_tss,
  :id,
  :name,
  :pool_length_meters,
  :sport,
  :status,
  :step_blocks,
  :workout_id,
  keyword_init: true
)

# Request payload for Workout#load.
#
# @!attribute [rw] id
#   @return [Integer]
WorkoutLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Workout#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [Object, nil]
#
# @!attribute [rw] estimated_calories
#   @return [Object, nil]
#
# @!attribute [rw] estimated_distance_meters
#   @return [Object, nil]
#
# @!attribute [rw] estimated_duration_seconds
#   @return [Object, nil]
#
# @!attribute [rw] estimated_intensity_factor
#   @return [Object, nil]
#
# @!attribute [rw] estimated_tss
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pool_length_meters
#   @return [Object, nil]
#
# @!attribute [rw] sport
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] step_blocks
#   @return [Array, nil]
#
# @!attribute [rw] workout_id
#   @return [String, nil]
WorkoutListMatch = Struct.new(
  :description,
  :environment,
  :estimated_calories,
  :estimated_distance_meters,
  :estimated_duration_seconds,
  :estimated_intensity_factor,
  :estimated_tss,
  :id,
  :name,
  :pool_length_meters,
  :sport,
  :status,
  :step_blocks,
  :workout_id,
  keyword_init: true
)

# Request payload for Workout#create.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [Object, nil]
#
# @!attribute [rw] estimated_calories
#   @return [Object, nil]
#
# @!attribute [rw] estimated_distance_meters
#   @return [Object, nil]
#
# @!attribute [rw] estimated_duration_seconds
#   @return [Object, nil]
#
# @!attribute [rw] estimated_intensity_factor
#   @return [Object, nil]
#
# @!attribute [rw] estimated_tss
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pool_length_meters
#   @return [Object, nil]
#
# @!attribute [rw] sport
#   @return [Object]
#
# @!attribute [rw] step_blocks
#   @return [Array]
#
# @!attribute [rw] workout_id
#   @return [String, nil]
WorkoutCreateData = Struct.new(
  :description,
  :environment,
  :estimated_calories,
  :estimated_distance_meters,
  :estimated_duration_seconds,
  :estimated_intensity_factor,
  :estimated_tss,
  :name,
  :pool_length_meters,
  :sport,
  :step_blocks,
  :workout_id,
  keyword_init: true
)

# Request payload for Workout#remove.
#
# @!attribute [rw] planned_workout_id
#   @return [Integer]
#
# @!attribute [rw] user_id
#   @return [String]
WorkoutRemoveMatch = Struct.new(
  :planned_workout_id,
  :user_id,
  keyword_init: true
)

