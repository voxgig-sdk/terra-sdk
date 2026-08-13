import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Sleep, SleepLoadMatch } from '../TerraTypes';
declare class SleepEntity extends TerraEntityBase<Sleep> {
    constructor(client: TerraSDK, entopts: any);
    make(this: SleepEntity): SleepEntity;
    load(this: any, reqmatch?: SleepLoadMatch, ctrl?: Control): Promise<Sleep>;
}
export { SleepEntity };
