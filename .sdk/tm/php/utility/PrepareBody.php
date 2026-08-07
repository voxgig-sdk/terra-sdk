<?php
declare(strict_types=1);

// Terra SDK utility: prepare_body

class TerraPrepareBody
{
    public static function call(TerraContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
