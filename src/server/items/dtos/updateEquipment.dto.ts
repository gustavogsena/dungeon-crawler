import { Type } from "class-transformer"
import { IItem } from "../items.schema"
import { IsObject, IsOptional } from "class-validator"
import { CreateItemDto } from "./createItem.dto"

export class UpdateEquipmentDto {

    @IsObject()
    @IsOptional()
    @Type(() => CreateItemDto)
    rightHand?: IItem | undefined

    @IsObject()
    @IsOptional()
    @Type(() => CreateItemDto)
    leftHand?: IItem | undefined

    @IsObject()
    @IsOptional()
    @Type(() => CreateItemDto)
    helmet?: IItem | undefined

    @IsObject()
    @IsOptional()
    @Type(() => CreateItemDto)
    armor?: IItem | undefined

    @IsObject()
    @IsOptional()
    @Type(() => CreateItemDto)
    boots?: IItem | undefined
}