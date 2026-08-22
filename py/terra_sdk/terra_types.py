# Typed models for the Terra SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Activity(TypedDict):
    pass


class ActivityLoadMatch(TypedDict):
    pass


class Athlete(TypedDict):
    pass


class AthleteLoadMatch(TypedDict):
    pass


class Authentication(TypedDict, total=False):
    auth_failure_redirect_url: str
    auth_success_redirect_url: str
    auth_url: str
    expires_in: int
    language: str
    providers: str
    reference_id: str
    session_id: str
    status: str
    token: str
    url: str
    user_id: str


class AuthenticationCreateData(TypedDict, total=False):
    auth_failure_redirect_url: str
    auth_success_redirect_url: str
    auth_url: str
    expires_in: int
    language: str
    providers: str
    reference_id: str
    session_id: str
    status: str
    token: str
    url: str
    user_id: str


class AuthenticationRemoveMatch(TypedDict, total=False):
    auth_failure_redirect_url: str
    auth_success_redirect_url: str
    auth_url: str
    expires_in: int
    language: str
    providers: str
    reference_id: str
    session_id: str
    status: str
    token: str
    url: str
    user_id: str


class Body(TypedDict):
    pass


class BodyLoadMatch(TypedDict):
    pass


class BulkUserInfo(TypedDict):
    pass


class BulkUserInfoCreateData(TypedDict):
    pass


class Daily(TypedDict):
    pass


class DailyLoadMatch(TypedDict):
    pass


class Integration(TypedDict, total=False):
    enabled: bool
    icon: str
    name: str
    provider: str
    providers: list
    sdk_providers: list
    setup: str
    status: str
    types: dict


class IntegrationListMatch(TypedDict, total=False):
    enabled: bool
    icon: str
    name: str
    provider: str
    providers: list
    sdk_providers: list
    setup: str
    status: str
    types: dict


class LabReportRequired(TypedDict):
    current_status: str
    report_type: str
    session_id: str


class LabReport(LabReportRequired, total=False):
    collection_date: str
    collection_time: str
    file_count: int
    input_bytes: int
    lab_name: str
    output_bytes: int
    panels: list
    patient_age_at_collection: int
    patient_sex: str
    reference_id: str
    report_date: str
    report_locale: str
    report_notes: str
    report_time: str
    results: list
    results_count: int
    status_history: list
    updated_at: str
    upload_id: str
    uploaded_at: str


class LabReportLoadMatch(TypedDict):
    id: str


class LabReportListMatch(TypedDict, total=False):
    collection_date: str
    collection_time: str
    current_status: str
    file_count: int
    input_bytes: int
    lab_name: str
    output_bytes: int
    panels: list
    patient_age_at_collection: int
    patient_sex: str
    reference_id: str
    report_date: str
    report_locale: str
    report_notes: str
    report_time: str
    report_type: str
    results: list
    results_count: int
    session_id: str
    status_history: list
    updated_at: str
    upload_id: str
    uploaded_at: str


class LabReportCreateDataRequired(TypedDict):
    current_status: str
    report_type: str
    session_id: str


class LabReportCreateData(LabReportCreateDataRequired, total=False):
    collection_date: str
    collection_time: str
    file_count: int
    input_bytes: int
    lab_name: str
    output_bytes: int
    panels: list
    patient_age_at_collection: int
    patient_sex: str
    reference_id: str
    report_date: str
    report_locale: str
    report_notes: str
    report_time: str
    results: list
    results_count: int
    status_history: list
    updated_at: str
    upload_id: str
    uploaded_at: str


class LabReportRemoveMatch(TypedDict):
    id: str


class LabReportDeliveryRequired(TypedDict):
    attempt_count: int
    destination_id: str
    status: str


class LabReportDelivery(LabReportDeliveryRequired, total=False):
    destination_type: str
    last_error: str


class LabReportDeliveryListMatch(TypedDict):
    id: str


class LabReportFileRequired(TypedDict):
    presigned_url: str


class LabReportFile(LabReportFileRequired, total=False):
    filename: str


class LabReportFileListMatch(TypedDict):
    id: str


class Menstruation(TypedDict):
    pass


class MenstruationLoadMatch(TypedDict):
    pass


class Nutrition(TypedDict):
    pass


class NutritionLoadMatch(TypedDict):
    pass


class PlannedWorkout(TypedDict, total=False):
    athlete_metrics: Any
    coercion_warnings: str
    created_at: Any
    details: Any
    is_external: bool
    last_updated_at: Any
    planned_date: str
    planned_workout_id: str
    provider_workout_id: str
    workout_id: str


class PlannedWorkoutLoadMatch(TypedDict):
    id: int


class PlannedWorkoutListMatch(TypedDict, total=False):
    athlete_metrics: Any
    coercion_warnings: str
    created_at: Any
    details: Any
    is_external: bool
    last_updated_at: Any
    planned_date: str
    planned_workout_id: str
    provider_workout_id: str
    workout_id: str


class PlannedWorkoutUpdateDataRequired(TypedDict):
    id: int


class PlannedWorkoutUpdateData(PlannedWorkoutUpdateDataRequired, total=False):
    athlete_metrics: Any
    coercion_warnings: str
    created_at: Any
    details: Any
    is_external: bool
    last_updated_at: Any
    planned_date: str
    planned_workout_id: str
    provider_workout_id: str
    workout_id: str


class Sleep(TypedDict):
    pass


class SleepLoadMatch(TypedDict):
    pass


class User(TypedDict):
    pass


class UserLoadMatch(TypedDict):
    pass


class WorkoutRequired(TypedDict):
    name: str
    planned_date: str
    sport: Any
    step_blocks: list


class Workout(WorkoutRequired, total=False):
    description: str
    environment: Any
    estimated_calories: Any
    estimated_distance_meters: Any
    estimated_duration_seconds: Any
    ftp: float
    max_heart_rate: float
    pool_length_meters: Any
    status: str
    threshold_heart_rate: float
    threshold_speed: float
    workout_id: str


class WorkoutLoadMatch(TypedDict):
    id: int


class WorkoutListMatch(TypedDict, total=False):
    description: str
    environment: Any
    estimated_calories: Any
    estimated_distance_meters: Any
    estimated_duration_seconds: Any
    ftp: float
    max_heart_rate: float
    name: str
    planned_date: str
    pool_length_meters: Any
    sport: Any
    status: str
    step_blocks: list
    threshold_heart_rate: float
    threshold_speed: float
    workout_id: str


class WorkoutCreateDataRequired(TypedDict):
    name: str
    planned_date: str
    sport: Any
    step_blocks: list


class WorkoutCreateData(WorkoutCreateDataRequired, total=False):
    description: str
    environment: Any
    estimated_calories: Any
    estimated_distance_meters: Any
    estimated_duration_seconds: Any
    ftp: float
    max_heart_rate: float
    pool_length_meters: Any
    status: str
    threshold_heart_rate: float
    threshold_speed: float
    workout_id: str


class WorkoutRemoveMatch(TypedDict):
    planned_workout_id: int
