import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


function StandardGameContainer() {
    return (
        <div className='w-screen h-auto md:h-screen sm:content-none bg-castle bg-fixed bg-center bg-cover flex-wrap  '>
            <Header />
            <div className='flex w-full h-auto md:h-[calc(100vh-96px)] py-8 px-8 sm:px-16 justify-between gap-3 overflow-x-auto relative'>
                <Outlet />
            </div>
        </div >
    )
}

export default StandardGameContainer