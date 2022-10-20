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
}