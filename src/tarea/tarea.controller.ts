import { JwtAuthGuard } from './../user/jwt-auth.guard';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common/decorators';
import { TareaService } from './tarea.service';

@Controller("tarea")
export class TareaController {
    constructor(private readonly tareaService: TareaService) { }

    @Post()
    async create(@Body() createTareaDto: CreateTareaDto) {
        return await this.tareaService.create(createTareaDto)
    }
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findAllForUser(@Param("id") idUser: string) {
        return await this.tareaService.findAllForUser(idUser);
    }

    @Put(":id")
    async update(@Param("id") idTarea: string, @Body() tareaActualizada: CreateTareaDto) {
        return await this.tareaService.update(idTarea, tareaActualizada);
    }

    @Delete(":id")
    async remove(@Param("id") idTarea: string) {
        return await this.tareaService.remove(idTarea);
    }

}