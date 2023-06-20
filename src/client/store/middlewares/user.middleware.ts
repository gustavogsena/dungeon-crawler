import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authenticated, authenticatedUser, getUser, updateUser, userLogin, userSignIn, userSignUp } from "../reducers/user.slice";
import { getUserApi, signIn, signUp } from "../../utils/api/user.api";
import toast from "react-simple-toasts";
import { browserHistory } from "../../utils/browserHistory";

export const userListener = createListenerMiddleware();

userListener.startListening({
    actionCreator: getUser,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const confirmUser = fork(async () => {
            const user = await getUserApi();
            return user
        });

        const response = await confirmUser.result

        if (response.status === 'ok') {
            dispatch(updateUser(response.value))
            dispatch(authenticated())
        }
    }
});
userListener.startListening({
    actionCreator: userSignIn,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const userCredentials = action.payload

        const confirmUser = fork(async () => {
            const user = await signIn(userCredentials);
            return user
        });

        const response = await confirmUser.result

        if (response.status === 'ok') {
            toast('Login realizado com sucesso')
            dispatch(updateUser(response.value.user))
            dispatch(authenticatedUser(response.value.token))
            browserHistory.push("/sign-up")
        }
    }
});
userListener.startListening({
    actionCreator: userSignUp,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const userCredentials = action.payload

        const createNewUser = fork(async () => {
            const response = await signUp(userCredentials);
            return response
        });

        const response = await createNewUser.result

        if (response.status === 'ok') {
            toast('Usuario criado com sucesso')
            dispatch(updateUser(response.value.user))
            dispatch(authenticatedUser(response.value.token))
            browserHistory.push("/sign-in")
        }
    }
});