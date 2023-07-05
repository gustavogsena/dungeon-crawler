import toast, { createToast } from "react-simple-toasts"
import { IDungeon } from "../../../server/dungeon/dungeon.schema"
import { IGame } from "../../../server/game/game.schema"
import { DungeonInfo, User, UserSignInInput, UserSignInResponse, UserSignUpInput } from "../../../types"
import api from "../api/api"

type ActionResponse = {
    game: IGame,
    messages: string[]
}

const customToast = createToast({
    duration: 10000,
    className: 'custom-toast',
    clickClosable: true,
    position: 'bottom-right',
    maxVisibleToasts: 3,
    render: (message) => <b className="my-toast">{message}</b>,
});

export const startGameApi = async (heroId: string, dungeonId: string): Promise<IGame> => {
    const response = await api.post(`/game/start`, {
        heroId,
        dungeonId
    })
    return response.data
}

export const heroActionApi = async (heroId: string, gameId: string, itemName?: string): Promise<ActionResponse> => {
    const body = itemName ? { heroId, gameId, itemName } : { heroId, gameId }
    const response = await api.post(`/game/action/`, body)

    response.data.messages.map((message: string) => toast(message, {
        duration: 10000,
        maxVisibleToasts: 4,
        clickClosable: true
    }))
    return response.data
}

export const attackActionApi = async (): Promise<User> => {
    const response = await api.post('/auth/myself')
    return response.data
}