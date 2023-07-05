import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { IGame } from '../../server/game/game.schema'
import { captalizeItemName } from '../utils/services'
import CombatInventory from '../components/CombatInventory'
import { heroActionApi } from '../utils/api/game.api'
import { updateGame } from '../store/reducers/game.slice'
import { useNavigate } from 'react-router-dom'
import GameEffects from '../components/GameEffects'
import GameCombatLog from '../components/GameCombatLog'
import GameMonsterContainer from '../components/GameMonsterContainer'
import GameHeroContainer from '../components/GameHeroContainer'
import GameEndContainer from '../components/GameEndContainer'
import { resetCombatLog, updateCombatLog } from '../store/reducers/combatLog.slice'


const texts = {
    notFound: "Jogo não encontrado",
    backToHome: "Voltar ao menu de heróis"
}
function GameContainer() {
    const game = useSelector<RootState, IGame>((state) => state.game)
    const combatLog = useSelector<RootState, string[]>((state) => state.combatLog)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const attackAction = () => {
        heroActionApi(game.hero.id, game.id).then((response => {
            dispatch(updateCombatLog(response.messages))
            dispatch(updateGame(response.game))
        }))
    }

    const backToHome = () => {
        navigate('/')
    }

    useEffect(() => {
        if (game.status === 'win' || game.status === 'lost') dispatch(resetCombatLog())
        console.log(game)
    }, [game])

    return (
        <>
            <div className='bg-darkforest bg-flamemountain'></div>
            <div className={`bg-${game.dungeon.replace(/\s/g, '').toLowerCase()} bg-fixed bg-center bg-cover w-full mx-auto flex items-center`}>
                {
                    game.id &&

                    <>{
                        game.status === 'lost' || game.status === "win" ?
                            <GameEndContainer reward={game.reward} status={game.status} />
                            : <>
                                <GameMonsterContainer monster={game.monsters[0]} />
                                <GameHeroContainer attackAction={attackAction} />
                                <GameCombatLog messages={combatLog} />
                            </>
                    }</>
                }
                {
                    !game.id &&
                    <div className='flex justify-center mx-auto flex-col bg-black p-10 bg-opacity-70'>

                        <h3 className='font-gotika text-4xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                            {texts.notFound}
                        </h3>
                        <div className='w-full flex'>
                            <button
                                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'
                                onClick={backToHome}
                            >{texts.backToHome}
                            </button>
                        </div>
                    </div>

                }

            </div >
        </>
    )
}

export default GameContainer
