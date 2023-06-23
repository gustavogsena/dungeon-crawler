import React from 'react'
import steelSword from '/images/items/steel-sword.png'
import InventoryItem from '../components/InventoryItem';
import InventoryContainer from '../components/InventoryContainer';
import EquipmentMenu from '../components/EquipmentMenu';
import { useNavigate } from 'react-router-dom';
import StatusCombat from '../components/StatusCombat';

const texts = {
    equipmentTitle: 'Equipamentos',
    createHero: 'Criar heroi',
    backToHeroPage: "Voltar para seleção de herois"
};
function Inventory() {
    const navigate = useNavigate()
    const navigateToHeroPage = () => {
        navigate('/')
    }
    return (
        <>
            <InventoryContainer />

            <div className='bg-black h-full md:w-2/4 min-w-[300px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
                <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                    {texts.equipmentTitle}
                </h3>
                <div className='w-5/6 h-auto lg:h-[calc(100%-140px)] py-3 mx-auto flex flex-wrap items-start content-start text-amarelo-200'>
                    <div className='flex overflow-x-auto overflow-y-auto justify-center w-full mb-4'>
                        <div className='w-[350px] min-w-[350px]'>
                            <EquipmentMenu />
                        </div>
                    </div>
                    <div className='flex overflow-x-auto overflow-y-auto justify-center w-full'>
                        <div className='w-[350px] min-w-[350px]'>
                            <h4 className='text-center text-xl mb-4 font-bold'>Status de combate</h4>
                            <StatusCombat />
                        </div>
                    </div>

                </div>
                <div className='w-full flex'>
                    <button
                        className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'
                        onClick={navigateToHeroPage}
                    >{texts.backToHeroPage}</button>
                </div>
            </div>
        </>
    )
}

export default Inventory