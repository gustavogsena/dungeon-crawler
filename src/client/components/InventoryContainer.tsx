import React, { useState } from 'react'
import InventoryItem from './InventoryItem'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IHero } from '../../server/hero/hero.schema';


const texts = {
    inventoryTitle: 'Inventário',
    equipmentTitle: 'Equipamentos',
    createHero: 'Criar heroi',
    backToHeroPage: "Voltar para seleção de herois"
};

function InventoryContainer() {
    const hero = useSelector<RootState, IHero>(state => state.hero)
    const [filterType, setFilterType] = useState('')

    return (
        <div className='bg-black h-auto md:h-full md:w-2/4 min-w-[500px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.inventoryTitle}
            </h3>

            <div className=' h-auto min-h-12 flex flex-wrap content-center justify-center'>
                <span
                    onClick={() => setFilterType('')}
                    className={`p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer ${filterType !== '' &&  'opacity-60'}`}
                >
                    Todos
                </span>
                <span
                    onClick={() => setFilterType('equipment')}
                    className={`p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer ${filterType !== 'equipment' &&  'opacity-60'}`}>
                    Equipamentos
                </span>
                <span
                    onClick={() => setFilterType('potion')}
                    className={`p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer ${filterType !== 'potion' &&  'opacity-60'}`}>
                    Poções
                </span>
                <span
                    onClick={() => setFilterType('scroll')}
                    className={`p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer ${filterType !== 'scroll' &&  'opacity-60'}`}>
                    Pergaminhos
                </span>
            </div>
            <div className='w-5/6 h-[calc(100%-180px)] py-3 mx-auto  text-amarelo-200'>

                <div className='flex flex-col gap-2 overflow-x-auto overflow-y-auto w-full max-h-full px-3'>
                    {
                        filterType ?
                            hero.inventory.filter(item => item.type.split(' ').includes(filterType)).map((item) => <InventoryItem item={item} />)
                            : hero.inventory.map((item) => <InventoryItem item={item} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default InventoryContainer