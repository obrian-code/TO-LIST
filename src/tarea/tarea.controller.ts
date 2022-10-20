import { CreateTareaDto } from './dto/create-tarea.dto';
import { Body, Controller, Post } from '@nestjs/common/decorators';
import { TareaService } from './tarea.service';

@Controller("tarea")
export class TareaController {
    constructor(private readonly tareaService: TareaService) { }

    @Post()
    async create(@Body() createTareaDto: CreateTareaDto) {
        return await this.tareaService.create(createTareaDto)
    }
}