import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from "./../../config/config";

// type JwtPayload = {
//     sub: string;
//     username: string;
// }

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config().JWT.SECRET
        })
    }


    validate(payload: any) {
        return { userId: payload.id };
    }

}