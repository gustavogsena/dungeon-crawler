import React from 'react'
import { IItem } from '../../server/items/items.schema'
import { captalizeItemName, translateAttributeName, translateEnchantments } from '../utils/services'

type ItemInformationType = {
    item: IItem
}
function ItemInformation({ item }: ItemInformationType) {
    return (
        <>
            <div className='w-[300px] flex justify-between items-center'>
                <div className='flex flex-col w-2/3 p-3'>
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
                        <span>
                            {translateEnchantments(item.enchantment, item.modifier).map((enchant) =>
                                <div>{enchant}</div>
                            )}
                        </span>
                    }
                    {
                        item.modifier &&
                        <span>
                            Atributo: {translateAttributeName(item.modifier)}
                        </span>
                    }
                </div >

                <div className='w-1/3 flex items-center h-[150px] relative'>
                    <img className='max-h-full relative bg-amarelo-200 rounded-md p-3' src={`images/items/${item.imageUrl}`} />
                </div>
            </div>

        </>
    )

}

export default ItemInformation