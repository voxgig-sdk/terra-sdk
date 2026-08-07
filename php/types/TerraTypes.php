<?php
declare(strict_types=1);

// Typed models for the Terra SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Activity entity data model. */
class Activity
{
}

/** Request payload for Activity#load. */
class ActivityLoadMatch
{
}

/** Athlete entity data model. */
class Athlete
{
}

/** Request payload for Athlete#load. */
class AthleteLoadMatch
{
}

/** Authentication entity data model. */
class Authentication
{
    public ?string $auth_failure_redirect_url = null;
    public ?string $auth_success_redirect_url = null;
    public ?string $auth_url = null;
    public ?int $expires_in = null;
    public ?string $language = null;
    public ?string $provider = null;
    public ?string $reference_id = null;
    public ?string $session_id = null;
    public ?string $status = null;
    public ?string $token = null;
    public ?string $url = null;
    public ?string $user_id = null;
}

/** Request payload for Authentication#create. */
class AuthenticationCreateData
{
    public ?string $auth_failure_redirect_url = null;
    public ?string $auth_success_redirect_url = null;
    public ?string $auth_url = null;
    public ?int $expires_in = null;
    public ?string $language = null;
    public ?string $provider = null;
    public ?string $reference_id = null;
    public ?string $session_id = null;
    public ?string $status = null;
    public ?string $token = null;
    public ?string $url = null;
    public ?string $user_id = null;
}

/** Request payload for Authentication#remove. */
class AuthenticationRemoveMatch
{
    public ?string $auth_failure_redirect_url = null;
    public ?string $auth_success_redirect_url = null;
    public ?string $auth_url = null;
    public ?int $expires_in = null;
    public ?string $language = null;
    public ?string $provider = null;
    public ?string $reference_id = null;
    public ?string $session_id = null;
    public ?string $status = null;
    public ?string $token = null;
    public ?string $url = null;
    public ?string $user_id = null;
}

/** Body entity data model. */
class Body
{
}

/** Request payload for Body#load. */
class BodyLoadMatch
{
}

/** BulkUserInfo entity data model. */
class BulkUserInfo
{
}

/** Request payload for BulkUserInfo#create. */
class BulkUserInfoCreateData
{
}

/** Daily entity data model. */
class Daily
{
}

/** Request payload for Daily#load. */
class DailyLoadMatch
{
}

/** Integration entity data model. */
class Integration
{
    public ?bool $enabled = null;
    public ?string $icon = null;
    public ?string $name = null;
    public ?string $provider = null;
    public ?string $setup = null;
    public ?array $type = null;
}

/** Request payload for Integration#list. */
class IntegrationListMatch
{
    public ?bool $enabled = null;
    public ?string $icon = null;
    public ?string $name = null;
    public ?string $provider = null;
    public ?string $setup = null;
    public ?array $type = null;
}

/** LabReport entity data model. */
class LabReport
{
    public ?string $collection_date = null;
    public ?string $collection_time = null;
    public string $current_status;
    public ?int $file_count = null;
    public ?int $input_bytes = null;
    public ?string $lab_name = null;
    public ?int $output_bytes = null;
    public ?array $panel = null;
    public ?int $patient_age_at_collection = null;
    public ?string $patient_sex = null;
    public ?string $reference_id = null;
    public ?string $report_date = null;
    public ?string $report_locale = null;
    public ?string $report_notes = null;
    public ?string $report_time = null;
    public string $report_type;
    public ?array $results = null;
    public ?int $results_count = null;
    public string $session_id;
    public ?array $status_history = null;
    public ?string $updated_at = null;
    public ?string $upload_id = null;
    public ?string $uploaded_at = null;
}

/** Request payload for LabReport#load. */
class LabReportLoadMatch
{
    public string $id;
}

/** Request payload for LabReport#list. */
class LabReportListMatch
{
    public ?string $collection_date = null;
    public ?string $collection_time = null;
    public ?string $current_status = null;
    public ?int $file_count = null;
    public ?int $input_bytes = null;
    public ?string $lab_name = null;
    public ?int $output_bytes = null;
    public ?array $panel = null;
    public ?int $patient_age_at_collection = null;
    public ?string $patient_sex = null;
    public ?string $reference_id = null;
    public ?string $report_date = null;
    public ?string $report_locale = null;
    public ?string $report_notes = null;
    public ?string $report_time = null;
    public ?string $report_type = null;
    public ?array $results = null;
    public ?int $results_count = null;
    public ?string $session_id = null;
    public ?array $status_history = null;
    public ?string $updated_at = null;
    public ?string $upload_id = null;
    public ?string $uploaded_at = null;
}

/** Request payload for LabReport#create. */
class LabReportCreateData
{
    public ?string $collection_date = null;
    public ?string $collection_time = null;
    public string $current_status;
    public ?int $file_count = null;
    public ?int $input_bytes = null;
    public ?string $lab_name = null;
    public ?int $output_bytes = null;
    public ?array $panel = null;
    public ?int $patient_age_at_collection = null;
    public ?string $patient_sex = null;
    public ?string $reference_id = null;
    public ?string $report_date = null;
    public ?string $report_locale = null;
    public ?string $report_notes = null;
    public ?string $report_time = null;
    public string $report_type;
    public ?array $results = null;
    public ?int $results_count = null;
    public string $session_id;
    public ?array $status_history = null;
    public ?string $updated_at = null;
    public ?string $upload_id = null;
    public ?string $uploaded_at = null;
}

