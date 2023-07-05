import React from 'react'
import { useNavigate } from 'react-router-dom'

type GameEndContainerType = {
    status: 'win' | 'lost',
    reward: number[]
}

function GameEndContainer({ status, reward }: GameEndContainerType) {
    const navigate = useNavigate()
    const backToHome = () => {
        navigate('/')
    }
    return (
        <>
            {
                status === 'lost' &&

                <div className='flex justify-center mx-auto flex-col bg-black p-10 bg-opacity-70'>
                    <h2 className='font-gotika text-amarelo-200 text-4xl w-full text-center mb-20'>
                        Você Perdeu!
                    </h2>
                    <button
                        onClick={backToHome}
                        className={`p-3 mx-auto mb-3 bg-amarelo-200 text-verde-600 rounded-md w-2/5 text-center cursor-pointer hover:text-amarelo-700`}>
                        Home
                    </button>
                </div>
            }

            {
                status === 'win' &&
                <div className='flex justify-center mx-auto flex-col text-xl text-amarelo-200 text-center bg-black p-10 bg-opacity-70'>
                    <div className='font-gotika text-amarelo-200 text-4xl w-full text-center mb-20'>
                        Você Ganhou!
                    </div>
                    <div className=''>
                        <div>
                            Recompensas:
                        </div>
                        <div>
                            {reward[0]} Moedas de ouro
                        </div>
                        <div>
                            {reward[1]} Experiência
                        </div>
                    </div>


                    <button
                        onClick={backToHome}
                        className={`p-3 mt-20 mx-auto mb-3 bg-amarelo-200 text-verde-600 rounded-md w-2/5 text-center cursor-pointer hover:text-amarelo-700`}>
                        Home
                    </button>
                </div>
            }
        </>
    )
}

export default GameEndContainer