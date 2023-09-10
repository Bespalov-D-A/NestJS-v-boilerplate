import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/userroles.model";
import { Post } from "../posts/posts.model";

interface UserCreationAttribues {
    email: string,
    password: string,
}

@Table
export class User extends Model<User, UserCreationAttribues> {
  @ApiProperty({example: '1', description: 'unique id'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, })
  id: number;

@ApiProperty({example: 'user@mail.com', description: 'User email'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  email: string;


  @ApiProperty({example: 'Password2!2004', description: 'User password'})
  @Column({ type: DataType.STRING, allowNull: false})
  password: string;


  @ApiProperty({example: 'true', description: 'If user is banned'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;


  @ApiProperty({example: 'By hate', description: 'Cause of the ban'})
  @Column({ type: DataType.STRING})
  banReason: string;


  @BelongsToMany(()=> Role, () => UserRoles)
  roles: Role[]

  @HasMany(() => Post)
  posts: Post[]
}
