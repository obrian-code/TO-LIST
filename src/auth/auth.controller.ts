import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';


// @ApiTags ('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() userObject: RegisterAuthDto) {

    console.log({ body: userObject });
    return this.authService.register(userObject);
  }


  @Post('login')
  login(@Body() userObject: LoginAuthDto) {

    console.log({ body: userObject });
    return this.authService.login(userObject);
  }


}
