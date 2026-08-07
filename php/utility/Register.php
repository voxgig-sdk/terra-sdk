<?php
declare(strict_types=1);

// Terra SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TerraUtility::setRegistrar(function (TerraUtility $u): void {
    $u->clean = [TerraClean::class, 'call'];
    $u->done = [TerraDone::class, 'call'];
    $u->make_error = [TerraMakeError::class, 'call'];
    $u->feature_add = [TerraFeatureAdd::class, 'call'];
    $u->feature_hook = [TerraFeatureHook::class, 'call'];
    $u->feature_init = [TerraFeatureInit::class, 'call'];
    $u->fetcher = [TerraFetcher::class, 'call'];
    $u->make_fetch_def = [TerraMakeFetchDef::class, 'call'];
    $u->make_context = [TerraMakeContext::class, 'call'];
    $u->make_options = [TerraMakeOptions::class, 'call'];
    $u->make_request = [TerraMakeRequest::class, 'call'];
    $u->make_response = [TerraMakeResponse::class, 'call'];
    $u->make_result = [TerraMakeResult::class, 'call'];
    $u->make_point = [TerraMakePoint::class, 'call'];
    $u->make_spec = [TerraMakeSpec::class, 'call'];
    $u->make_url = [TerraMakeUrl::class, 'call'];
    $u->param = [TerraParam::class, 'call'];
    $u->prepare_auth = [TerraPrepareAuth::class, 'call'];
    $u->prepare_body = [TerraPrepareBody::class, 'call'];
    $u->prepare_headers = [TerraPrepareHeaders::class, 'call'];
    $u->prepare_method = [TerraPrepareMethod::class, 'call'];
    $u->prepare_params = [TerraPrepareParams::class, 'call'];
    $u->prepare_path = [TerraPreparePath::class, 'call'];
    $u->prepare_query = [TerraPrepareQuery::class, 'call'];
    $u->result_basic = [TerraResultBasic::class, 'call'];
    $u->result_body = [TerraResultBody::class, 'call'];
    $u->result_headers = [TerraResultHeaders::class, 'call'];
    $u->transform_request = [TerraTransformRequest::class, 'call'];
    $u->transform_response = [TerraTransformResponse::class, 'call'];
});
