import { IsArray, IsString, MaxLength, MinLength, IsNumber } from "class-validator";


export class CreateDungeonDto {
    @IsString()
    @MinLength(6)
    @MaxLength(24)
    name: string;

    @IsArray()
    monsters: string[];

    @MinLength(8)
    @MaxLength(48)
    @IsString()
    background: string;

    @IsArray()
    reward: number[];

    @IsNumber()
    difficulty: number;
}