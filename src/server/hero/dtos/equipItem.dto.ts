import { IsString } from "class-validator"

export class EquipItemDto {
    
    @IsString()
    heroId: string

    @IsString()
    itemName: string
}