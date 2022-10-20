import { CreateTareaDto } from './dto/create-tarea.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tarea, TareaDocument } from "./schemas/tarea.schema";

@Injectable()
export class TareaService {
    constructor(
        @InjectModel(Tarea.name) private readonly tareaModel: Model<TareaDocument>,
    ) { }

    async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
        return this.tareaModel.create(createTareaDto);
    }

    async findAllForUser(idUser: string): Promise<Tarea[]> {
        return this.tareaModel.find({ idUsuario: idUser }).select("tarea").exec()
    }

    async update(idTarea: string, tareaActualizada: CreateTareaDto): Promise<Tarea> {
        return this.tareaModel.findByIdAndUpdate({ _id: idTarea }, tareaActualizada, { new: true })
    }

    async remove(idTarea: string) {
        return this.tareaModel.findByIdAndRemove({ _id: idTarea }).exec();
    }
}