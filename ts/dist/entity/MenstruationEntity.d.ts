import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Menstruation, MenstruationLoadMatch } from '../TerraTypes';
declare class MenstruationEntity extends TerraEntityBase<Menstruation> {
    constructor(client: TerraSDK, entopts: any);
    make(this: MenstruationEntity): MenstruationEntity;
    load(this: any, reqmatch?: MenstruationLoadMatch, ctrl?: Control): Promise<Menstruation>;
}
export { MenstruationEntity };
