
import { IsObject, IsOptional, IsString } from "class-validator"

export class EquipmentNameDto {

    @IsString()
    @IsOptional()
    rightHand?: string | undefined
    @IsString()
    @IsOptional()
    leftHand?: string | undefined
    @IsString()
    @IsOptional()
    helmet?: string | undefined
    @IsString()
    @IsOptional()
    armor?: string | undefined
    @IsString()
    @IsOptional()
    boots?: string | undefined
}