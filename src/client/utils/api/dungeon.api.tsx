import { IDungeon } from "../../../server/dungeon/dungeon.schema"
import { DungeonInfo, User, UserSignInInput, UserSignInResponse, UserSignUpInput } from "../../../types"
import api from "../api/api"


export const getDungeonsListApi = async (): Promise<Array<IDungeon>> => {
    const response = await api.get(`/dungeon/`, { params: { level: 3 } })
    return response.data
}

export const getDungeonInfoApi = async (dungeonId: string): Promise<DungeonInfo> => {
    const response = await api.get(`/dungeon/info/${dungeonId}`)
    return response.data
}

export const getUserApi = async (): Promise<User> => {
    const response = await api.get('/auth/myself')
    return response.data
}