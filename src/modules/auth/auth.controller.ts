import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from 'src/modules/auth/guards/google-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {clientUrl, config} from 'src/config/config'
import * as randomstring from 'randomstring';


@ApiTags('Authorazation controller')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get('test')
  test(@Req() req) {
    console.log(req.headers.cookie)
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
   async googleAuthCallback(@Req() req, @Res() res) {
    const candidate = await this.userService.getUserByEmail(req.user.email);
    let body = {access_token: ''}
    if (candidate) {
       body = await this.authService.login({
        email: candidate.email,
        password: candidate.password,
      })
    } else {
      console.log('###################################################331y')
      console.log('###################################################331y')
      console.log(req.user)
      const password = randomstring.generate(12)
      body = await this.authService.registration({ ...req.user, password });
    }

    res.cookie('v_access_token', body.access_token, {
      maxAge: config.cookie.lifeTime,
      sameSite: true,
      secure: true,
      httpOnly: true,
    });

    return res.redirect(clientUrl + '/app');
  }
}
