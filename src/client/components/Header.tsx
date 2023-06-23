import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/reducers/user.slice';
import { RootState } from '../store';
import { User } from '../../types';

const texts = {
    title: "Magic Dungeon",
    signOut: "Sair",
};

function Header() {
    const user = useSelector<RootState, User>(state => state.user)

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(removeUser())
    }

    return (
        <header className='px-8 sm:px-16 py-4 bg-black bg-opacity-75 h-24 w-full flex justify-between text-amarelo-200'>
            <h1 className='font-gotika text-2xl text-amarelo-200 text-center self-start py-4' >
                {texts.title}
            </h1>
            <nav className='text-xl flex gap-5 items-center'>
                <span className='uppercase'>{user.username}</span>
                <button
                    className='py-2 w-24 bg-azul-600 rounded-md hover:bg-azul-400'
                    onClick={logout}
                >{texts.signOut}</button>
            </nav>
        </header>
    )
}

export default Header