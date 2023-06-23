import React from 'react'
import SelectHeroItem from './SelectHeroItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../../types';

const texts = {
    title: "Magic Dungeon",
    signOut: "Sair",
    herosTitle: 'Herois',
    newHeroButton: "Criar novo heroi"
};

function SelectHeroContainer() {
    const user = useSelector<RootState, User>(state => state.user)

    const navigate = useNavigate()

    const navigateToCreateHero = () => {
        navigate('/create-hero')
    }

    return (
        <div className='bg-black h-full md:w-1/4 max-w-[350px] min-w-[250px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.herosTitle}
            </h3>

            <div className='w-4/5 h-[calc(100%-180px)] py-3 mx-auto flex flex-col'>
                {
                    user.heroes &&
                    user.heroes?.length > 0 &&
                    user.heroes.map((hero) => {
                        return (
                            <SelectHeroItem name={hero.name} heroClass={hero.class} level={hero.level} heroId={hero.id}  key={hero.id}/>
                        )
                    })
                }

            </div>

            <button
                onClick={navigateToCreateHero}
                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'>
                {texts.newHeroButton}
            </button>
        </div>
    )
}

export default SelectHeroContainer