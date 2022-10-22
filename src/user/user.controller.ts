import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Body, Controller, Post, HttpException, UnauthorizedException, Headers } from "@nestjs/common";

@Controller("auth")

export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async create(@Body() createUserDto: CreateUserDto) {
        const { contrasena, reContrasena } = createUserDto
        if (contrasena !== reContrasena) throw new HttpException('las contraseñas son diferentes', 403);
        return await this.userService.create(createUserDto)
    }

    @Post("login")
    async loginUser(@Body() objUserLogin: LoginAuthDto) {
        return await this.userService.login(objUserLogin)
    }

    @Post("refresh")
    async refresh(@Headers('Authorization') authorization = '') {

        const bearer = await this.userService.auth(authorization);
        return this.userService.refresh(bearer.token);

    }

    @Post("logout")
    async logout(@Headers('Authorization') authorization = '') {

        const bearer = await this.userService.auth(authorization);
        return this.userService.logout(bearer.token);

    }






}





/*
https://www.youtube.com/watch?v=Tn6QYliFBcs
https://www.youtube.com/watch?v=pLPfGBbsLrI 
https://github.com/cavanosa/nestjs-backend/blob/refresh/src/auth/auth.module.ts 
https://javascript.plainenglish.io/nestjs-implementing-access-refresh-token-jwt-authentication-97a39e448007 
https://betterprogramming.pub/jwt-and-passport-jwt-strategy-for-your-nestjs-rest-api-project-cafa9dd59890 (X)
*/