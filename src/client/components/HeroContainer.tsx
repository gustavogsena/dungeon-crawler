import React from 'react'
import HeroHeader from './HeroHeader';
import StatusMenu from './StatusMenu';
import EquipmentMenu from './EquipmentMenu';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../types';
import { IHero } from '../../server/hero/hero.schema';
import { deleteHero } from '../store/reducers/hero.slice';

const texts = {
    heroTitle: 'Heroi selecionado',
    startDungeon: 'Iniciar',
    inventory: 'Inventário',
    selectAHero: 'Selecione um herói'
};

function HeroContainer() {
    const hero = useSelector<RootState, IHero>(state => state.hero)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigateToDungeonMenu = () => {
        navigate('/dungeon-menu')
    }

    const navigateToInventory = () => {
        navigate('/inventory')
    }

    const deleteHeroById = () => {
        dispatch(deleteHero(hero.id))
    }

    return (
        <div className='bg-black h-full md:w-3/4 min-w-[450px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6 relative'>
            <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.heroTitle}
            </h3>
            {
                hero.id &&
                <div className='absolute top-8 right-5'>
                    <button
                        onClick={deleteHeroById}
                        className='py-2 w-24 hover:bg-azul-400 bg-azul-600 text-xl rounded-lg text-amarelo-200'>
                        Deletar
                    </button>
                </div>
            }
            {hero.id &&
                <>
                    <div className='w-5/6 h-auto lg:h-[calc(100%-140px)] py-3 mx-auto flex flex-wrap items-start content-start text-amarelo-200'>
                        <HeroHeader />
                        <div className='flex overflow-x-auto overflow-y-auto'>
                            <div className='w-1/3 min-w-[350px] pr-8'>
                                <StatusMenu />
                            </div>
                            <div className='w-1/3 min-w-[350px]'>
                                <h4 className='text-center text-xl mb-4 font-bold'>Equipamentos</h4>
                                <EquipmentMenu />
                            </div>
                            <div className='w-1/3 min-w-[350px] max-h-[450px] rounded-2xl flex justify-center '>
                                <div className='h-full max-h-[450px] relative'>
                                    <div className='h-full w-full bg-gradient-radial from-transparent to-black absolute top-0 left-0 z-10'>
                                    </div>
                                    <img src={`/images/avatars/${hero.class}-avatar.png`} alt='' className='h-full max-h-[450px] z-0' />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-full flex'>
                        <button
                            className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-2/5 mx-auto grow-0 self-end text-xl'
                            onClick={navigateToDungeonMenu}
                        >{texts.startDungeon}</button>
                        <button
                            className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-2/5 mx-auto grow-0 self-end text-xl'
                            onClick={navigateToInventory}
                        >{texts.inventory}</button>
                    </div>
                </>
            }
            {
                !hero.id &&
                <>
                    <h3 className='font-gotika text-4xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                        {texts.selectAHero}
                    </h3>
                </>
            }

        </div>
    )
}

export default HeroContainer