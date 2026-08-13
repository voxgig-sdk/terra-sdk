import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { LabReport, LabReportLoadMatch, LabReportListMatch, LabReportCreateData, LabReportRemoveMatch } from '../TerraTypes';
declare class LabReportEntity extends TerraEntityBase<LabReport> {
    constructor(client: TerraSDK, entopts: any);
    make(this: LabReportEntity): LabReportEntity;
    load(this: any, reqmatch?: LabReportLoadMatch, ctrl?: Control): Promise<LabReport>;
    list(this: any, reqmatch?: LabReportListMatch, ctrl?: Control): Promise<LabReport[]>;
    create(this: any, reqdata?: LabReportCreateData, ctrl?: Control): Promise<LabReport>;
    remove(this: any, reqmatch?: LabReportRemoveMatch, ctrl?: Control): Promise<LabReport>;
}
export { LabReportEntity };
