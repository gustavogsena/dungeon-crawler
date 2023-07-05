import { IsNumber, Max, Min } from "class-validator"

export class CreateCombatStatusDto {
    @IsNumber()
    @Min(0)
    attack: number

    @IsNumber()
    @Min(0)
    defense: number

    @IsNumber()
    @Min(0)
    health: number

    @IsNumber()
    @Min(0)
    mana: number

    @IsNumber()
    @Min(0)
    block: number

}