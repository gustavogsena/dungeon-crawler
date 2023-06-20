import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { AuthToken } from '../../utils/authToken';
import { browserHistory } from '../../utils/browserHistory';
import { User, UserSignInInput, UserSignUpInput } from '../../../types';

export const getUser = createAction('getUser')
export const userSignIn = createAction<UserSignInInput>('userLogin')
export const userSignUp = createAction<UserSignUpInput>('userCreate')
export const userUploadPicture = createAction<File>('userUploadPicture')
export const userLogout = createAction('userLogout')

const initialState: User = {
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            return action.payload
        },
        removeUser: () => {
            AuthToken.remove()
            browserHistory.push("/login");
            return initialState
        },
        authenticatedUser: (state, action: PayloadAction<string>) => {
            AuthToken.set(action.payload)
            return {
                ...state,
                isAuthenticated: true
            }
        },
        authenticated: (state) => {
            return {
                ...state,
                isAuthenticated: true
            }
        }

    }
});

export const { updateUser, removeUser, authenticatedUser, authenticated } = userSlice.actions;

export default userSlice.reducer;