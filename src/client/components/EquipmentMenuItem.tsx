import React from 'react'
import { IItem } from '../../server/items/items.schema'

type EquipmentMenuItemType = {
    itemSlot: undefined | IItem,
    setHover: (obj: IItem) => void
}

function EquipmentMenuItem({ itemSlot, setHover }: EquipmentMenuItemType) {
    return (
        <>
            {
                itemSlot &&
                <img className='h-full' onMouseOver={() => setHover(itemSlot)} src={`images/items/${itemSlot.imageUrl}`}  data-tooltip-id='equipment_item_tooltip'/>
            }
        </>
    )
}

export default EquipmentMenuItem