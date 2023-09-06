import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Role } from "./roles.model";
import { User } from "../users/users.model";

@Table({ createdAt: false, updatedAt:false })
export class UserRoles extends Model<UserRoles> {

  @ForeignKey(()=>Role)
  @Column
  roleId: number;


  @ForeignKey(()=>User)
  @Column
  userId: number;

}
