import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { LabReportSession, LabReportSessionLoadMatch, LabReportSessionListMatch, LabReportSessionCreateData } from '../TerraTypes';
declare class LabReportSessionEntity extends TerraEntityBase<LabReportSession> {
    constructor(client: TerraSDK, entopts: any);
    make(this: LabReportSessionEntity): LabReportSessionEntity;
    load(this: any, reqmatch?: LabReportSessionLoadMatch, ctrl?: Control): Promise<LabReportSessionEntity>;
    list(this: any, reqmatch?: LabReportSessionListMatch, ctrl?: Control): Promise<LabReportSessionEntity[]>;
    create(this: any, reqdata?: LabReportSessionCreateData, ctrl?: Control): Promise<LabReportSessionEntity>;
}
export { LabReportSessionEntity };
