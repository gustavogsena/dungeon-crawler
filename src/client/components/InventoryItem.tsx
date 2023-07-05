import React, { useState } from 'react'
import { IItem } from '../../server/items/items.schema'
import { captalizeItemName, iconUrlName } from '../utils/services'
import InventoryItemModal from './InventoryItemModal'

type InventoryItemsType = {
    item: IItem,
    combat?: boolean
}

function InventoryItem({ item, combat=false }: InventoryItemsType) {
    console.log(combat)

    const [showItemMenu, setShowItemMenu] = useState(false)
    const type = item.type.split(' ')

    const iconUrl = iconUrlName(type)

    const openItemMenu = () => {
        setShowItemMenu(true)
    }



    return (
        <>
            <div
                onClick={openItemMenu}
                className='w-full h-13 flex justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2 cursor-pointer hover:bg-amarelo-700'>
                <img src={`images/icons/${iconUrl}-icon.png`} alt='' className='w-12 h-12 ' />
                <span className=''>
                    {captalizeItemName(item.name)}
                </span>

                <span className='w-12 h-12 text-center flex items-center justify-center border-[1px] border-amarelo-200 border-opacity-50 rounded-full'>
                    {item.quantity}
                </span>
            </div >
            <InventoryItemModal show={showItemMenu} setShow={setShowItemMenu} item={item} combat={combat} />
        </>
    )
}

export default InventoryItem