# Terra SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TerraUtility.registrar = ->(u) {
  u.clean = TerraUtilities::Clean
  u.clean_add = TerraUtilities::CleanAdd
  u.clean_explain = TerraUtilities::CleanExplain
  u.done = TerraUtilities::Done
  u.make_error = TerraUtilities::MakeError
  u.feature_add = TerraUtilities::FeatureAdd
  u.feature_hook = TerraUtilities::FeatureHook
  u.feature_init = TerraUtilities::FeatureInit
  u.fetcher = TerraUtilities::Fetcher
  u.make_fetch_def = TerraUtilities::MakeFetchDef
  u.make_context = TerraUtilities::MakeContext
  u.make_options = TerraUtilities::MakeOptions
  u.make_request = TerraUtilities::MakeRequest
  u.make_response = TerraUtilities::MakeResponse
  u.make_result = TerraUtilities::MakeResult
  u.make_point = TerraUtilities::MakePoint
  u.make_spec = TerraUtilities::MakeSpec
  u.make_url = TerraUtilities::MakeUrl
  u.param = TerraUtilities::Param
  u.prepare_auth = TerraUtilities::PrepareAuth
  u.prepare_body = TerraUtilities::PrepareBody
  u.prepare_headers = TerraUtilities::PrepareHeaders
  u.prepare_method = TerraUtilities::PrepareMethod
  u.prepare_params = TerraUtilities::PrepareParams
  u.prepare_path = TerraUtilities::PreparePath
  u.prepare_query = TerraUtilities::PrepareQuery
  u.graphql_body = TerraUtilities::GraphqlBody
  u.graphql_errors = TerraUtilities::GraphqlErrors
  u.result_basic = TerraUtilities::ResultBasic
  u.result_body = TerraUtilities::ResultBody
  u.result_headers = TerraUtilities::ResultHeaders
  u.transform_request = TerraUtilities::TransformRequest
  u.transform_response = TerraUtilities::TransformResponse
}
