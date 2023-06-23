import React from 'react'
import { IItem } from '../../server/items/items.schema'
import { captalizeItemName, translateAttributeName } from '../utils/services'

type ItemTooltipType = {
    item: IItem | undefined
}

function ItemTooltip({ item }: ItemTooltipType) {
    return (
        <>
            {item &&
                <div className='w-[300px] flex justify-between items-center'>
                    <div className='flex flex-col w-1/2 p-3'>
                        <span>
                            {captalizeItemName(item.name)}
                        </span >
                        <span>
                            level: {item.level}
                        </span>
                        {
                            item.attack &&
                            <span>
                                Ataque: {item.attack}
                            </span>
                        }
                        {
                            item.defense &&
                            <span>
                                Defesa: {item.defense}
                            </span>
                        }
                        {
                            item.enchantment &&
                            item.enchantment.length > 0 &&
                            <span>
                                Encantamentos: {JSON.stringify(item.enchantment)}
                            </span>
                        }
                        {
                            item.modifier &&
                            <span>
                                Atributo: {translateAttributeName(item.modifier)}
                            </span>
                        }
                    </div >
                    <div>
                        <img className='h-[150px] bg-amarelo-200 rounded-md p-3' src={`images/items/${item.imageUrl}`} />
                    </div>
                </div >
            }
        </>
    )
}

export default ItemTooltip