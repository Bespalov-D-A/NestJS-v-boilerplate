import { Body, Controller, Get, Post, UseGuards, UsePipes,  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { GiveRoleDto } from './dto/give-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipes';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles-auth.decorator';

@ApiTags('Users controller')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {

    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }


    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: User})
    @Roles('Student')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers(); 
    }

    @ApiOperation({summary: 'Give role for user'})
    @ApiResponse({status: 200})
    // @Roles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/give-role')
    giveRole(@Body() dto: GiveRoleDto) {
        return this.userService.giveRole(dto); 
    }

   @ApiOperation({summary: 'To ban user'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/ban')
    ToBanUser(@Body() dto: BanUserDto) {
        return this.userService.banUser(dto); 
    }
  
}
