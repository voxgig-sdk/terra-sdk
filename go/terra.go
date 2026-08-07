package voxgigterrasdk

import (
	"github.com/voxgig-sdk/terra-sdk/go/core"
	"github.com/voxgig-sdk/terra-sdk/go/entity"
	"github.com/voxgig-sdk/terra-sdk/go/feature"
	_ "github.com/voxgig-sdk/terra-sdk/go/utility"
)

// Type aliases preserve external API.
type TerraSDK = core.TerraSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TerraEntity = core.TerraEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TerraError = core.TerraError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewActivityEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewActivityEntity(client, entopts)
	}
	core.NewAthleteEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewAthleteEntity(client, entopts)
	}
	core.NewAuthenticationEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewAuthenticationEntity(client, entopts)
	}
	core.NewBodyEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewBodyEntity(client, entopts)
	}
	core.NewBulkUserInfoEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewBulkUserInfoEntity(client, entopts)
	}
	core.NewDailyEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewDailyEntity(client, entopts)
	}
	core.NewIntegrationEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewIntegrationEntity(client, entopts)
	}
	core.NewLabReportEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewLabReportEntity(client, entopts)
	}
	core.NewLabReportDeliveryEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewLabReportDeliveryEntity(client, entopts)
	}
	core.NewLabReportFileEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewLabReportFileEntity(client, entopts)
	}
	core.NewMenstruationEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewMenstruationEntity(client, entopts)
	}
	core.NewNutritionEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewNutritionEntity(client, entopts)
	}
	core.NewPlannedWorkoutEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewPlannedWorkoutEntity(client, entopts)
	}
	core.NewSleepEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewSleepEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewUserEntity(client, entopts)
	}
	core.NewWorkoutEntityFunc = func(client *core.TerraSDK, entopts map[string]any) core.TerraEntity {
		return entity.NewWorkoutEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTerraSDK = core.NewTerraSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTerraSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TerraSDK  { return NewTerraSDK(nil) }
func Test() *TerraSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
