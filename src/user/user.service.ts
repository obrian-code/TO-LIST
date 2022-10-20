import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { contrasena } = createUserDto;
        const hash = await bcrypt.hash(contrasena, 10);
        createUserDto = { ...createUserDto, contrasena: hash }

        return this.userModel.create(createUserDto);
    }

    async login(loginAuthDto: LoginAuthDto) {
        const { correo, contrasena } = loginAuthDto;
        const findUser = await this.userModel.findOne({ correo });
        console.log("----------------------------------------------------")
        console.log(findUser)
        console.log("----------------------------------------------------")
        if (!findUser) throw new HttpException("ingrese un usuario valido", 404);

        const userValidate = await bcrypt.compare(contrasena, findUser.contrasena);
        if (!userValidate) throw new HttpException("contraseña incorrecta", 403);

        const payload = { id: findUser._id, nombre: findUser.nombre }
        const token = this.jwtService.sign(payload);

        const data = {
            token,
            ExprireIn: '80s'
        }

        return data;
    }
}