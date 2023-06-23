import { IsString } from "class-validator"

export class BuyItemBodyDto {
    
    @IsString()
    heroId: string

    @IsString()
    itemName: string
}