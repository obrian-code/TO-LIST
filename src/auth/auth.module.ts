import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
// import { RefreshTokenStrategy } from "./strategies/RefreshToken.strategy";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import config from "src/config/config";
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    JwtModule.register({
      secret: config().JWT.SECRET,
      signOptions: { expiresIn: '60s' },
    })

  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
  /*
   providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  */
  exports:[AuthService, PassportModule],
})

export class AuthModule { }
