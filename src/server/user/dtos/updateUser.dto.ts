import { IsArray, IsOptional, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateHeroDto } from "../../hero/dtos/updateHero.dto";

export class UpdateUserDto {
    @MinLength(2)
    @MaxLength(16)
    @IsOptional()
    name?: string;

    @MinLength(2)
    @MaxLength(24)
    @IsOptional()
    surname?: string;

    @MinLength(4)
    @MaxLength(48)
    @IsOptional()
    password?: string;

    @ValidateNested()
    @IsArray()
    @Type(() => UpdateHeroDto)
    @IsOptional()
    heroes?: UpdateHeroDto[];

}

