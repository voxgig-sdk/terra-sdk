export interface Activity {
}
export interface ActivityLoadMatch {
    end_date?: any;
    start_date: any;
    to_webhook?: boolean;
    user_id: string;
    with_sample?: boolean;
}
export interface Athlete {
}
export interface AthleteLoadMatch {
    to_webhook?: boolean;
    user_id: string;
}
export interface Authentication {
    apple_app_url?: string;
    auth_failure_redirect_url?: string;
    auth_success_redirect_url?: string;
    auth_url?: string;
    bypass_feedback?: boolean;
    connected_uids?: any[];
    expires_in?: number;
    language?: string;
    multi_auth?: boolean;
    providers?: string;
    reference_id?: string;
    samsung_app_url?: string;
    sdk_app?: string;
    session_id?: string;
    show_disconnect?: boolean;
    status?: string;
    token?: string;
    url?: string;
    use_terra_avengers_app?: boolean;
    user_id?: string;
    warnings?: any[];
}
export interface AuthenticationCreateData {
    resource: string;
    apple_app_url?: string;
    auth_failure_redirect_url?: string;
    auth_success_redirect_url?: string;
    auth_url?: string;
    bypass_feedback?: boolean;
    connected_uids?: any[];
    expires_in?: number;
    language?: string;
    multi_auth?: boolean;
    providers?: string;
    reference_id?: string;
    samsung_app_url?: string;
    sdk_app?: string;
    session_id?: string;
    show_disconnect?: boolean;
    status?: string;
    token?: string;
    url?: string;
    use_terra_avengers_app?: boolean;
    user_id?: string;
    warnings?: any[];
}
export interface AuthenticationRemoveMatch {
    user_id: string;
}
export interface Body {
}
export interface BodyLoadMatch {
    end_date?: any;
    start_date: any;
    to_webhook?: boolean;
    user_id: string;
    with_sample?: boolean;
}
export interface BulkUserInfo {
    bulk_user_infos?: any[];
}
export interface BulkUserInfoCreateData {
    bulk_user_infos?: any[];
}
export interface Daily {
}
export interface DailyLoadMatch {
    end_date?: any;
    start_date: any;
    to_webhook?: boolean;
    user_id: string;
    with_sample?: boolean;
}
export interface Integration {
    providers?: any[];
    sdk_providers?: any[];
    status?: string;
}
export interface IntegrationListMatch {
    providers?: any[];
    sdk_providers?: any[];
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface LabReport {
    collection_date?: string;
    collection_time?: string;
    current_status: string;
    file_count?: number;
    id?: string;
    input_bytes?: number;
    lab_name?: string;
    output_bytes?: number;
    panels?: any[];
    patient_age_at_collection?: number;
    patient_sex?: string;
    reference_id?: string;
    report_date?: string;
    report_locale?: string;
    report_notes?: string;
    report_time?: string;
    report_type: string;
    results?: any[];
    results_count?: number;
    session_id: string;
    status_history?: any[];
    updated_at?: string;
    upload_id?: string;
    uploaded_at?: string;
}
export interface LabReportLoadMatch {
    id: string;
}
export interface LabReportListMatch {
    reference_id?: string;
    report_date_from?: string;
    report_date_to?: string;
    report_type?: string;
    upload_id?: string;
    uploaded_at_from?: string;
    uploaded_at_to?: string;
}
export interface LabReportCreateData {
    reference_id?: string;
    collection_date?: string;
    collection_time?: string;
    current_status: string;
    file_count?: number;
    id?: string;
    input_bytes?: number;
    lab_name?: string;
    output_bytes?: number;
    panels?: any[];
    patient_age_at_collection?: number;
    patient_sex?: string;
    report_date?: string;
    report_locale?: string;
    report_notes?: string;
    report_time?: string;
    report_type: string;
    results?: any[];
    results_count?: number;
    session_id: string;
    status_history?: any[];
    updated_at?: string;
    upload_id?: string;
    uploaded_at?: string;
}
export interface LabReportRemoveMatch {
    id: string;
}
export interface LabReportDelivery {
    attempt_count: number;
    destination_id: string;
    destination_type?: string;
    id?: string;
    last_error?: string;
    status: string;
}
export interface LabReportDeliveryListMatch {
    id: string;
}
export interface LabReportFile {
    filename?: string;
    id?: string;
    presigned_url: string;
}
export interface LabReportFileListMatch {
    id: string;
}
export interface LabReportSession {
    collection_date?: string;
    collection_time?: string;
    current_status: string;
    file_count?: number;
    input_bytes?: number;
    lab_name?: string;
    output_bytes?: number;
    panels?: any[];
    patient_age_at_collection?: number;
    patient_sex?: string;
    reference_id?: string;
    report_date?: string;
    report_locale?: string;
    report_notes?: string;
    report_time?: string;
    report_type: string;
    results?: any[];
    results_count?: number;
    session_id: string;
    status_history?: any[];
    updated_at?: string;
    upload_id?: string;
    uploaded_at?: string;
}
export interface LabReportSessionLoadMatch {
    session_id: string;
}
export interface LabReportSessionListMatch {
    reference_id?: string;
    report_date_from?: string;
    report_date_to?: string;
    report_type?: string;
    upload_id?: string;
    uploaded_at_from?: string;
    uploaded_at_to?: string;
}
export interface LabReportSessionCreateData {
    reference_id?: string;
    collection_date?: string;
    collection_time?: string;
    current_status: string;
    file_count?: number;
    input_bytes?: number;
    lab_name?: string;
    output_bytes?: number;
    panels?: any[];
    patient_age_at_collection?: number;
    patient_sex?: string;
    report_date?: string;
    report_locale?: string;
    report_notes?: string;
    report_time?: string;
    report_type: string;
    results?: any[];
    results_count?: number;
    session_id: string;
    status_history?: any[];
    updated_at?: string;
    upload_id?: string;
    uploaded_at?: string;
}
export interface Menstruation {
}
export interface MenstruationLoadMatch {
    end_date?: any;
    start_date: any;
    to_webhook?: boolean;
    user_id: string;
    with_sample?: boolean;
}
export interface Nutrition {
}
export interface NutritionLoadMatch {
    end_date?: any;
    start_date: any;
    to_webhook?: boolean;
    user_id: string;
    with_sample?: boolean;
}
export interface PlannedWorkout {
    athlete_metrics: any;
    coercion_warnings?: string;
    completed_at?: any;
    created_at: any;
    details: any;
    id?: string;
    is_external?: boolean;
    last_updated_at: any;
    planned_date?: string;
    planned_workout_id?: string;
    provider_workout_id?: string;
    warnings?: any[];
    workout?: any;
    workout_id?: string;
}
export interface PlannedWorkoutLoadMatch {
    id: number;
    user_id: string;
}
export interface PlannedWorkoutListMatch {
    end_date?: string;
    start_date?: string;
    user_id: string;
}
export interface PlannedWorkoutUpdateData {
    id: number;
    user_id: string;
    athlete_metrics?: any;
    coercion_warnings?: string;
    completed_at?: any;
    created_at?: any;
    details?: any;
    is_external?: boolean;
    last_updated_at?: any;
    planned_date?: string;
    planned_workout_id?: string;
    provider_workout_id?: string;
    warnings?: any[];
    workout?: any;
    workout_id?: string;
}
export interface Sleep {
}
export interface SleepLoadMatch {
    end_date?: any;
    start_date: any;
    to_webhook?: boolean;
    user_id: string;
    with_sample?: boolean;
}
export interface User {
    max_page?: number;
    next?: number | null;
    results?: any[];
    status?: string;
    users?: any[];
}
export interface UserLoadMatch {
    reference_id?: string;
    user_id?: string;
}
export interface UserListMatch {
    page?: number;
    per_page?: number;
}
export interface Workout {
    description?: string;
    environment?: any;
    estimated_calories?: any;
    estimated_distance_meters?: any;
    estimated_duration_seconds?: any;
    estimated_intensity_factor?: any;
    estimated_tss?: any;
    id?: string;
    name: string;
    pool_length_meters?: any;
    sport: any;
    status?: string;
    step_blocks: any[];
    workout_id?: string;
}
export interface WorkoutLoadMatch {
    id: number;
}
export interface WorkoutListMatch {
    description?: string;
    environment?: any;
    estimated_calories?: any;
    estimated_distance_meters?: any;
    estimated_duration_seconds?: any;
    estimated_intensity_factor?: any;
    estimated_tss?: any;
    id?: string;
    name?: string;
    pool_length_meters?: any;
    sport?: any;
    status?: string;
    step_blocks?: any[];
    workout_id?: string;
}
export interface WorkoutCreateData {
    description?: string;
    environment?: any;
    estimated_calories?: any;
    estimated_distance_meters?: any;
    estimated_duration_seconds?: any;
    estimated_intensity_factor?: any;
    estimated_tss?: any;
    id?: string;
    name: string;
    pool_length_meters?: any;
    sport: any;
    status?: string;
    step_blocks: any[];
    workout_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkoutRemoveMatch {
    planned_workout_id: number;
    user_id: string;
}
