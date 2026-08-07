<?php
declare(strict_types=1);

// Terra SDK base feature

class TerraBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TerraContext $ctx, array $options): void {}
    public function PostConstruct(TerraContext $ctx): void {}
    public function PostConstructEntity(TerraContext $ctx): void {}
    public function SetData(TerraContext $ctx): void {}
    public function GetData(TerraContext $ctx): void {}
    public function GetMatch(TerraContext $ctx): void {}
    public function SetMatch(TerraContext $ctx): void {}
    public function PrePoint(TerraContext $ctx): void {}
    public function PreSpec(TerraContext $ctx): void {}
    public function PreRequest(TerraContext $ctx): void {}
    public function PreResponse(TerraContext $ctx): void {}
    public function PreResult(TerraContext $ctx): void {}
    public function PreDone(TerraContext $ctx): void {}
    public function PreUnexpected(TerraContext $ctx): void {}
}
