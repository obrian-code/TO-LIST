import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './jwt.constants';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
    })],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
})

export class UserModule { }