import { Schema } from "mongoose"
import { CombatEffectsDuration, Hero, HeroInGame, MonsterInGame } from "../../types"
import { IMonster, monsterInGameSchema } from "../monster/monster.schema"


export interface IGame {
    id: string,
    dungeon: string,
    background: string,
    monsters: MonsterInGame[],
    reward: number[],
    hero: HeroInGame,
    turn: number,
    status: string
}

export const gameSchema = new Schema<IGame>({
    id: {
        type: Schema.Types.String,
        required: true
    },
    dungeon: {
        type: Schema.Types.String,
        required: true
    },
    background: {
        type: Schema.Types.String,
        required: true,
        maxlength: 128
    },
    reward: {
        type: Schema.Types.Mixed,
        required: true
    },
    turn: {
        type: Schema.Types.Number,
        required: true
    },
    monsters: [monsterInGameSchema],
    hero: {
        type: Schema.Types.Mixed,
        required: true
    },
    status: {
        type: Schema.Types.String,
        required: true
    }
})