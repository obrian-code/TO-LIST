import {
    Length,
    IsString,
    IsEmail,
    IsNotEmpty
} from 'class-validator';


export class LoginAuthDto {

    @IsEmail()
    @IsString()
    @Length(3, 50, { message: "el Correo debe tener como minimo 3 caracteres y como maximo 50" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: "el contraseña debe tener como minimo 6 caracteres y como maximo 50" })
    password: string;

}
