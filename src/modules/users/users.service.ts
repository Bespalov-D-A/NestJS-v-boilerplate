import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
    ) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.gerRoleByValue('Student')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all:true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where:{email}, include: {all:true}, raw: true})
        return user
    }

    async giveRole(dto: GiveRoleDto) {
        console.log('fffffffffff')
        const user = await this.userRepository.findByPk(dto.userId)
        console.log('zzzzzzzzzzzzzz')
        console.log(user)
        const role = await this.roleService.gerRoleByValue(dto.value)
        console.log(',,,,,,,,,,,,,,,,,,,,,,')
        console.log(role)
        if(role && user) {
            //add - added value from existed propertie
            console.log('!!!!!!!!!!!!!!!!')
            await user.$add('role', role.id) 
            return dto
        }
        throw new HttpException('User or role was not find', HttpStatus.NOT_FOUND)
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        user.banned = true
        user.banReason = dto.banReason
        //обновляем значения в БД
        await user.save()
        return user
    }
}
