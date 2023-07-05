import { IsArray, IsNumber, IsObject, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator"
import { monsterAction } from "../monster.schema"
import { Type } from "class-transformer"
import { CreateStatusDto } from "../../hero/dtos/updateStatus.dto"
import type { IStatus } from "../../hero/hero.schema"
import { CreateCombatStatusDto } from "./createCombatStatus.dto"

export class CreateMonsterDto {

    @IsString()
    @MinLength(6)
    @MaxLength(32)
    name: string

    @IsArray()
    actions: monsterAction[]

    @IsString()
    imageUrl: string

    @IsNumber()
    @Min(0)
    @Max(4)
    difficulty: number

    @IsArray()
    elements: string[]

    @IsArray()
    reward: number[]

    @ValidateNested()
    @IsObject()
    @Type(() => CreateStatusDto)
    status: IStatus

    @ValidateNested()
    @IsObject()
    @Type(() => CreateCombatStatusDto)
    combatStatus: CreateCombatStatusDto
}