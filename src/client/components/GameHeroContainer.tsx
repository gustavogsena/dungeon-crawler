import React from 'react'
import GameEffects from './GameEffects'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { IGame } from '../../server/game/game.schema'
import { captalizeItemName } from '../utils/services'
import CombatInventory from './CombatInventory'

type GameHeroContainerType = {
    attackAction: () => void
}

function GameHeroContainer({ attackAction }: GameHeroContainerType) {
    const game = useSelector<RootState, IGame>((state) => state.game)
    console.log(game.hero.effects)

    return (
        <div className='w-2/5 ml-20'>
            <GameEffects effects={game.hero.effects} gameTurn={game.turn} />
            <div className='text-amarelo-200 bg-black self-start w-full max-w-[350px]'>
                <div className='text-center font-bold'>{captalizeItemName(game.hero.name).toUpperCase()}</div>
                <div className='flex justify-between px-4 text-2xl'>
                    <span>HP: {game.hero.combatStatus.health}</span>
                    <span>Atk: {game.hero.combatStatus.attack}</span>
                    <span>Def: {game.hero.combatStatus.defense}</span>
                </div>

                <CombatInventory inventory={game.hero.inventory} />
                <div
                    onClick={attackAction}
                    className={`p-3 mx-auto mb-3 bg-amarelo-200 text-verde-600 rounded-md w-4/5 text-center cursor-pointer hover:text-amarelo-700`}>
                    Atacar
                </div>
            </div>

        </div>
    )
}

export default GameHeroContainer