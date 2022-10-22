import { Injectable, HttpException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
// import { JwtService } from "@nestjs/jwt";
// import config from "src/config/config";
// import { TokenDto } from "./dto/token.dto";
import { TokenService } from "./token.config";



@Injectable()
export class UserService {

    constructor(

        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly tokenService: TokenService,
        // private jwtService: JwtService,

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
        if (!findUser) throw new HttpException("ingrese un usuario valido", 404);

        const userValidate = await bcrypt.compare(contrasena, findUser.contrasena);
        if (!userValidate) throw new HttpException("contraseña incorrecta", 403);

        const payload = { id: findUser._id, nombre: findUser.nombre }

        const generateToken = this.tokenService.generateToken(payload);
        const generateRefreshToken = this.tokenService.generateRefreshToken(payload, generateToken.jwtid);

        const data = {
            token: generateToken.token,
            refresh: generateRefreshToken.refreshToken,
            expiresIn: generateToken.expiresIn
        }

        return data;

    }

    async refresh(Token: String): Promise<any> {

        const authorization = await this.tokenService.authorization("" + Token);
        const generateToken = await this.tokenService.generateToken(authorization.data);
        const refreshToken = await this.tokenService.refreshAToken(authorization.data, authorization.jwtid, generateToken.jwtid);

        const data = {
            token: generateToken.token,
            expiresIn: generateToken.expiresIn,
            refreshToken: refreshToken.refreshToken

        }

        return data;
    }

    async logout(Token: String): Promise<any> {
        const jwtid = await this.tokenService.decode("" + Token);
        await this.tokenService.blacklistRefreshToken(jwtid);
        return "sessión caducada";
    }

    async auth(authorization: string) {
        let bearer: string = '';

        if (typeof authorization != 'undefined') {
            bearer = authorization.replace('Bearer ', '');
        }
        if (bearer === '') {
            throw new UnauthorizedException('Token inválido!');
        }

        return { token: bearer };
    }
}


