// Typed models for the Terra SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/terra-sdk/go/core"
)

// Activity is the typed data model for the activity entity.
type Activity struct {
}

// ActivityLoadMatch is the typed request payload for Activity.LoadTyped.
type ActivityLoadMatch struct {
}

// Athlete is the typed data model for the athlete entity.
type Athlete struct {
}

// AthleteLoadMatch is the typed request payload for Athlete.LoadTyped.
type AthleteLoadMatch struct {
}

// Authentication is the typed data model for the authentication entity.
type Authentication struct {
	AuthFailureRedirectUrl *string `json:"auth_failure_redirect_url,omitempty"`
	AuthSuccessRedirectUrl *string `json:"auth_success_redirect_url,omitempty"`
	AuthUrl *string `json:"auth_url,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Language *string `json:"language,omitempty"`
	Providers *string `json:"providers,omitempty"`
	ReferenceId *string `json:"reference_id,omitempty"`
	SessionId *string `json:"session_id,omitempty"`
	Status *string `json:"status,omitempty"`
	Token *string `json:"token,omitempty"`
	Url *string `json:"url,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// AuthenticationCreateData is the typed request payload for Authentication.CreateTyped.
type AuthenticationCreateData struct {
	AuthFailureRedirectUrl *string `json:"auth_failure_redirect_url,omitempty"`
	AuthSuccessRedirectUrl *string `json:"auth_success_redirect_url,omitempty"`
	AuthUrl *string `json:"auth_url,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Language *string `json:"language,omitempty"`
	Providers *string `json:"providers,omitempty"`
	ReferenceId *string `json:"reference_id,omitempty"`
	SessionId *string `json:"session_id,omitempty"`
	Status *string `json:"status,omitempty"`
	Token *string `json:"token,omitempty"`
	Url *string `json:"url,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// AuthenticationRemoveMatch is the typed request payload for Authentication.RemoveTyped.
type AuthenticationRemoveMatch struct {
	AuthFailureRedirectUrl *string `json:"auth_failure_redirect_url,omitempty"`
	AuthSuccessRedirectUrl *string `json:"auth_success_redirect_url,omitempty"`
	AuthUrl *string `json:"auth_url,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Language *string `json:"language,omitempty"`
	Providers *string `json:"providers,omitempty"`
	ReferenceId *string `json:"reference_id,omitempty"`
	SessionId *string `json:"session_id,omitempty"`
	Status *string `json:"status,omitempty"`
	Token *string `json:"token,omitempty"`
	Url *string `json:"url,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// Body is the typed data model for the body entity.
type Body struct {
}

// BodyLoadMatch is the typed request payload for Body.LoadTyped.
type BodyLoadMatch struct {
}

// BulkUserInfo is the typed data model for the bulk_user_info entity.
type BulkUserInfo struct {
}

// BulkUserInfoCreateData is the typed request payload for BulkUserInfo.CreateTyped.
type BulkUserInfoCreateData struct {
}

// Daily is the typed data model for the daily entity.
type Daily struct {
}

// DailyLoadMatch is the typed request payload for Daily.LoadTyped.
type DailyLoadMatch struct {
}

// Integration is the typed data model for the integration entity.
type Integration struct {
	Enabled *bool `json:"enabled,omitempty"`
	Icon *string `json:"icon,omitempty"`
	Name *string `json:"name,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Setup *string `json:"setup,omitempty"`
	Types *map[string]any `json:"types,omitempty"`
}

// IntegrationListMatch is the typed request payload for Integration.ListTyped.
type IntegrationListMatch struct {
	Enabled *bool `json:"enabled,omitempty"`
	Icon *string `json:"icon,omitempty"`
	Name *string `json:"name,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Setup *string `json:"setup,omitempty"`
	Types *map[string]any `json:"types,omitempty"`
}

// LabReport is the typed data model for the lab_report entity.
type LabReport struct {
	CollectionDate *string `json:"collection_date,omitempty"`
	CollectionTime *string `json:"collection_time,omitempty"`
	CurrentStatus string `json:"current_status"`
	FileCount *int `json:"file_count,omitempty"`
	InputBytes *int `json:"input_bytes,omitempty"`
	LabName *string `json:"lab_name,omitempty"`
	OutputBytes *int `json:"output_bytes,omitempty"`
	Panels *[]any `json:"panels,omitempty"`
	PatientAgeAtCollection *int `json:"patient_age_at_collection,omitempty"`
	PatientSex *string `json:"patient_sex,omitempty"`
	ReferenceId *string `json:"reference_id,omitempty"`
	ReportDate *string `json:"report_date,omitempty"`
	ReportLocale *string `json:"report_locale,omitempty"`
	ReportNotes *string `json:"report_notes,omitempty"`
	ReportTime *string `json:"report_time,omitempty"`
	ReportType string `json:"report_type"`
	Results *[]any `json:"results,omitempty"`
	ResultsCount *int `json:"results_count,omitempty"`
	SessionId string `json:"session_id"`
	StatusHistory *[]any `json:"status_history,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UploadId *string `json:"upload_id,omitempty"`
	UploadedAt *string `json:"uploaded_at,omitempty"`
}

// LabReportLoadMatch is the typed request payload for LabReport.LoadTyped.
type LabReportLoadMatch struct {
	Id string `json:"id"`
}

// LabReportListMatch is the typed request payload for LabReport.ListTyped.
type LabReportListMatch struct {
	CollectionDate *string `json:"collection_date,omitempty"`
	CollectionTime *string `json:"collection_time,omitempty"`
	CurrentStatus *string `json:"current_status,omitempty"`
	FileCount *int `json:"file_count,omitempty"`
	InputBytes *int `json:"input_bytes,omitempty"`
	LabName *string `json:"lab_name,omitempty"`
	OutputBytes *int `json:"output_bytes,omitempty"`
	Panels *[]any `json:"panels,omitempty"`
	PatientAgeAtCollection *int `json:"patient_age_at_collection,omitempty"`
	PatientSex *string `json:"patient_sex,omitempty"`
	ReferenceId *string `json:"reference_id,omitempty"`
	ReportDate *string `json:"report_date,omitempty"`
	ReportLocale *string `json:"report_locale,omitempty"`
	ReportNotes *string `json:"report_notes,omitempty"`
	ReportTime *string `json:"report_time,omitempty"`
	ReportType *string `json:"report_type,omitempty"`
	Results *[]any `json:"results,omitempty"`
	ResultsCount *int `json:"results_count,omitempty"`
	SessionId *string `json:"session_id,omitempty"`
	StatusHistory *[]any `json:"status_history,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UploadId *string `json:"upload_id,omitempty"`
	UploadedAt *string `json:"uploaded_at,omitempty"`
}

// LabReportCreateData is the typed request payload for LabReport.CreateTyped.
type LabReportCreateData struct {
	CollectionDate *string `json:"collection_date,omitempty"`
	CollectionTime *string `json:"collection_time,omitempty"`
	CurrentStatus string `json:"current_status"`
	FileCount *int `json:"file_count,omitempty"`
	InputBytes *int `json:"input_bytes,omitempty"`
	LabName *string `json:"lab_name,omitempty"`
	OutputBytes *int `json:"output_bytes,omitempty"`
	Panels *[]any `json:"panels,omitempty"`
	PatientAgeAtCollection *int `json:"patient_age_at_collection,omitempty"`
	PatientSex *string `json:"patient_sex,omitempty"`
	ReferenceId *string `json:"reference_id,omitempty"`
	ReportDate *string `json:"report_date,omitempty"`
	ReportLocale *string `json:"report_locale,omitempty"`
	ReportNotes *string `json:"report_notes,omitempty"`
	ReportTime *string `json:"report_time,omitempty"`
	ReportType string `json:"report_type"`
	Results *[]any `json:"results,omitempty"`
	ResultsCount *int `json:"results_count,omitempty"`
	SessionId string `json:"session_id"`
	StatusHistory *[]any `json:"status_history,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UploadId *string `json:"upload_id,omitempty"`
	UploadedAt *string `json:"uploaded_at,omitempty"`
}

// LabReportRemoveMatch is the typed request payload for LabReport.RemoveTyped.
type LabReportRemoveMatch struct {
	Id string `json:"id"`
}

// LabReportDelivery is the typed data model for the lab_report_delivery entity.
type LabReportDelivery struct {
	AttemptCount int `json:"attempt_count"`
	DestinationId string `json:"destination_id"`
	DestinationType *string `json:"destination_type,omitempty"`
	LastError *string `json:"last_error,omitempty"`
	Status string `json:"status"`
}

// LabReportDeliveryListMatch is the typed request payload for LabReportDelivery.ListTyped.
type LabReportDeliveryListMatch struct {
	Id string `json:"id"`
}

// LabReportFile is the typed data model for the lab_report_file entity.
type LabReportFile struct {
	Filename *string `json:"filename,omitempty"`
	PresignedUrl string `json:"presigned_url"`
}

// LabReportFileListMatch is the typed request payload for LabReportFile.ListTyped.
type LabReportFileListMatch struct {
	Id string `json:"id"`
}

// Menstruation is the typed data model for the menstruation entity.
type Menstruation struct {
}

// MenstruationLoadMatch is the typed request payload for Menstruation.LoadTyped.
type MenstruationLoadMatch struct {
}

// Nutrition is the typed data model for the nutrition entity.
type Nutrition struct {
}

// NutritionLoadMatch is the typed request payload for Nutrition.LoadTyped.
type NutritionLoadMatch struct {
}

// PlannedWorkout is the typed data model for the planned_workout entity.
type PlannedWorkout struct {
	AthleteMetrics *any `json:"athlete_metrics,omitempty"`
	CoercionWarnings *string `json:"coercion_warnings,omitempty"`
	CreatedAt *any `json:"created_at,omitempty"`
	Details *any `json:"details,omitempty"`
	IsExternal *bool `json:"is_external,omitempty"`
	LastUpdatedAt *any `json:"last_updated_at,omitempty"`
	PlannedDate *string `json:"planned_date,omitempty"`
	PlannedWorkoutId *string `json:"planned_workout_id,omitempty"`
	ProviderWorkoutId *string `json:"provider_workout_id,omitempty"`
	WorkoutId *string `json:"workout_id,omitempty"`
}

// PlannedWorkoutLoadMatch is the typed request payload for PlannedWorkout.LoadTyped.
type PlannedWorkoutLoadMatch struct {
	Id int `json:"id"`
}

// PlannedWorkoutListMatch is the typed request payload for PlannedWorkout.ListTyped.
type PlannedWorkoutListMatch struct {
	AthleteMetrics *any `json:"athlete_metrics,omitempty"`
	CoercionWarnings *string `json:"coercion_warnings,omitempty"`
	CreatedAt *any `json:"created_at,omitempty"`
	Details *any `json:"details,omitempty"`
	IsExternal *bool `json:"is_external,omitempty"`
	LastUpdatedAt *any `json:"last_updated_at,omitempty"`
	PlannedDate *string `json:"planned_date,omitempty"`
	PlannedWorkoutId *string `json:"planned_workout_id,omitempty"`
	ProviderWorkoutId *string `json:"provider_workout_id,omitempty"`
	WorkoutId *string `json:"workout_id,omitempty"`
}

// PlannedWorkoutUpdateData is the typed request payload for PlannedWorkout.UpdateTyped.
type PlannedWorkoutUpdateData struct {
	Id int `json:"id"`
	AthleteMetrics *any `json:"athlete_metrics,omitempty"`
	CoercionWarnings *string `json:"coercion_warnings,omitempty"`
	CreatedAt *any `json:"created_at,omitempty"`
	Details *any `json:"details,omitempty"`
	IsExternal *bool `json:"is_external,omitempty"`
	LastUpdatedAt *any `json:"last_updated_at,omitempty"`
	PlannedDate *string `json:"planned_date,omitempty"`
	PlannedWorkoutId *string `json:"planned_workout_id,omitempty"`
	ProviderWorkoutId *string `json:"provider_workout_id,omitempty"`
	WorkoutId *string `json:"workout_id,omitempty"`
}

// Sleep is the typed data model for the sleep entity.
type Sleep struct {
}

// SleepLoadMatch is the typed request payload for Sleep.LoadTyped.
type SleepLoadMatch struct {
}

// User is the typed data model for the user entity.
type User struct {
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
}

// Workout is the typed data model for the workout entity.
type Workout struct {
	Description *string `json:"description,omitempty"`
	Environment *any `json:"environment,omitempty"`
	EstimatedCalories *any `json:"estimated_calories,omitempty"`
	EstimatedDistanceMeters *any `json:"estimated_distance_meters,omitempty"`
	EstimatedDurationSeconds *any `json:"estimated_duration_seconds,omitempty"`
	Ftp *float64 `json:"ftp,omitempty"`
	MaxHeartRate *float64 `json:"max_heart_rate,omitempty"`
	Name string `json:"name"`
	PlannedDate string `json:"planned_date"`
	PoolLengthMeters *any `json:"pool_length_meters,omitempty"`
	Sport any `json:"sport"`
	Status *string `json:"status,omitempty"`
	StepBlocks []any `json:"step_blocks"`
	ThresholdHeartRate *float64 `json:"threshold_heart_rate,omitempty"`
	ThresholdSpeed *float64 `json:"threshold_speed,omitempty"`
	WorkoutId *string `json:"workout_id,omitempty"`
}

// WorkoutLoadMatch is the typed request payload for Workout.LoadTyped.
type WorkoutLoadMatch struct {
	Id int `json:"id"`
}

// WorkoutListMatch is the typed request payload for Workout.ListTyped.
type WorkoutListMatch struct {
	Description *string `json:"description,omitempty"`
	Environment *any `json:"environment,omitempty"`
	EstimatedCalories *any `json:"estimated_calories,omitempty"`
	EstimatedDistanceMeters *any `json:"estimated_distance_meters,omitempty"`
	EstimatedDurationSeconds *any `json:"estimated_duration_seconds,omitempty"`
	Ftp *float64 `json:"ftp,omitempty"`
	MaxHeartRate *float64 `json:"max_heart_rate,omitempty"`
	Name *string `json:"name,omitempty"`
	PlannedDate *string `json:"planned_date,omitempty"`
	PoolLengthMeters *any `json:"pool_length_meters,omitempty"`
	Sport *any `json:"sport,omitempty"`
	Status *string `json:"status,omitempty"`
	StepBlocks *[]any `json:"step_blocks,omitempty"`
	ThresholdHeartRate *float64 `json:"threshold_heart_rate,omitempty"`
	ThresholdSpeed *float64 `json:"threshold_speed,omitempty"`
	WorkoutId *string `json:"workout_id,omitempty"`
}

// WorkoutCreateData is the typed request payload for Workout.CreateTyped.
type WorkoutCreateData struct {
	Description *string `json:"description,omitempty"`
	Environment *any `json:"environment,omitempty"`
	EstimatedCalories *any `json:"estimated_calories,omitempty"`
	EstimatedDistanceMeters *any `json:"estimated_distance_meters,omitempty"`
	EstimatedDurationSeconds *any `json:"estimated_duration_seconds,omitempty"`
	Ftp *float64 `json:"ftp,omitempty"`
	MaxHeartRate *float64 `json:"max_heart_rate,omitempty"`
	Name string `json:"name"`
	PlannedDate string `json:"planned_date"`
	PoolLengthMeters *any `json:"pool_length_meters,omitempty"`
	Sport any `json:"sport"`
	Status *string `json:"status,omitempty"`
	StepBlocks []any `json:"step_blocks"`
	ThresholdHeartRate *float64 `json:"threshold_heart_rate,omitempty"`
	ThresholdSpeed *float64 `json:"threshold_speed,omitempty"`
	WorkoutId *string `json:"workout_id,omitempty"`
}

// WorkoutRemoveMatch is the typed request payload for Workout.RemoveTyped.
type WorkoutRemoveMatch struct {
	PlannedWorkoutId *int `json:"planned_workout_id,omitempty"`
	Id *int `json:"id,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
