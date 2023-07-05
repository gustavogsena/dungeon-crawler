import React, { useEffect, useState } from 'react'
import { FaCoins } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { getDungeonInfoApi } from '../utils/api/dungeon.api';
import { DungeonInfo, Hero } from '../../types';
import { startGameApi } from '../utils/api/game.api';
import { RootState } from '../store';
import { IHero } from '../../server/hero/hero.schema';
import { useNavigate } from 'react-router-dom';
import { updateGame } from '../store/reducers/game.slice';
const texts = {
    dungeonTitle: 'Dungeon',
    startDungeon: 'Iniciar aventura',
    selectADungeon: 'Selecione uma dungeon',
};

type DungeonPreviewContainerType = {
    selectDungeon: string,
    setSelectDungeon: (arg: string) => void
}
function DungeonPreviewContainer({ selectDungeon, setSelectDungeon }: DungeonPreviewContainerType) {
    const hero = useSelector<RootState, Hero>(state => state.hero)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dungeonInfo, setDungeonInfo] = useState<DungeonInfo | undefined>(undefined)

    const startGame = () => {
        if (dungeonInfo) startGameApi(hero.id, dungeonInfo.id).then((response) => {
            dispatch(updateGame(response))
            navigate('/game')
        })
    }

    useEffect(() => {
        getDungeonInfoApi(selectDungeon).then((response) => {
            setDungeonInfo(response)
        })
    }, [selectDungeon])

    return (
        <div className='bg-black h-full md:w-3/4 min-w-[300px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <h3 className='font-gotika text-4xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.dungeonTitle}
            </h3>


            <div className='w-4/5 mx-auto'>

                {
                    dungeonInfo &&
                    <>
                        <div className='w-5/6 h-auto lg:h-[calc(100%-90px)] py-3 mx-auto flex flex-wrap items-start content-start text-amarelo-200'>
                            <div className='w-1/2 min-w-[350px]'>
                                <div className='flex gap-2 items-center mb-3'>
                                    <span className='font-beyond text-2xl'>
                                        Dificuldade -
                                    </span>
                                    <span className='font-beyond text-2xl'>
                                        {dungeonInfo.difficulty}
                                    </span>
                                </div>

                                <div className='flex gap-2 items-center mb-3'>
                                    <span className='font-beyond text-2xl'>
                                        Monstros -
                                    </span>
                                    {
                                        dungeonInfo.monsters.map((item, idx) => {
                                            let difficulty = ''
                                            switch (item) {
                                                case 1: {
                                                    difficulty = "common"
                                                    break;
                                                }
                                                case 2: {
                                                    difficulty = "uncommon"
                                                    break;
                                                }
                                                case 3: {
                                                    difficulty = "rare"
                                                    break;
                                                }
                                                case 4: {
                                                    difficulty = "boss"
                                                    break;
                                                }
                                            }
                                            return (
                                                <img src={`/images/icons/${difficulty}-monster-icon.png`} className='h-12 w-12' data-tooltip-id='info_tooltip' key={`${idx}_${difficulty}`} data-tooltip-content={`${difficulty}`} />
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex gap-2 items-center mb-3'>
                                    <span className='font-beyond text-2xl'>
                                        Elementos -
                                    </span>
                                    {
                                        dungeonInfo.elements.map((item, idx) => {
                                            return (
                                                <img src={`/images/icons/${item}-icon.png`} className='h-12 w-12' data-tooltip-id='info_tooltip' key={`${idx}_${item}`} data-tooltip-content={item} />
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex gap-2 items-center mb-3'>
                                    <span className='font-beyond text-2xl'>
                                        Tesouros -
                                    </span>
                                    <span className='font-beyond'>
                                        {dungeonInfo.reward[0]} <FaCoins className='inline-block ml-2 h-8 w-8' data-tooltip-id='info_tooltip' data-tooltip-content="Ouro" />
                                    </span>
                                    <span className='font-beyond'>
                                        {dungeonInfo.reward[1]}
                                    </span>
                                    <span className='font-beyond'>
                                        <img src={'/images/icons/experience-icon.png'} className='h-12 w-12' data-tooltip-id='info_tooltip' data-tooltip-content="Exp" />
                                    </span>
                                </div>
                            </div>
                            <div className='w-1/2 min-w-[350px]'>
                                <img src={`/images/backgrounds/${dungeonInfo.background}`} alt='Dungeon background' />
                            </div>
                        </div>
                        <div className='w-full flex'>
                            <button
                                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'
                                onClick={startGame}
                            >{texts.startDungeon}
                            </button>

                        </div>
                    </>
                }

                {
                    !dungeonInfo &&
                    <h3 className='font-gotika text-4xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                        {texts.selectADungeon}
                    </h3>
                }
            </div>
            <Tooltip id='info_tooltip' place='right' className='z-50' />
        </div>
    )
}

export default DungeonPreviewContainer