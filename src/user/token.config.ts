import { JwtService } from "@nestjs/jwt";
import config from "src/config/config";
// import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
// import { Cache } from 'cache-manager';
import { UnauthorizedException } from "@nestjs/common";
import fs = require('fs');

@Injectable()
export class TokenService {

    constructor(
        // @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private jwtService: JwtService
    ) { }

    async decode(token: String) {
        const decoded = this.jwtService.verify("" + token);
        return decoded.jwtid;
    }

    async authorization(token: string) {

        const decoded = this.jwtService.verify("" + token)

        if (!decoded) { throw new UnauthorizedException('Token inválido!'); }

        const text = await fs.readFileSync(('src/user/tokens.txt'), 'utf8');

        if (text.split(/\r?\n/).includes(decoded.jwtid)) { throw new UnauthorizedException('El token de refresco ya fue usado!') };

        const object = {
            data: decoded.data,
            refresh: token,
            jwtid: decoded.jwtid
        }

        return object;
    }

    randomString(len: Number, charSet = null) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString: string = '';
        for (let i = 0; i < len; i++) {
            let randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    generateToken(data: object, jwtid = null) {

        jwtid = jwtid || this.randomString(20);
        const token = this.jwtService.sign({ data, jwtid });

        return { token, expiresIn: config().JWT.EXPIREIN_SECRET, jwtid };

    }

    generateRefreshToken(data: object, jwtid: string) {
        const expiresIn = parseInt(config().JWT.EXPIREIN_REFRESH);
        const object = { data, jwtid }
        const refreshToken = this.jwtService.sign({ data: object });
        return { refreshToken, expiresIn };

    }

    async refreshAToken(data: object, lastjwtid: string, jwtid: string) {
        await this.blacklistRefreshToken(lastjwtid);
        return this.generateRefreshToken(data, jwtid);
    }

    async blacklistRefreshToken(jwtid: string) {

        let ruta = 'src/user/tokens.txt'

        await fs.appendFile(ruta, jwtid + "\n", function (err) {
            if (err) throw err;
        })

    }

}

