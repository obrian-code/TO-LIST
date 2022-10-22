import { TareaModule } from './tarea/tarea.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import config from "./config/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
    }),
    MongooseModule.forRoot(config().DB.HOST + config().DB.USER + ":" + config().DB.PASSWORD + "@" + config().DB.DATABASE + "?retryWrites=true&w=majority"),
    UserModule,
    TareaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
