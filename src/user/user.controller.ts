import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Post } from "@nestjs/common";

@Controller("user")
export class UserController{
    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        await createUserDto
    }
}