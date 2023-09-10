import { Injectable } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/auth.controller';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class AuthServiceProxy {
  constructor(private readonly authController: AuthController) {}

  async requestLogin(userDto: CreateUserDto) {
    return this.authController.login(userDto);
  }
}
