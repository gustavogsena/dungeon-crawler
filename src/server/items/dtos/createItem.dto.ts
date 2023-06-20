import { IsBoolean, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "class-validator"

export class CreateItemDto {
    @IsString()
    @MinLength(2, { message: 'Nome do item deve conter pelo menos 2 caracteres' })
    @MaxLength(24, { message: 'Nome do item deve conter no máximo 24 caracteres' })
    name: string

    @IsString()
    @Matches(/^\/.*\.(png|jpe?g|gif)$/g)
    imageUrl: string

    @IsNumber()
    @Min(1, { message: 'Level do item deve ser maior que 0' })
    level: number

    @Matches(/^(common|uncommon|rare|legendary)$/g)
    rarity: string

    @Matches(/^(rightHand|leftHand|helmet|armor|boots)$/g, { message: 'Slot deve ser rightHand, leftHand, helmet, armor ou boots' })
    slot: string

    @IsString()
    type: string

    @IsOptional()
    enchantment: object

    @IsNumber()
    @Min(0, { message: 'Ataque deve ser positivo' })
    @IsOptional()
    attack: number

    @IsNumber()
    @Min(0, { message: 'Defesa deve ser positivo' })
    @IsOptional()
    defense: number

    @IsNumber()
    @Min(0, { message: 'Bloqueio deve ser positivo' })
    @IsOptional()
    block: number

    @Matches(/^(strength|agility|intelligence|faith)$/g)
    @IsOptional()
    modifier: string

    @IsBoolean()
    @IsOptional()
    twoHanded: boolean

}