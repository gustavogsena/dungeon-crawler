import React from 'react'
import { BsPlusCircle } from 'react-icons/bs';

type StatusItemType = {
    image: string,
    attribute: string,
    value: number
}


function StatusItem({ image, attribute, value }: StatusItemType) {
    return (
        <div className='flex items-center justify-between'>
            <div className='w-4/5 min-w-[200px] h-13 flex justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2 mb-2'>
                <img src={image} alt='' className='w-12 h-12 ' />
                <span className='hidden sm:block'>{attribute}</span>
                <span>{value}</span>

            </div>
            <button disabled className='cursor-pointer disabled:text-verde-600 disabled:cursor-default'>
                <BsPlusCircle className='pb-1 text-[28px] ' />
            </button>
        </div>
    )
}

export default StatusItem