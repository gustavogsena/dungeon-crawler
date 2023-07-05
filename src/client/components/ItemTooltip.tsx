import React from 'react'
import { IEquipment, IItem } from '../../server/items/items.schema'
import { captalizeItemName, translateAttributeName } from '../utils/services'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Hero } from '../../types'
import { unequipItemById } from '../store/reducers/hero.slice'
import ItemInformation from './ItemInformation'

type ItemTooltipType = {
    item: IItem | undefined
}

const texts = {
    unequipItem: 'Desequipar item'
}

function ItemTooltip({ item }: ItemTooltipType) {
    const disptach = useDispatch()
    const hero = useSelector<RootState, Hero>(state => state.hero)

    const unequipItem = (heroId: string, itemSlot: keyof IEquipment | undefined) => {
        if (itemSlot) disptach(unequipItemById({ heroId, itemSlot }))
    }
    return (
        <>
            {item &&
                <div className='w-[300px] flex flex-wrap'>
                    <ItemInformation item={item} />

                    <button
                        className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-2 font-bold w-4/5 mx-auto grow-0 self-end text-xl'
                        onClick={() => unequipItem(hero.id, item.slot)}
                    >{texts.unequipItem}</button>
                </div >
            }
        </>
    )
}

export default ItemTooltip