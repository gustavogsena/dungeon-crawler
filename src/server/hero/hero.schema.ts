import { Schema } from "mongoose"
import { IEquipment, IItem, equipmentSchema, itemsSchema } from "../items/items.schema"
import { HerroClassType } from "../../types"


export type IStatus = {
    strength: number,
    agility: number,
    intelligence: number,
    faith: number
}

export interface IHero {
    id: string,
    name: string,
    class: HerroClassType,
    level: number,
    experience: number,
    status: IStatus
    equipment: IEquipment,
    inventory: IItem[],
    gold: number
}

export const statusSchema = new Schema<IStatus>({
    strength: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 99
    },
    agility: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 99
    },
    intelligence: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 99
    },
    faith: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 99
    }
})

export const heroSchema = new Schema<IHero>({
    id: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true,
        minlength: 2,
        maxlength: 64
    },
    class: {
        type: Schema.Types.String,
        required: true,
    },
    level: {
        type: Schema.Types.Number,
        required: true,
        min: 1,
        max: 99
    },
    experience: {
        type: Schema.Types.Number,
        required: true,
        minlength: 6,
        maxlength: 64
    },
    gold: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    status: statusSchema,
    equipment: equipmentSchema,
    inventory: [itemsSchema]
})

