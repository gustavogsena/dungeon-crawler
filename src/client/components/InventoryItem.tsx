import React from 'react'

function InventoryItem() {
    return (
        <div className='w-full h-13 flex justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2'>
            <img src='' alt='' className='rounded-full w-12 h-12 bg-amarelo-200' />
            <span className=''>
                Item name
            </span>
            <span className='w-12 h-12 text-center flex items-center justify-center border-[1px] border-amarelo-200 border-opacity-50 rounded-full'>
                5
            </span>
        </div>
    )
}

export default InventoryItem