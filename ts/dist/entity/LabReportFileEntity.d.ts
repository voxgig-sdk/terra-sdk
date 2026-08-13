import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { LabReportFile, LabReportFileListMatch } from '../TerraTypes';
declare class LabReportFileEntity extends TerraEntityBase<LabReportFile> {
    constructor(client: TerraSDK, entopts: any);
    make(this: LabReportFileEntity): LabReportFileEntity;
    list(this: any, reqmatch?: LabReportFileListMatch, ctrl?: Control): Promise<LabReportFile[]>;
}
export { LabReportFileEntity };
