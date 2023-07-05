import { Schema } from "mongoose"
import { IStatus, statusSchema } from "../hero/hero.schema"
import {CombatEffects, CombatEffectsDuration, CombatStatus, CombatType, MonsterInGame } from "../../types"

export interface IMonster{
    name: string,
    actions: monsterAction[],
    imageUrl: string,
    difficulty: number,
    elements: string[],
    reward: number[],
    status: IStatus,
    combatStatus: CombatStatus
}

export type monsterAction = {
    name: string,
    chance: number,
    effect?: Partial<CombatEffects>,
    type: string,
    combat?: CombatType
}

export interface ICombatStatus {
    attack: number,
    defense: number,
    health: number,
    mana: number,
    block: number,
}

export const combatSchema = new Schema<ICombatStatus>({
    attack: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    defense: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    health: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    mana: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    block: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    }
})

export const monsterSchema = new Schema<IMonster>({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 32
    },
    actions: {
        type: Schema.Types.Mixed,
        required: true
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true,
        maxlength: 128
    },
    reward: {
        type: Schema.Types.Mixed,
        required: true
    },
    elements: {
        type: Schema.Types.Mixed,
        required: true
    },
    difficulty: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 4
    },
    status: statusSchema,
    combatStatus: combatSchema,
})

export const monsterInGameSchema = new Schema<MonsterInGame>({
    name: {
        type: Schema.Types.String,
        required: true,
        minlength: 6,
        maxlength: 32
    },
    actions: {
        type: Schema.Types.Mixed,
        required: true
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true,
        maxlength: 128
    },
    reward: {
        type: Schema.Types.Mixed,
        required: true
    },
    elements: {
        type: Schema.Types.Mixed,
        required: true
    },
    difficulty: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 4
    },
    effects: {
        type: Schema.Types.Mixed
    },
    status: statusSchema,
    combatStatus: combatSchema,
})