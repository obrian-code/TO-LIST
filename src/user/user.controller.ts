import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Body, Controller, Post, HttpException } from "@nestjs/common";

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
}