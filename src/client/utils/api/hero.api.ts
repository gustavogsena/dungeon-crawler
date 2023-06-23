import { IHero } from "../../../server/hero/hero.schema"
import { CreateHeroForm } from "../../../types"
import api from "../api/api"


export const createHeroApi = async (newHero: CreateHeroForm): Promise<IHero> => {
    const response = await api.post(`/hero`, newHero)
    return response.data
}

export const getHeroApi = async (heroId: string): Promise<IHero> => {
    const response = await api.get(`/hero/${heroId}`)
    console.log(response.data)
    return response.data
}
