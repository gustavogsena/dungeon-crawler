import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getUserApi, signIn, signUp } from "../../utils/api/user.api";
import toast from "react-simple-toasts";
import { browserHistory } from "../../utils/browserHistory";
import { createHero, getHero, updateHero } from "../reducers/hero.slice";
import { createHeroApi, getHeroApi } from "../../utils/api/hero.api";
import { getUser } from "../reducers/user.slice";

export const heroListener = createListenerMiddleware();

heroListener.startListening({
    actionCreator: createHero,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const createHero = fork(async () => {
            const hero = await createHeroApi(action.payload);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            dispatch(updateHero(response.value))
            dispatch(getUser())
        }
    }
});
heroListener.startListening({
    actionCreator: getHero,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const createHero = fork(async () => {
            const hero = await getHeroApi(action.payload);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            dispatch(updateHero(response.value))
        }
    }
});