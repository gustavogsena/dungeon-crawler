import {IsString, Matches, MaxLength, MinLength } from "class-validator"
import type { HeroClassType } from "../../../types"

export class CreateHeroDto {

    @IsString()
    @MinLength(2, { message: 'Nome deve conter no minimo 2 caracteres' })
    @MaxLength(16, { message: 'Nome deve conter no máximo 16 caracteres' })
    name: string

    @IsString()
    @Matches(/^(knight|wizard|cleric|archer)$/g, {message: 'Classe inválida'})
    class: HeroClassType
}