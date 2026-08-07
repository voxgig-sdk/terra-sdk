<?php
declare(strict_types=1);

// Terra SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TerraMakeContext
{
    public static function call(array $ctxmap, ?TerraContext $basectx): TerraContext
    {
        return new TerraContext($ctxmap, $basectx);
    }
}
