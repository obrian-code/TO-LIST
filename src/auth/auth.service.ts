import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { hash, compare } from "bcrypt";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { sign } from "crypto";


@Injectable()

export class AuthService {

  constructor(

    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {

  }

  async register(userObject: RegisterAuthDto) {

    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash }
    // this.userModel.create(userObject)
    return 'This action adds a new auth';

  }

  async login(userObject: LoginAuthDto) {

    const { email, password } = userObject;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new HttpException('Correo o contaseña incorrecta', 404);

    const checkPass = await compare(password, user.password);
    if (!checkPass) throw new HttpException('Correo o contaseña incorrecta', 403);




    // const payload = { id: findUser.id }
    // const token =  this.jwtService.sign(payload)

    // const data = {
    //   user: findUser,
    //   token
    // }



    return `This action returns all auth`;


  }


}
