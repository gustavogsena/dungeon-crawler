import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { AuthToken } from '../../utils/authToken';
import { browserHistory } from '../../utils/browserHistory';
import { CreateHeroForm, User, UserSignInInput, UserSignUpInput } from '../../../types';
import { IHero } from '../../../server/hero/hero.schema';

export const createHero = createAction<CreateHeroForm>('createHero')
export const getHero = createAction<string>('getHero')

const initialState: IHero = {
    id: '',
    name: '',
    class: 'knight',
    level: 1,
    experience: 0,
    status: {
        strength: 0,
        agility: 0,
        faith: 0,
        intelligence: 0
    },
    equipment: {
        rightHand: undefined,
        leftHand: undefined,
        helmet: undefined,
        armor: undefined,
        boots: undefined
    },
    inventory: [],
    gold: 0
}

const heroSlice = createSlice({
    name: 'Hero',
    initialState,
    reducers: {
        updateHero: (state, action: PayloadAction<IHero>) => {
            return action.payload
        },
        removeHero: () => {
            return initialState
        }
    }
});

export const { updateHero, removeHero } = heroSlice.actions;

export default heroSlice.reducer;