import React from 'react'
import InventoryItem from './InventoryItem'


const texts = {
    inventoryTitle: 'Inventário',
    equipmentTitle: 'Equipamentos',
    createHero: 'Criar heroi',
    backToHeroPage: "Voltar para seleção de herois"
};

function InventoryContainer() {
    return (
        <div className='bg-black h-auto md:h-full md:w-2/4 min-w-[300px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.inventoryTitle}
            </h3>

            <div className=' h-auto min-h-12 flex flex-wrap content-center justify-center'>
                <span className='p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer '>
                    Todos
                </span>
                <span className='p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer opacity-60'>
                    Equipamentos
                </span>
                <span className='p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer opacity-60'>
                    Consumíveis
                </span>
                <span className='p-3 mx-3 mb-3 bg-amarelo-200 text-verde-600 rounded-md w-[150px] text-center cursor-pointer opacity-60'>
                    Pergaminhos
                </span>
            </div>
            <div className='w-5/6 h-[calc(100%-180px)] py-3 mx-auto  text-amarelo-200'>

                <div className='flex flex-col gap-2 overflow-x-auto overflow-y-auto w-full max-h-full px-3'>
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />

                </div>

            </div>
        </div>
    )
}

export default InventoryContainer