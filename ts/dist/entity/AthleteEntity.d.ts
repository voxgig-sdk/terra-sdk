import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Athlete, AthleteLoadMatch } from '../TerraTypes';
declare class AthleteEntity extends TerraEntityBase<Athlete> {
    constructor(client: TerraSDK, entopts: any);
    make(this: AthleteEntity): AthleteEntity;
    load(this: any, reqmatch?: AthleteLoadMatch, ctrl?: Control): Promise<AthleteEntity>;
}
export { AthleteEntity };
