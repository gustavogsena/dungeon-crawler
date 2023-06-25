import { IHero } from "../../../server/hero/hero.schema"
import { CreateHeroForm, HerroClassType } from "../../../types"
import api from "../api/api"


export const createHeroApi = async (newHero: CreateHeroForm): Promise<IHero> => {
    const response = await api.post(`/hero`, newHero)
    return response.data
}

export const getHeroApi = async (heroId: string): Promise<IHero> => {
    const response = await api.get(`/hero/${heroId}`)
    return response.data
}

export const deleteHeroApi = async (heroId: string): Promise<IHero> => {
    const response = await api.delete(`/hero/${heroId}`)
    return response.data
}

export const getBasicHeroStatusApi = async (heroClass: HerroClassType): Promise<IHero> => {
    const response = await api.get(`/hero/class/${heroClass}`)
    console.log(response.data)
    return response.data
}
