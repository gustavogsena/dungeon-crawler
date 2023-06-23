import React from 'react'


const texts = {
    title: "Magic Dungeon",
};

type StandardSignContainerType = {
    children: JSX.Element | JSX.Element[]
}

function StandardSignContainer({ children } : StandardSignContainerType) {
    return (
        <div className='flex w-screen h-screen justify-center items-center content-center sm:content-none bg-dungeon bg-fixed bg-center bg-cover flex-wrap'>
            <h1 className='font-gotika text-7xl text-amarelo-200 mt-4 sm:mt-28 mb-6 text-center leading-[92px] self-start w-full sm:absolute ' >
                {texts.title}
            </h1>
            {children}
        </div>
    )
}

export default StandardSignContainer