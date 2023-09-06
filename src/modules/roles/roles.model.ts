import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "./userroles.model";
import { User } from "../users/users.model";

interface RoleCreationAttribues {
    value: string,
    description: string,
}

@Table
export class Role extends Model<Role, RoleCreationAttribues> {

  @ApiProperty({example: '1', description: 'unique id'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, })
  id: number;


  @ApiProperty({example: 'Teacher', description: 'Role name'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  value: string;


  @ApiProperty({example: 'This role can connect students', description: 'Role description'})
  @Column({ type: DataType.STRING, allowNull: false})
  description: string;


  @BelongsToMany(()=> User, ()=> UserRoles)
  users: User[]
}
