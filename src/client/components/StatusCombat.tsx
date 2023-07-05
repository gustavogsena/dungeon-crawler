import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { CombatStatus } from '../../types'
import { translateEnchantments } from '../utils/services'
import EffectModal from './EffectModal'

function StatusCombat() {
    const [showModal, setShowModal] = useState(false)
    const heroCombatStatus = useSelector<RootState, CombatStatus>(state => state.hero.combatStatus)
    return (
        <div className='w-full min-w-[200px] h-13 flex flex-wrap justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2 mb-2 gap-3'>
            <div className='w-2/5 flex justify-between'>
                <span>HP:</span>
                <span>{heroCombatStatus.health}</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Mana:</span>
                <span>{heroCombatStatus.mana}</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Ataque:</span>
                <span>{heroCombatStatus.attack}</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Defesa:</span>
                <span>{heroCombatStatus.defense}</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Bloqueio:</span>
                <span>{heroCombatStatus.block}</span>
            </div>
            <div
                onClick={() => setShowModal(true)}
                className='w-2/5 flex justify-between cursor-pointer relative'>
                <span>Efeitos:</span>
                <span>...</span>
            </div>
            <EffectModal show={showModal} setShow={setShowModal} effects={heroCombatStatus.effects} />

        </div>
    )
}

export default StatusCombat