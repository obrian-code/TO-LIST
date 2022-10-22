import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly correo: string;

    @IsNotEmpty({ message: "ingrese contraseña" })
    @IsString({ message: "deberia ser una cadena" })
    @Length(6, 20, { message: "la contraseña debe tener como minimo 6 caracteres y como maximo 50" })
    readonly contrasena: string;
}