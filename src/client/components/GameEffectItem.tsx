import React from 'react'
import { CombatEffects, CombatType, OverTurnType, Resistances } from '../../types'
import { IStatus } from '../../server/hero/hero.schema'

type GameEffectType = {
    effect: number
    effectName: string
}

function GameEffectItem({ effect, effectName }: GameEffectType) {
    return (
        <span className='flex bg-amarelo-200 max-w-[150px] text-center font-bold justify-center '>
            {effectName}: {effect}
        </span>

    )
}

export default GameEffectItem