/** Request payload for LabReport#remove. */
class LabReportRemoveMatch
{
    public string $id;
}

/** LabReportDelivery entity data model. */
class LabReportDelivery
{
    public int $attempt_count;
    public string $destination_id;
    public ?string $destination_type = null;
    public ?string $last_error = null;
    public string $status;
}

/** Request payload for LabReportDelivery#list. */
class LabReportDeliveryListMatch
{
    public string $id;
}

/** LabReportFile entity data model. */
class LabReportFile
{
    public ?string $filename = null;
    public string $presigned_url;
}

/** Request payload for LabReportFile#list. */
class LabReportFileListMatch
{
    public string $id;
}

/** Menstruation entity data model. */
class Menstruation
{
}

/** Request payload for Menstruation#load. */
class MenstruationLoadMatch
{
}

/** Nutrition entity data model. */
class Nutrition
{
}

/** Request payload for Nutrition#load. */
class NutritionLoadMatch
{
}

/** PlannedWorkout entity data model. */
class PlannedWorkout
{
    public mixed $athlete_metrics = null;
    public ?string $coercion_warnings = null;
    public mixed $created_at = null;
    public mixed $detail = null;
    public ?bool $is_external = null;
    public mixed $last_updated_at = null;
    public ?string $planned_date = null;
    public ?string $planned_workout_id = null;
    public ?string $provider_workout_id = null;
    public ?string $workout_id = null;
}

/** Request payload for PlannedWorkout#load. */
class PlannedWorkoutLoadMatch
{
    public int $id;
}

/** Request payload for PlannedWorkout#list. */
class PlannedWorkoutListMatch
{
    public mixed $athlete_metrics = null;
    public ?string $coercion_warnings = null;
    public mixed $created_at = null;
    public mixed $detail = null;
    public ?bool $is_external = null;
    public mixed $last_updated_at = null;
    public ?string $planned_date = null;
    public ?string $planned_workout_id = null;
    public ?string $provider_workout_id = null;
    public ?string $workout_id = null;
}

/** Request payload for PlannedWorkout#update. */
class PlannedWorkoutUpdateData
{
    public int $id;
    public mixed $athlete_metrics = null;
    public ?string $coercion_warnings = null;
    public mixed $created_at = null;
    public mixed $detail = null;
    public ?bool $is_external = null;
    public mixed $last_updated_at = null;
    public ?string $planned_date = null;
    public ?string $planned_workout_id = null;
    public ?string $provider_workout_id = null;
    public ?string $workout_id = null;
}

/** Sleep entity data model. */
class Sleep
{
}

/** Request payload for Sleep#load. */
class SleepLoadMatch
{
}

/** User entity data model. */
class User
{
}

/** Request payload for User#load. */
class UserLoadMatch
{
}

/** Workout entity data model. */
class Workout
{
    public ?string $description = null;
    public mixed $environment = null;
    public mixed $estimated_calories = null;
    public mixed $estimated_distance_meters = null;
    public mixed $estimated_duration_seconds = null;
    public ?float $ftp = null;
    public ?float $max_heart_rate = null;
    public string $name;
    public string $planned_date;
    public mixed $pool_length_meters = null;
    public mixed $sport;
    public ?string $status = null;
    public array $step_blocks;
    public ?float $threshold_heart_rate = null;
    public ?float $threshold_speed = null;
    public ?string $workout_id = null;
}

/** Request payload for Workout#load. */
class WorkoutLoadMatch
{
    public int $id;
}

/** Request payload for Workout#list. */
class WorkoutListMatch
{
    public ?string $description = null;
    public mixed $environment = null;
    public mixed $estimated_calories = null;
    public mixed $estimated_distance_meters = null;
    public mixed $estimated_duration_seconds = null;
    public ?float $ftp = null;
    public ?float $max_heart_rate = null;
    public ?string $name = null;
    public ?string $planned_date = null;
    public mixed $pool_length_meters = null;
    public mixed $sport = null;
    public ?string $status = null;
    public ?array $step_blocks = null;
    public ?float $threshold_heart_rate = null;
    public ?float $threshold_speed = null;
    public ?string $workout_id = null;
}

/** Request payload for Workout#create. */
class WorkoutCreateData
{
    public ?string $description = null;
    public mixed $environment = null;
    public mixed $estimated_calories = null;
    public mixed $estimated_distance_meters = null;
    public mixed $estimated_duration_seconds = null;
    public ?float $ftp = null;
    public ?float $max_heart_rate = null;
    public string $name;
    public string $planned_date;
    public mixed $pool_length_meters = null;
    public mixed $sport;
    public ?string $status = null;
    public array $step_blocks;
    public ?float $threshold_heart_rate = null;
    public ?float $threshold_speed = null;
    public ?string $workout_id = null;
}

/** Request payload for Workout#remove. */
class WorkoutRemoveMatch
{
    public ?int $planned_workout_id = null;
    public ?int $id = null;
}

