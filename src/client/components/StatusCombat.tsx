import React from 'react'

function StatusCombat() {
    return (
        <div className='w-full min-w-[200px] h-13 flex flex-wrap justify-between items-center text-amarelo-200 text-xl border-[1px] border-amarelo-200 border-opacity-50 rounded-lg p-2 mb-2 gap-3'>
            <div className='w-2/5 flex justify-between'>
                <span>HP:</span>
                <span>25</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Mana:</span>
                <span>5</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Ataque:</span>
                <span>5</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Defesa:</span>
                <span>5</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Bloqueio:</span>
                <span>5</span>
            </div>
            <div className='w-2/5 flex justify-between'>
                <span>Resistência:</span>
                <span>5</span>
            </div>

        </div>
    )
}

export default StatusCombat