import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { contrasena } = createUserDto;
        const hash = await bcrypt.hash(contrasena, 10);
        createUserDto = { ...createUserDto, contrasena: hash }

        return this.userModel.create(createUserDto);
    }
}