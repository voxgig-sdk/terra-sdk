import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Daily, DailyLoadMatch } from '../TerraTypes';
declare class DailyEntity extends TerraEntityBase<Daily> {
    constructor(client: TerraSDK, entopts: any);
    make(this: DailyEntity): DailyEntity;
    load(this: any, reqmatch?: DailyLoadMatch, ctrl?: Control): Promise<Daily>;
}
export { DailyEntity };
