import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Integration, IntegrationListMatch } from '../TerraTypes';
declare class IntegrationEntity extends TerraEntityBase<Integration> {
    constructor(client: TerraSDK, entopts: any);
    make(this: IntegrationEntity): IntegrationEntity;
    list(this: any, reqmatch?: IntegrationListMatch, ctrl?: Control): Promise<IntegrationEntity[]>;
}
export { IntegrationEntity };
