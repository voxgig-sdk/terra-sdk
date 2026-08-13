import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Workout, WorkoutLoadMatch, WorkoutListMatch, WorkoutCreateData, WorkoutRemoveMatch } from '../TerraTypes';
declare class WorkoutEntity extends TerraEntityBase<Workout> {
    constructor(client: TerraSDK, entopts: any);
    make(this: WorkoutEntity): WorkoutEntity;
    load(this: any, reqmatch?: WorkoutLoadMatch, ctrl?: Control): Promise<Workout>;
    list(this: any, reqmatch?: WorkoutListMatch, ctrl?: Control): Promise<Workout[]>;
    create(this: any, reqdata?: WorkoutCreateData, ctrl?: Control): Promise<Workout>;
    remove(this: any, reqmatch?: WorkoutRemoveMatch, ctrl?: Control): Promise<Workout>;
}
export { WorkoutEntity };
