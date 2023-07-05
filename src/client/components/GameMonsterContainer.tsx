import React from 'react'
import { captalizeItemName } from '../utils/services'
import { MonsterInGame } from '../../types'

type GameMonsterContainerType = {
    monster: MonsterInGame
}

function GameMonsterContainer({ monster }: GameMonsterContainerType) {
    return (
        <div className='w-2/5 ml-20'>
            <img className='w-full max-w-[350px]' src={`images/monsters/${monster.imageUrl}`} />
            <div className='text-amarelo-200 bg-black self-start w-full max-w-[350px]'>
                <div className='text-center font-bold'>{captalizeItemName(monster.name).toUpperCase()}</div>
                <div className='flex justify-between px-4 text-2xl'>
                    <span>HP: {monster.combatStatus.health}</span>
                    {monster.elements.map(element => {
                        return (
                            <span key={element}>{element.toUpperCase()}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GameMonsterContainer