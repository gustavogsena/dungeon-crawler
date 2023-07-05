import React, { useEffect, useState } from 'react'
import Select from '../components/Select';
import { getBasicHeroStatus } from '../store/reducers/hero.slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDungeonsListApi } from '../utils/api/dungeon.api';

const texts = {
    selectDungeon: 'Selecione uma dungeon',
    backToHeroPage: "Voltar para seleção de herois"
};

type DungeonSelectContainerType = {
    selectDungeon: string,
    setSelectDungeon: (arg: string) => void
}
function DungeonSelectContainer({ selectDungeon, setSelectDungeon }: DungeonSelectContainerType) {
    const navigate = useNavigate()
    const [dungeonOptions, setDungeonOptions] = useState<string[][]>([])

    const navigateToHeroPage = () => {
        navigate('/')
    }


    useEffect(() => {
        getDungeonsListApi().then((response) => {
            const data = response.map((dungeon) => {
                return [dungeon.name, dungeon.id]
            })
            setDungeonOptions(data)
        })
    }, [])


    return (
        <div className='bg-black h-full md:w-1/4 max-w-[350px] min-w-[250px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.selectDungeon}
            </h3>

            <div className='w-4/5 py-3 mx-auto flex flex-col'>
                <Select value={selectDungeon} funcaoOnChange={setSelectDungeon} options={dungeonOptions} />
            </div>
            <div className='w-4/5 h-[calc(100%-249px)] py-3 mx-auto flex flex-col '>
                <p className='text-amarelo-200 text-justify overflow-y-auto pr-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>

            <button
                onClick={navigateToHeroPage}
                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'>
                {texts.backToHeroPage}
            </button>
        </div>
    )
}

export default DungeonSelectContainer