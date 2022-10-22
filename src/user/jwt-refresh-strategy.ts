import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import config from 'src/config/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: config().JWT.REFRESH
        })
    }

    async validate(payload: any) {
        return { id: payload.id, nombre: payload.nombre };
    }
//  https://codenip.tech/2021/11/13/sistema-de-autenticacion-con-nestjs-semana-4/
}