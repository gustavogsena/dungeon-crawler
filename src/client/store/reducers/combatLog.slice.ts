import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string[] = []

const combatLogSlice = createSlice({
    name: 'CombatLog',
    initialState,
    reducers: {
        updateCombatLog: (state, action: PayloadAction<string[]>) => {
            const newLog = [...state, ...action.payload]
            return newLog
        },
        resetCombatLog: () => {
            return initialState
        }

    }
});

export const { updateCombatLog, resetCombatLog } = combatLogSlice.actions;

export default combatLogSlice.reducer;