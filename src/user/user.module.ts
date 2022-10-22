import { JwtStrategy } from './jwt.strategy';
// import { jwtConstants } from './jwt.constants';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { PassportModule } from "@nestjs/passport";
import { JwtRefreshStrategy } from './jwt-refresh-strategy';
import { TokenService } from './token.config';
// import { CacheModule } from '@nestjs/common/cache'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: config().JWT.SECRET,
            signOptions: { expiresIn: config().JWT.EXPIREIN_SECRET },
        }),
        PassportModule,
        // CacheModule.register(
        //     {imports: [TokenService],}
        // )
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy, JwtRefreshStrategy, TokenService],
    exports: [
        JwtStrategy,
        JwtRefreshStrategy,
        PassportModule,
    ]
})

export class UserModule { }