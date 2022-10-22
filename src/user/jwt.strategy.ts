import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'src/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config().JWT.SECRET,
        });
    }

    async validate(payload: any) {

        return { id: payload.id, nombre: payload.nombre };
    }
}