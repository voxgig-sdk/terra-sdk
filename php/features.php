<?php
declare(strict_types=1);

// Terra SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TerraFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TerraBaseFeature();
            case "test":
                return new TerraTestFeature();
            default:
                return new TerraBaseFeature();
        }
    }
}
