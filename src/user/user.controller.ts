import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Post, HttpException } from "@nestjs/common";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const { contrasena, reContrasena } = createUserDto
        if (contrasena !== reContrasena) throw new HttpException('las contraseñas son diferentes', 403);
        return await this.userService.create(createUserDto)
    }
}