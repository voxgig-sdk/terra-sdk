# Typed models for the Terra SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
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


class ActivityLoadMatchRequired(TypedDict):
    start_date: Any
    user_id: str


class ActivityLoadMatch(ActivityLoadMatchRequired, total=False):
    end_date: Any
    to_webhook: bool
    with_samples: bool


class Athlete(TypedDict):
    pass


class AthleteLoadMatchRequired(TypedDict):
    user_id: str


class AthleteLoadMatch(AthleteLoadMatchRequired, total=False):
    to_webhook: bool


class Authentication(TypedDict, total=False):
    auth_failure_redirect_url: str
    auth_success_redirect_url: str
    auth_url: str
    expires_in: int
    language: str
    reference_id: str
    sdk_app: str
    status: str
    token: str
    user_id: str


class AuthenticationCreateDataRequired(TypedDict):
    resource: str


class AuthenticationCreateData(AuthenticationCreateDataRequired, total=False):
    auth_failure_redirect_url: str
    auth_success_redirect_url: str
    auth_url: str
    expires_in: int
    language: str
    reference_id: str
    sdk_app: str
    status: str
    token: str
    user_id: str


class AuthenticationRemoveMatch(TypedDict):
    user_id: str


class Body(TypedDict):
    pass


class BodyLoadMatchRequired(TypedDict):
    start_date: Any
    user_id: str


class BodyLoadMatch(BodyLoadMatchRequired, total=False):
    end_date: Any
    to_webhook: bool
    with_samples: bool


class BulkUserInfo(TypedDict, total=False):
    bulk_user_infos: list


class BulkUserInfoCreateData(TypedDict, total=False):
    bulk_user_infos: list


class Daily(TypedDict):
    pass


class DailyLoadMatchRequired(TypedDict):
    start_date: Any
    user_id: str


class DailyLoadMatch(DailyLoadMatchRequired, total=False):
    end_date: Any
    to_webhook: bool
    with_samples: bool


class Integration(TypedDict, total=False):
    providers: list
    sdk_providers: list
    status: str


class IntegrationListMatch(TypedDict, total=False):
    providers: list
    sdk_providers: list
    status: str


class LabReport(TypedDict, total=False):
    id: str


class LabReportLoadMatch(TypedDict):
    id: str


class LabReportCreateData(TypedDict, total=False):
    reference_id: str
    id: str


class LabReportRemoveMatch(TypedDict):
    id: str


class LabReportDeliveryRequired(TypedDict):
    attempt_count: int
    destination_id: str
    status: str


class LabReportDelivery(LabReportDeliveryRequired, total=False):
    destination_type: str
    id: str
    last_error: str


class LabReportDeliveryListMatch(TypedDict):
    id: str


class LabReportFileRequired(TypedDict):
    presigned_url: str


class LabReportFile(LabReportFileRequired, total=False):
    content_type: str
    filename: str
    id: str


class LabReportFileListMatch(TypedDict):
    id: str


class LabReportSessionRequired(TypedDict):
    current_status: str
    error: dict
    file: str
    report_type: str
    session_id: str


class LabReportSession(LabReportSessionRequired, total=False):
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


class LabReportSessionLoadMatch(TypedDict):
    session_id: str


class LabReportSessionCreateDataRequired(TypedDict):
    current_status: str
    error: dict
    file: str
    report_type: str
    session_id: str
    upload_id: str


class LabReportSessionCreateData(LabReportSessionCreateDataRequired, total=False):
    reference_id: str
    collection_date: str
    collection_time: str
    file_count: int
    input_bytes: int
    lab_name: str
    output_bytes: int
    panels: list
    patient_age_at_collection: int
    patient_sex: str
    report_date: str
    report_locale: str
    report_notes: str
    report_time: str
    results: list
    results_count: int
    status_history: list
    updated_at: str
    uploaded_at: str


class LabReportSessionRemoveMatch(TypedDict):
    session_id: str


class Menstruation(TypedDict):
    pass


class MenstruationLoadMatchRequired(TypedDict):
    start_date: Any
    user_id: str


class MenstruationLoadMatch(MenstruationLoadMatchRequired, total=False):
    end_date: Any
    to_webhook: bool
    with_samples: bool


class Nutrition(TypedDict):
    pass


class NutritionLoadMatchRequired(TypedDict):
    start_date: Any
    user_id: str


class NutritionLoadMatch(NutritionLoadMatchRequired, total=False):
    end_date: Any
    to_webhook: bool
    with_samples: bool


class PlannedWorkoutRequired(TypedDict):
    athlete_metrics: Any
    created_at: Any
    details: Any
    last_updated_at: Any


class PlannedWorkout(PlannedWorkoutRequired, total=False):
    coercion_warnings: str
    completed_at: Any
    id: str
    is_external: bool
    planned_date: str
    planned_workout_id: str
    provider_workout_id: str
    warnings: list
    workout: Any
    workout_id: str


class PlannedWorkoutLoadMatch(TypedDict):
    id: int
    user_id: str


class PlannedWorkoutListMatchRequired(TypedDict):
    user_id: str


class PlannedWorkoutListMatch(PlannedWorkoutListMatchRequired, total=False):
    end_date: str
    start_date: str


class PlannedWorkoutUpdateDataRequired(TypedDict):
    id: int
    user_id: str


class PlannedWorkoutUpdateData(PlannedWorkoutUpdateDataRequired, total=False):
    planned_date: str


class PlannedWorkoutRemoveMatch(TypedDict):
    id: int
    user_id: str


class Sleep(TypedDict):
    pass


class SleepLoadMatchRequired(TypedDict):
    start_date: Any
    user_id: str


class SleepLoadMatch(SleepLoadMatchRequired, total=False):
    end_date: Any
    to_webhook: bool
    with_samples: bool


class User(TypedDict, total=False):
    max_page: int
    next: int | None
    results: list
    status: str
    users: list


class UserLoadMatch(TypedDict, total=False):
    reference_id: str
    user_id: str


class UserListMatch(TypedDict, total=False):
    page: int
    per_page: int


class WorkoutRequired(TypedDict):
    name: str
    sport: Any
    step_blocks: list


class Workout(WorkoutRequired, total=False):
    description: str
    environment: Any
    estimated_calories: Any
    estimated_distance_meters: Any
    estimated_duration_seconds: Any
    estimated_intensity_factor: Any
    estimated_tss: Any
    id: str
    pool_length_meters: Any
    status: str
    workout_id: str


class WorkoutLoadMatch(TypedDict):
    id: int


class WorkoutListMatch(TypedDict, total=False):
    description: str
    environment: Any
    estimated_calories: Any
    estimated_distance_meters: Any
    estimated_duration_seconds: Any
    estimated_intensity_factor: Any
    estimated_tss: Any
    id: str
    name: str
    pool_length_meters: Any
    sport: Any
    status: str
    step_blocks: list
    workout_id: str


class WorkoutCreateDataRequired(TypedDict):
    name: str
    sport: Any
    step_blocks: list


class WorkoutCreateData(WorkoutCreateDataRequired, total=False):
    description: str
    environment: Any
    estimated_calories: Any
    estimated_distance_meters: Any
    estimated_duration_seconds: Any
    estimated_intensity_factor: Any
    estimated_tss: Any
    pool_length_meters: Any
    workout_id: str


class WorkoutRemoveMatch(TypedDict):
    id: int
