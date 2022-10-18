import {
    Length,
    validate
  } from 'class-validator';

export class CreateUserDto {
    @Length(3,50)
    readonly nombre: string;

    @Length(15,100)
    readonly correo: string;

    @Length(6,20)
    readonly contraseña: string;
}

validate(CreateUserDto).then(errors =>{
    if(errors.length>0){
        console.log("error de validacion", errors);
    }else{
        console.log("paso validaciones")
    }
})