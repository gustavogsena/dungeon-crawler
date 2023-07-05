import React from 'react'

type GameCombatLogType = {
    messages: string[]
}

function GameCombatLog({ messages }: GameCombatLogType) {
    return (
        <div className='w-1/5 text-amarelo-200 bg-black mr-20 h-full overflow-y-auto px-3'>
            <h3 className='text-center font-bold text-3xl mb-3'>Combate log</h3>
            {messages.map(message => (
                <>
                    {
                        message.split(' ').includes("Turno") &&
                        <div className='bg-amarelo-700 font-bold my-2'>
                            {message}
                        </div>
                    }
                    {
                        !message.split(' ').includes("Turno") &&
                        <div>
                            {message}
                        </div>
                    }
                </>

            ))}
        </div>
    )
}

export default GameCombatLog