import { IsString, Matches } from "class-validator"
import { IEquipment } from "../../items/items.schema"

export class UnequipItemDto {

    @IsString()
    heroId: string

    @IsString()
    @Matches(/^(rightHand|leftHand|helmet|armor|boots)$/g, { message: 'Slot deve ser rightHand, leftHand, helmet, armor ou boots' })
    itemSlot: keyof IEquipment
}