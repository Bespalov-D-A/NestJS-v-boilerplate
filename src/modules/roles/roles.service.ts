import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { defaultRolesName } from './assests/defaultRoles';

@Injectable()
export class RolesService {
  // static createRole(arg0: CreateRoleDto) {
  //   throw new Error("Method not implemented.");
  // }
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto, key?: string) {
    const findedRole = await this.gerRoleByValue(dto.value);
    if (findedRole) {
      const msg = 'This role is alreay exists';
      if (key && key === 'init') {
        console.log(msg);
        return
      } else {
        throw new HttpException(msg, HttpStatus.BAD_REQUEST);
      }
    }
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async gerRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
