import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }
}