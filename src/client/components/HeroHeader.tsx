import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { IHero } from '../../server/hero/hero.schema'
import { translateHeroClass } from '../utils/services'

function HeroHeader() {
    const hero = useSelector<RootState, IHero>(state => state.hero)
    return (
        <div className='w-full flex flex-wrap text-xl xl:text-2xl justify-between text-center mb-6'>
            <span className='w-full lg:w-1/3'>
                Nome: {hero.name}
            </span>
            <span className='w-full lg:w-1/3'>
                Classe: {translateHeroClass(hero.class)}
            </span>
            <span className='w-full lg:w-1/3'>
                level: {hero.level}
            </span>

        </div>
    )
}

export default HeroHeader