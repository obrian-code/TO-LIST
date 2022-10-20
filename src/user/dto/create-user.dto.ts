import {
    Length,
    IsString,
    IsEmail,
    IsNotEmpty
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50, { message: "el nombre debe tener como minimo 3 caracteres y como maximo 50" })
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(10, 100, { message: "el correo debe tener como minimo 15 caracteres y como maximo 100" })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: "el contraseña debe tener como minimo 6 caracteres y como maximo 50" })
    readonly password: string;


    readonly refreshToken: string;
}