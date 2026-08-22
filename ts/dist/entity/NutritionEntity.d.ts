import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Nutrition, NutritionLoadMatch } from '../TerraTypes';
declare class NutritionEntity extends TerraEntityBase<Nutrition> {
    constructor(client: TerraSDK, entopts: any);
    make(this: NutritionEntity): NutritionEntity;
    load(this: any, reqmatch?: NutritionLoadMatch, ctrl?: Control): Promise<NutritionEntity>;
}
export { NutritionEntity };
