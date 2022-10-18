import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

export default () => {
    return ({
        JWT: {
            SECRET: process.env.JWTSECRET || "devsecrettoken",
            REFRESH: process.env.JWTREFRESH || "devrefreshtoken",
        },

        DB: {
            HOST: process.env.DATABASE_HOST || "mongodb://localhost",
            PORT: parseInt(process.env.DATABASE_PORT) || 27017,
            DATABASE: process.env.DATABASE_NAME || "dbExample",
            USER: process.env.DATABASE_USER || "root",
            PASSWORD: process.env.DATABASE_PASS || "",
        },

        SERVER: {
            PORT: parseInt(config.get("PORT")) || 3000,
        },
    })
}
