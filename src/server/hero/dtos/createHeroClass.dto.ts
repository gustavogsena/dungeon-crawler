import { IsArray, IsNumber, IsObject, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator"
import { IItem } from "../../items/items.schema"
import { UpdateStatusDto } from "./updateStatus.dto"
import { Type } from "class-transformer"
import type { HerroClassType } from "../../../types"
import { EquipmentNameDto } from "../../items/dtos/equipmentName.dto"

export class CreateHeroClassDto {

    @IsString()
    @Matches(/^(knight|wizard|cleric|archer)$/g, { message: 'Classe inválida' })
    class: HerroClassType

    @ValidateNested()
    @IsObject()
    @Type(() => UpdateStatusDto)
    status: UpdateStatusDto

    @ValidateNested()
    @IsObject()
    @Type(() => EquipmentNameDto)
    equipment: EquipmentNameDto

    @IsArray()
    @IsOptional()
    inventory: string[]
}