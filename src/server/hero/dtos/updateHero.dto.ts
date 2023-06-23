import { IsArray, IsNumber, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator"
import { IItem } from "../../items/items.schema"
import { UpdateStatusDto } from "./updateStatus.dto"
import { Type } from "class-transformer"
import { UpdateEquipmentDto } from "../../items/dtos/updateEquipment.dto"

export class UpdateHeroDto {

    @IsString()
    @IsOptional()
    @MinLength(2, { message: 'Nome deve conter no minimo 2 caracteres' })
    @MaxLength(16, { message: 'Nome deve conter no máximo 16 caracteres' })
    name: string

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(99)
    level: number

    @IsNumber()
    @IsOptional()
    @Min(0)
    experience: number

    @IsNumber()
    @IsOptional()
    @Min(0)
    gold: number

    @ValidateNested()
    @IsObject()
    @IsOptional()
    @Type(() => UpdateStatusDto)
    status: UpdateStatusDto

    @ValidateNested()
    @IsObject()
    @IsOptional()
    @Type(() => UpdateEquipmentDto)
    equipment: UpdateEquipmentDto

    
    @IsArray()
    @IsOptional()
    inventory: IItem[]
}