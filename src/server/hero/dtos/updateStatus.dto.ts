import { IsNumber, IsOptional, Max, Min } from "class-validator"

export class UpdateStatusDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(99)
    strength: number

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(99)
    agility: number
    
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(99)
    intelligence: number
    
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(99)
    faith: number
}