import { TerraEntityBase } from '../TerraEntityBase';
import type { TerraSDK } from '../TerraSDK';
import type { Control } from '../types';
import type { Authentication, AuthenticationCreateData, AuthenticationRemoveMatch } from '../TerraTypes';
declare class AuthenticationEntity extends TerraEntityBase<Authentication> {
    constructor(client: TerraSDK, entopts: any);
    make(this: AuthenticationEntity): AuthenticationEntity;
    create(this: any, reqdata?: AuthenticationCreateData, ctrl?: Control): Promise<AuthenticationEntity>;
    remove(this: any, reqmatch?: AuthenticationRemoveMatch, ctrl?: Control): Promise<AuthenticationEntity>;
}
export { AuthenticationEntity };
