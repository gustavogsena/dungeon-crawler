import React from 'react'
import { HerroClassType, User } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { IHero } from '../../server/hero/hero.schema'
import { getHero } from '../store/reducers/hero.slice'

type SelectHeroItemType = {
    heroClass: HerroClassType,
    name: string,
    level: number,
    heroId: string
}
function SelectHeroItem({ heroClass, name, level, heroId }: SelectHeroItemType) {
    const user = useSelector<RootState, User>(state => state.user)
    const hero = useSelector<RootState, IHero>(state => state.hero)
    const dispatch = useDispatch()

    const selectHero = () => {
       dispatch(getHero(heroId))
    }

    return (
        <div
            onClick={selectHero}
            className='w-full h-13 flex justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2 mb-3 cursor-pointer hover:bg-amarelo-700'
        >
            <img src={`/images/icons/${heroClass}-icon.png`} alt='' className='w-12 h-12 p-3' />
            <span className=''>
                {name}
            </span>
            <span className=''>
                Lv {level}
            </span>
        </div>
    )
}

export default SelectHeroItem