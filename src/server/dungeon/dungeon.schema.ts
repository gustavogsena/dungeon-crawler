import { Schema } from "mongoose"

export interface IDungeon {
    id: string,
    name: string,
    monsters: string[],
    background: string,
    difficulty: number,
    reward: number[]
}

export const dungeonSchema = new Schema<IDungeon>({
    id: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 32,
        uppercase: true
    },
    monsters: {
        type: Schema.Types.Mixed,
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
    difficulty: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 99
    }
})