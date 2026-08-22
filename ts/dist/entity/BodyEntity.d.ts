import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Body, BodyLoadMatch } from '../TerraTypes';
declare class BodyEntity extends TerraEntityBase<Body> {
    constructor(client: TerraSDK, entopts: any);
    make(this: BodyEntity): BodyEntity;
    load(this: any, reqmatch?: BodyLoadMatch, ctrl?: Control): Promise<BodyEntity>;
}
export { BodyEntity };
