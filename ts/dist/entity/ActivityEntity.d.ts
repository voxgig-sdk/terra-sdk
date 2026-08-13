import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Activity, ActivityLoadMatch } from '../TerraTypes';
declare class ActivityEntity extends TerraEntityBase<Activity> {
    constructor(client: TerraSDK, entopts: any);
    make(this: ActivityEntity): ActivityEntity;
    load(this: any, reqmatch?: ActivityLoadMatch, ctrl?: Control): Promise<Activity>;
}
export { ActivityEntity };
