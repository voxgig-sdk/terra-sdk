export interface Activity {
}
export interface ActivityLoadMatch {
}
export interface Athlete {
}
export interface AthleteLoadMatch {
}
export interface Authentication {
    auth_failure_redirect_url?: string;
    auth_success_redirect_url?: string;
    auth_url?: string;
    expires_in?: number;
    language?: string;
    providers?: string;
    reference_id?: string;
    session_id?: string;
    status?: string;
    token?: string;
    url?: string;
    user_id?: string;
}
export interface AuthenticationCreateData {
    auth_failure_redirect_url?: string;
    auth_success_redirect_url?: string;
    auth_url?: string;
    expires_in?: number;
    language?: string;
    providers?: string;
    reference_id?: string;
    session_id?: string;
    status?: string;
    token?: string;
    url?: string;
    user_id?: string;
}
export interface AuthenticationRemoveMatch {
    auth_failure_redirect_url?: string;
    auth_success_redirect_url?: string;
    auth_url?: string;
    expires_in?: number;
    language?: string;
    providers?: string;
    reference_id?: string;
    session_id?: string;
    status?: string;
    token?: string;
    url?: string;
    user_id?: string;
}
export interface Body {
}
export interface BodyLoadMatch {
}
export interface BulkUserInfo {
}
export interface BulkUserInfoCreateData {
}
export interface Daily {
}
export interface DailyLoadMatch {
}
export interface Integration {
    enabled?: boolean;
    icon?: string;
    name?: string;
    provider?: string;
    providers?: any[];
    sdk_providers?: any[];
    setup?: string;
    status?: string;
    types?: Record<string, any>;
}
export interface IntegrationListMatch {
    enabled?: boolean;
    icon?: string;
    name?: string;
    provider?: string;
    providers?: any[];
    sdk_providers?: any[];
    setup?: string;
    status?: string;
    types?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface LabReport {
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
export interface LabReportLoadMatch {
    id: string;
}
export interface LabReportListMatch {
    collection_date?: string;
    collection_time?: string;
    current_status?: string;
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
    report_type?: string;
    results?: any[];
    results_count?: number;
    session_id?: string;
    status_history?: any[];
    updated_at?: string;
    upload_id?: string;
    uploaded_at?: string;
}
export interface LabReportCreateData {
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
export interface LabReportRemoveMatch {
    id: string;
}
export interface LabReportDelivery {
    attempt_count: number;
    destination_id: string;
    destination_type?: string;
    last_error?: string;
    status: string;
}
export interface LabReportDeliveryListMatch {
    id: string;
}
export interface LabReportFile {
    filename?: string;
    presigned_url: string;
}
export interface LabReportFileListMatch {
    id: string;
}
export interface Menstruation {
}
export interface MenstruationLoadMatch {
}
export interface Nutrition {
}
export interface NutritionLoadMatch {
}
export interface PlannedWorkout {
    athlete_metrics?: any;
    coercion_warnings?: string;
    created_at?: any;
    details?: any;
    is_external?: boolean;
    last_updated_at?: any;
    planned_date?: string;
    planned_workout_id?: string;
    provider_workout_id?: string;
    workout_id?: string;
}
export interface PlannedWorkoutLoadMatch {
    id: number;
}
export interface PlannedWorkoutListMatch {
    athlete_metrics?: any;
    coercion_warnings?: string;
    created_at?: any;
    details?: any;
    is_external?: boolean;
    last_updated_at?: any;
    planned_date?: string;
    planned_workout_id?: string;
    provider_workout_id?: string;
    workout_id?: string;
}
export interface PlannedWorkoutUpdateData {
    id: number;
    athlete_metrics?: any;
    coercion_warnings?: string;
    created_at?: any;
    details?: any;
    is_external?: boolean;
    last_updated_at?: any;
    planned_date?: string;
    planned_workout_id?: string;
    provider_workout_id?: string;
    workout_id?: string;
}
export interface Sleep {
}
export interface SleepLoadMatch {
}
export interface User {
}
export interface UserLoadMatch {
}
export interface Workout {
    description?: string;
    environment?: any;
    estimated_calories?: any;
    estimated_distance_meters?: any;
    estimated_duration_seconds?: any;
    ftp?: number;
    max_heart_rate?: number;
    name: string;
    planned_date: string;
    pool_length_meters?: any;
    sport: any;
    status?: string;
    step_blocks: any[];
    threshold_heart_rate?: number;
    threshold_speed?: number;
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
    ftp?: number;
    max_heart_rate?: number;
    name?: string;
    planned_date?: string;
    pool_length_meters?: any;
    sport?: any;
    status?: string;
    step_blocks?: any[];
    threshold_heart_rate?: number;
    threshold_speed?: number;
    workout_id?: string;
}
export interface WorkoutCreateData {
    description?: string;
    environment?: any;
    estimated_calories?: any;
    estimated_distance_meters?: any;
    estimated_duration_seconds?: any;
    ftp?: number;
    max_heart_rate?: number;
    name: string;
    planned_date: string;
    pool_length_meters?: any;
    sport: any;
    status?: string;
    step_blocks: any[];
    threshold_heart_rate?: number;
    threshold_speed?: number;
    workout_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkoutRemoveMatch {
    planned_workout_id: number;
}
