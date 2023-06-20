import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {

    @Matches(/^[a-z]+/, {
        message: "Nome de usuário deve conter apenas letras minusculas"
    })
    @MinLength(4, {
        message: "Nome de usuário deve conter no minimo 4 caracteres"
    })
    @MaxLength(16, {
        message: "Nome de usuário deve conter no maximo 16 caracteres"
    })
    username: string;

    @MinLength(2, {
        message: "Nome deve conter no minimo 2 caracteres"
    })
    @MaxLength(16, {
        message: "Nome deve conter no maximo 16 caracteres"
    })
    name: string;

    @MinLength(2, {
        message: "Sobrenome deve conter no minimo 2 caracteres"
    })
    @MaxLength(32, {
        message: "Sobrenome deve conter no maximo 32 caracteres"
    })
    surname: string;

    @MinLength(6, {
        message: "Senha deve conter no minimo 6 caracteres"
    })
    @MaxLength(48, {
        message: "Senha deve conter no maximo 48 caracteres"
    })
    password: string;


    @MinLength(4)
    @MaxLength(48)
    @IsEmail({},{ message: 'E-mail invalido'})
    email: string;

}