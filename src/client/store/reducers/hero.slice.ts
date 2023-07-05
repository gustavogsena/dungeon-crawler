import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { CreateHeroForm, Hero, HeroClassType } from '../../../types';
import { IHero } from '../../../server/hero/hero.schema';
import { EquipItemDto } from '../../../server/hero/dtos/equipItem.dto';
import { UnequipItemDto } from '../../../server/hero/dtos/unequipItem.dto';

export const createHero = createAction<CreateHeroForm>('createHero')
export const getHero = createAction<string>('getHero')
export const getBasicHeroStatus = createAction<HeroClassType>('getBasicHeroStatus')
export const deleteHero = createAction<string>('deleteHero')
export const equipItemById = createAction<EquipItemDto>('equipItem')
export const unequipItemById = createAction<UnequipItemDto>('unequipItem')

const initialState: Hero = {
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
                duration: 0,
                fire: 0,
                ice: 0,
                earth: 0,
                lightning: 0
            },
            healing: { duration: 0, heal: 0 },
            combatEnchantment: { duration: 0, attack: 0, defense: 0 },
            statusEnchantment: { duration: 0, strength: 0, agility: 0, magic: 0, faith: 0 }
        }
    }
}

const heroSlice = createSlice({
    name: 'Hero',
    initialState,
    reducers: {
        updateHero: (state, action: PayloadAction<IHero>) => {
            Object.assign(state, action.payload)
        },
        removeHero: () => {
            return initialState
        }
    }
});

export const { updateHero, removeHero } = heroSlice.actions;

export default heroSlice.reducer;