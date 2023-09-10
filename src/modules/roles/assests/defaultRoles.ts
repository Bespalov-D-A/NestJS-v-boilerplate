import { CreateRoleDto } from "../dto/create-role.dto";

export enum defaultRolesName {
    User = 'User',
    Teacher = 'Teacher',
    Student = 'Student',
    Admin = 'Admin'
}

export const defaultRoles: CreateRoleDto[] = [
    {
        value: defaultRolesName.User,
        description: 'This is just user'
    },
    {
        value: defaultRolesName.Teacher,
        description: 'This is teacher'
    },

    {
        value: defaultRolesName.Student,
        description: 'This is student'
    },

    {
        value: defaultRolesName.Admin,
        description: 'This is admin'
    },
]