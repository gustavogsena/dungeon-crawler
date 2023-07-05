import { createListenerMiddleware } from "@reduxjs/toolkit";
import toast from "react-simple-toasts";
import { browserHistory } from "../../utils/browserHistory";
import { createHero, deleteHero, equipItemById, getBasicHeroStatus, getHero, removeHero, unequipItemById, updateHero } from "../reducers/hero.slice";
import { createHeroApi, deleteHeroApi, equipItemByIdApi, getBasicHeroStatusApi, getHeroApi, unequipItemByIdApi } from "../../utils/api/hero.api";
import { getUser } from "../reducers/user.slice";
import { CreateHeroForm } from "../../../types";

export const heroListener = createListenerMiddleware();

heroListener.startListening({
    actionCreator: createHero,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const form: CreateHeroForm = action.payload
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
heroListener.startListening({
    actionCreator: equipItemById,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const equipItemBody = action.payload
        const createHero = fork(async () => {
            const hero = await equipItemByIdApi(equipItemBody);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            const newHero = response.value
            console.log(newHero)
            if (newHero) dispatch(updateHero(newHero))
            dispatch(getUser())
        }
    }
});
heroListener.startListening({
    actionCreator: unequipItemById,
    effect: async (action, { dispatch, fork, unsubscribe }) => {

        const unequipItemBody = action.payload
        const createHero = fork(async () => {
            const hero = await unequipItemByIdApi(unequipItemBody);
            return hero
        });

        const response = await createHero.result

        if (response.status === 'ok') {
            const newHero = response.value
            if (newHero) dispatch(updateHero(newHero))
            dispatch(getUser())
        }
    }
});