import { Length, IsNotEmpty, IsString } from "class-validator"
export class CreateTareaDto {

    //@IsNotEmpty()
    //@IsString()
    readonly idUsuario: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50, { message: "la tarea debe tener como minimo 5 caracteres y como maximo 50" })
    readonly tarea: string;
}

