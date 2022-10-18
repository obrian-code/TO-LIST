import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import config from "./config/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(config().DB.HOST + config().DB.USER + ":" + config().DB.PASSWORD + "@" + config().DB.DATABASE + "?retryWrites=true&w=majority")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
