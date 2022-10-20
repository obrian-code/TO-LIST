import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Model } from "mongoose";
import { hash, compare } from "bcrypt";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()

export class AuthService {

  constructor(

    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {

  }

  async register(userObject: RegisterAuthDto) {

    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash }

    const user = await this.userModel.create(userObject);

    const payload = { id: user._id }
    const token = this.jwtService.sign(payload)

    return { token };

  }

  async login(userObject: LoginAuthDto) {

    const { email, password } = userObject;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new HttpException('Correo o contaseña incorrecta', 404);

    const checkPass = await compare(password, user.password);
    if (!checkPass) throw new HttpException('Correo o contaseña incorrecta', 403);

    const payload = { id: user._id }
    const token = this.jwtService.sign(payload)

    return { token };


  }


}
