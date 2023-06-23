import { User, UserSignInInput, UserSignInResponse, UserSignUpInput } from "../../../types"
import api from "../api/api"


export const signIn = async (signInForm: UserSignInInput): Promise<UserSignInResponse> => {
    const response = await api.post(`/auth/sign-in`, signInForm)
    return response.data
}

export const signUp = async (signUpForm: UserSignUpInput): Promise<UserSignInResponse> => {
    const response = await api.post(`/auth/sign-up`, signUpForm)
    return response.data
}

export const getUserApi = async (): Promise<User> => {
    const response = await api.get('/auth/myself')
    return response.data
}