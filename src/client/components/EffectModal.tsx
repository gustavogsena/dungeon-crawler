import React from 'react'
import { CombatEffects, EnchantmentType } from '../../types'
import { translateEnchantments } from '../utils/services'

type EffectModalType = {
    show: boolean,
    setShow: (arg: boolean) => void,
    effects: CombatEffects
}
function EffectModal({ show, setShow, effects }: EffectModalType) {
    const closeFunction = () => {
        setShow(false)
    }
    return (
        <>
            {
                show &&
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                    <div onClick={closeFunction} className='fixed z-10 top-0 left-0 w-full h-full' ></div >
                    <div className={`absolute bg-amarelo-700 rounded-lg z-20 flex flex-col gap-2 p-4 text-center`}>
                        {translateEnchantments(effects).map((effect) => <span>{effect}</span>)}
                    </div>
                </div >
            }
        </>
    )
}

export default EffectModal