import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getUserApi, signIn, signUp } from "../../utils/api/user.api";
import toast from "react-simple-toasts";
import { browserHistory } from "../../utils/browserHistory";
import { createHero, deleteHero, getBasicHeroStatus, getHero, removeHero, updateHero } from "../reducers/hero.slice";
import { createHeroApi, deleteHeroApi, getBasicHeroStatusApi, getHeroApi } from "../../utils/api/hero.api";
import { getUser } from "../reducers/user.slice";
import { CreateHeroForm } from "../../../types";

export const heroListener = createListenerMiddleware();

heroListener.startListening({
    actionCreator: createHero,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const form: CreateHeroForm = action.payload


        console.log(form)
        if (form.name.length > 2 && form.class.length > 2) {
            const createHero = fork(async () => {
                const hero = await createHeroApi(form);
                return hero
            });
            const response = await createHero.result
            if (response.status === 'ok') {
                dispatch(updateHero(response.value))
                dispatch(getUser())
                toast('Herói criado com sucesso')
                browserHistory.push("/")
            }
        } else {
            toast('Selecione uma classe e um nome para o heroi')
        }
    }
});
heroListener.startListening({
    actionCreator: getHero,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        const heroId = action.payload

        const createHero = fork(async () => {
            const hero = await getHeroApi(heroId);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            dispatch(updateHero(response.value))
        }
    }
});

heroListener.startListening({
    actionCreator: getBasicHeroStatus,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const createHero = fork(async () => {
            const hero = await getBasicHeroStatusApi(action.payload);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            dispatch(updateHero(response.value))
        }
    }
});
heroListener.startListening({
    actionCreator: deleteHero,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const heroId = action.payload
        const createHero = fork(async () => {
            const hero = await deleteHeroApi(heroId);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            dispatch(getUser())
            toast('Herói deletado com sucesso')
            dispatch(removeHero())
        }
    }
});