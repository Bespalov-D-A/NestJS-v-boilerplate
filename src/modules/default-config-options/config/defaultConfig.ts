import { defaultRolesName } from "src/modules/roles/assests/defaultRoles";

interface IdefaultConfig {
    defaultRole: defaultRolesName //Role for new users
}

export const defaultConfig:IdefaultConfig = {defaultRole: defaultRolesName.User}