import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { LabReportDelivery, LabReportDeliveryListMatch } from '../TerraTypes';
declare class LabReportDeliveryEntity extends TerraEntityBase<LabReportDelivery> {
    constructor(client: TerraSDK, entopts: any);
    make(this: LabReportDeliveryEntity): LabReportDeliveryEntity;
    list(this: any, reqmatch?: LabReportDeliveryListMatch, ctrl?: Control): Promise<LabReportDeliveryEntity[]>;
}
export { LabReportDeliveryEntity };
