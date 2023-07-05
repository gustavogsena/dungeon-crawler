import React, { useState } from 'react'
import InventoryItem from './InventoryItem'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IHero } from '../../server/hero/hero.schema';
import { IItem } from '../../server/items/items.schema';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';


const texts = {
    inventoryTitle: 'Inventário',
    equipmentTitle: 'Equipamentos',
    createHero: 'Criar heroi',
    backToHeroPage: "Voltar para seleção de herois"
};

type CombatInventoryType = {
    inventory: IItem[]
}
function CombatInventory({ inventory }: CombatInventoryType) {
    const [filterType, setFilterType] = useState('potion')
    const [show, setShow] = useState(false)

    return (
        <div className='bg-black h-auto md:h-full md:w-full min-w-[350px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <div
                onClick={() => setShow(!show)}
                className='flex relative items-center justify-center p-4 w-full  cursor-pointer'>
                <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                    {texts.inventoryTitle}
                </h3>
                {show ? <IoIosArrowUp className='absolute right-5 text-amarelo-200' size={25} /> : <IoIosArrowDown className='absolute right-1 text-amarelo-200' size={25} />}
            </div>

            {show &&
                <>
                    <div className=' h-auto min-h-12 flex flex-wrap content-center justify-center'>
                        <span
                            onClick={() => setFilterType('potion')}
                            className={`p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer hover:text-amarelo-700 ${filterType !== 'potion' && 'opacity-60'} `}>
                            Poções
                        </span>
                        <span
                            onClick={() => setFilterType('scroll')}
                            className={`p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer hover:text-amarelo-700 ${filterType !== 'scroll' && 'opacity-60'}`}>
                            Pergaminhos
                        </span>
                    </div>
                    <div className='w-5/6 h-[calc(100%-180px)] py-3 mx-auto text-amarelo-200'>

                        <div className='flex flex-col gap-2 overflow-x-auto overflow-y-auto w-full max-h-full px-3'>
                            {
                                filterType ?
                                    inventory.filter(item => item.type.split(' ').includes(filterType)).map((item) => <InventoryItem item={item} combat={true} />)
                                    : inventory.map((item) => <InventoryItem item={item} combat={true} />)
                            }
                        </div>

                    </div>
                </>}

        </div>
    )
}

export default CombatInventory