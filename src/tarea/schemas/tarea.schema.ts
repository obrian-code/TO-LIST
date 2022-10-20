import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TareaDocument = Tarea & Document;

@Schema()
export class Tarea {
    @Prop({ required: true })
    idUsuario: string;

    @Prop({ required: true })
    tarea: string;
}

export const TareSchema = SchemaFactory.createForClass(Tarea)