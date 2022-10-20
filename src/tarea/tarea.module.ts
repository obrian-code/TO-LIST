import { TareaController } from './tarea.controller';
import { TareaService } from './tarea.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { Tarea, TareSchema } from './schemas/tarea.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Tarea.name, schema: TareSchema }])],
    controllers: [TareaController],
    providers: [TareaService],
})

export class TareaModule { }