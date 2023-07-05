import { EquipItemDto } from "../../../server/hero/dtos/equipItem.dto"
import { UnequipItemDto } from "../../../server/hero/dtos/unequipItem.dto"
import { IHero } from "../../../server/hero/hero.schema"
import { IUser } from "../../../server/user/user.schema"
import { CreateHeroForm, Hero, HeroClassType } from "../../../types"
import api from "../api/api"


export const createHeroApi = async (newHero: CreateHeroForm): Promise<Hero> => {
    const response = await api.post(`/hero`, newHero)
    return response.data
}

export const getHeroApi = async (heroId: string): Promise<Hero> => {
    const response = await api.get(`/hero/${heroId}`)
    console.log(response.data)
    return response.data
}

export const deleteHeroApi = async (heroId: string): Promise<Hero> => {
    const response = await api.delete(`/hero/${heroId}`)
   
    return response.data
}

export const getBasicHeroStatusApi = async (heroClass: HeroClassType): Promise<Hero> => {
    const response = await api.get(`/hero/class/${heroClass}`)
    return response.data
}
export const equipItemByIdApi = async (body: EquipItemDto): Promise<Hero> => {
    const response = await api.patch(`/hero/equip/`, body)
    return response.data
}
export const unequipItemByIdApi = async (body: UnequipItemDto): Promise<Hero> => {
    const response = await api.patch(`/hero/unequip/`, body)
    return response.data
}
