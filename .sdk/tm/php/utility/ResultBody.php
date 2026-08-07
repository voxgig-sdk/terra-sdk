<?php
declare(strict_types=1);

// Terra SDK utility: result_body

class TerraResultBody
{
    public static function call(TerraContext $ctx): ?TerraResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
