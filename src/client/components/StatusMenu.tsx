import React from 'react'
import StatusItem from './StatusItem'
import StatusCombat from './StatusCombat'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { IHero } from '../../server/hero/hero.schema'
import strength from '/images/icons/strength-icon.png'
import agility from '/images/icons/agility-icon.png'
import magic from '/images/icons/magic-icon.png'
import faith from '/images/icons/faith-icon.png'

function StatusMenu() {
    const hero = useSelector<RootState, IHero>(state => state.hero)
    return (
        <>
            <h4 className='text-center text-xl mb-4 font-bold'>Atributos</h4>
            <StatusItem image={strength} value={hero.status.strength} attribute='Força' />
            <StatusItem image={agility} value={hero.status.agility} attribute='Agilidade' />
            <StatusItem image={magic} value={hero.status.magic} attribute='Magia' />
            <StatusItem image={faith} value={hero.status.faith} attribute='Fé' />
            <StatusCombat />
        </>
    )
}

export default StatusMenu