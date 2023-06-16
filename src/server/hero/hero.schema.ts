import { Schema, model } from "mongoose"

export type ClassType = 'wizard' | 'warrior' | 'archer' | 'cleric'

export type IStatus = {
    strength: number,
    agility: number,
    intelligence: number,
    faith: number
}

export interface IHero {
    name: string,
    class: ClassType,
    level: number,
    experience: number,
    status: IStatus
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
    status: [statusSchema]
})

export const User = model<IHero>('Hero', heroSchema)