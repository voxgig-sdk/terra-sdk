import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { BulkUserInfo, BulkUserInfoCreateData } from '../TerraTypes';
declare class BulkUserInfoEntity extends TerraEntityBase<BulkUserInfo> {
    constructor(client: TerraSDK, entopts: any);
    make(this: BulkUserInfoEntity): BulkUserInfoEntity;
    create(this: any, reqdata?: BulkUserInfoCreateData, ctrl?: Control): Promise<BulkUserInfoEntity>;
}
export { BulkUserInfoEntity };
