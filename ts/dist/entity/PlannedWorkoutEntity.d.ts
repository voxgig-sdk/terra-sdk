import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { PlannedWorkout, PlannedWorkoutLoadMatch, PlannedWorkoutListMatch, PlannedWorkoutUpdateData } from '../TerraTypes';
declare class PlannedWorkoutEntity extends TerraEntityBase<PlannedWorkout> {
    constructor(client: TerraSDK, entopts: any);
    make(this: PlannedWorkoutEntity): PlannedWorkoutEntity;
    load(this: any, reqmatch?: PlannedWorkoutLoadMatch, ctrl?: Control): Promise<PlannedWorkout>;
    list(this: any, reqmatch?: PlannedWorkoutListMatch, ctrl?: Control): Promise<PlannedWorkout[]>;
    update(this: any, reqdata?: PlannedWorkoutUpdateData, ctrl?: Control): Promise<PlannedWorkout>;
}
export { PlannedWorkoutEntity };
