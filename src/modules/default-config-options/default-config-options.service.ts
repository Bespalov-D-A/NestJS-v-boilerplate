import { Inject, Injectable } from '@nestjs/common';
import { IConfigOptions } from 'src/interfaces/providers';
import { defaultRolesName } from '../roles/assests/defaultRoles';
import { MODULE_OPTIONS_TOKEN } from './default-config-options.defenition';
import { CONFIG_OPTIONS } from 'src/helpers/constants';

@Injectable()
export class DefaultConfigOptionsService {
    constructor(@Inject(CONFIG_OPTIONS) private options: IConfigOptions) {
    }

    getDefaultRole(): defaultRolesName {
        return this.options.defaultRole
    }
}
