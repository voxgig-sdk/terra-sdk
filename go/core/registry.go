package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewActivityEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewAthleteEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewAuthenticationEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewBodyEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewBulkUserInfoEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewDailyEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewIntegrationEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewLabReportEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewLabReportDeliveryEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewLabReportFileEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewMenstruationEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewNutritionEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewPlannedWorkoutEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewSleepEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewUserEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

var NewWorkoutEntityFunc func(client *TerraSDK, entopts map[string]any) TerraEntity

