import React from 'react'
import ItemInformation from './ItemInformation'
import { IItem } from '../../server/items/items.schema'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Hero } from '../../types'
import { equipItemById } from '../store/reducers/hero.slice'
import { FaCoins } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { heroActionApi } from '../utils/api/game.api'
import { updateGame } from '../store/reducers/game.slice'
import { IGame } from '../../server/game/game.schema'
import { updateCombatLog } from '../store/reducers/combatLog.slice'


type InventoryItemModalType = {
    show: boolean,
    setShow: (arg: boolean) => void,
    item: IItem,
    combat?: boolean
}
function InventoryItemModal({ show, setShow, item, combat = false }: InventoryItemModalType) {
    const dispatch = useDispatch()
    const game = useSelector<RootState, IGame>((state) => state.game)
    const hero = useSelector<RootState, Hero>(state => state.hero)
    const combatLog = useSelector<RootState, string[]>(state => state.combatLog)
    const type = item.type.split(' ')
    console.log(item)

    const equipItem = (heroId: string, itemName: string) => {
        dispatch(equipItemById({ heroId, itemName }))
    }
    const closeFunction = () => {
        setShow(false)
    }

    const useItemAction = (itemName: string) => {
        heroActionApi(game.hero.id, game.id, itemName).then((response => {
            dispatch(updateGame(response.game))
            dispatch(updateCombatLog(response.messages))
            closeFunction()
        }))
    }

    return (
        <>
            {
                show &&
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                    <div onClick={closeFunction} className='fixed z-10 top-0 left-0 w-full h-full' ></div >
                    <div className={`absolute bg-amarelo-700 rounded-lg z-20 flex flex-col gap-2 p-4 text-center`}>
                        <div onClick={closeFunction} className=' hover:text-verde-600 cursor-pointer text-lg flex justify-end'><AiOutlineCloseCircle /></div>
                        <div className='text-left'>
                            <ItemInformation item={item} />
                        </div>
                        {
                            type.includes('equipment') &&
                            <div
                                onClick={() => equipItem(hero.id, item.name)}
                                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl cursor-pointer'>
                                Equipar
                            </div>
                        }
                        {
                            !combat &&
                            <button className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl disabled:bg-cinza-600 disabled:text-cinza-100' disabled>
                                Vender - {Math.ceil(item.price / 3)}<FaCoins className='inline-block ml-2 text-xl' />
                            </button>
                        }
                        {
                            combat &&
                            <button
                                onClick={() => useItemAction(item.name)}
                                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl disabled:bg-cinza-600 disabled:text-cinza-100'>
                                Usar
                            </button>
                        }
                    </div>
                </div >
            }
        </>
    )
}

export default InventoryItemModal