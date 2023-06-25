import React, { useState } from 'react'
import { IItem } from '../../server/items/items.schema'
import { captalizeItemName, iconUrlName, translateAttributeName } from '../utils/services'
import ItemTooltip from './ItemTooltip'

type InventoryItemsType = {
    item: IItem
}

function InventoryItem({ item }: InventoryItemsType) {
    const type = item.type.split(' ')
    const iconUrl = iconUrlName(type)
    const [showItemMenu, setShowItemMenu] = useState(false)

    const openItemMenu = () => {
        setShowItemMenu(true)
    }
    const closeItemMenu = () => {
        setShowItemMenu(false)
    }

    return (
        <>

            <div
                onClick={openItemMenu}
                className='w-full h-13 flex justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2 cursor-pointer'>
                <img src={`images/icons/${iconUrl}-icon.png`} alt='' className='w-12 h-12 ' />
                <span className=''>
                    {captalizeItemName(item.name)}
                </span>

                <span className='w-12 h-12 text-center flex items-center justify-center border-[1px] border-amarelo-200 border-opacity-50 rounded-full'>
                    {item.quantity}
                </span>

            </div >
            {
                showItemMenu &&
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                    <div onClick={closeItemMenu} className='fixed z-10 top-0 left-0 w-full h-full'></div>
                    <div className={`absolute bg-amarelo-700 rounded-lg z-20 flex flex-col gap-2 p-4 text-center`}>
                        <div className='text-left'>
                            <ItemTooltip item={item}/>
                        </div>
                        {
                            type.includes('equipment') &&
                            <div className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'>
                                Equipar
                            </div>
                        }

                        <div className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'>
                            Vender
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default InventoryItem