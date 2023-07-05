import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { CreateHeroForm, Hero, HeroClassType } from '../../../types';

import { IGame } from '../../../server/game/game.schema';

export const createHero = createAction<CreateHeroForm>('createHero')

const initialState: IGame = {
    background: '',
    dungeon: "",
    id: "",
    monsters: [],
    reward: [],
    status: "",
    turn: 0,
    hero: {
        id: '',
        name: '',
        class: 'knight',
        level: 1,
        experience: 0,
        status: {
            strength: 0,
            agility: 0,
            faith: 0,
            magic: 0
        },
        equipment: {
            rightHand: undefined,
            leftHand: undefined,
            helmet: undefined,
            armor: undefined,
            boots: undefined
        },
        inventory: [],
        gold: 0,
        combatStatus: {
            attack: 0,
            block: 0,
            defense: 0,
            health: 0,
            mana: 0,
            effects: {
                resistances: {
                    fire: 0,
                    ice: 0,
                    earth: 0,
                    lightning: 0
                },
                overTurn: { poison: 0, heal: 0, burn: 0 },
                combatEnchantment: { attack: 0, defense: 0 },
                statusEnchantment: { strength: 0, agility: 0, magic: 0, faith: 0 }
            }
        },
        effects: []
    }
}

const gameSlice = createSlice({
    name: 'Game',
    initialState,
    reducers: {
        updateGame: (state, action: PayloadAction<IGame>) => {
            Object.assign(state, action.payload)
        },
        removeGame: () => {
            return initialState
        }
    }
});

export const { updateGame, removeGame } = gameSlice.actions;

export default gameSlice.reducer;