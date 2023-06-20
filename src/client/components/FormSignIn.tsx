import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {userSignIn } from '../store/reducers/user.slice';


const texts = {
    loginTitle: "Fazer login",
    loginButton: "login",
    createAccountButton: "Criar conta",
};

function FormSignIn() {
    const [form, setForm] = useState({ username: '', password: '' })
    const dispatch = useDispatch()

    const signIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(userSignIn(form))
    }

    return (
        <form noValidate className='flex flex-col gap-2 w-full max-w-[350px] bg-cinza-600 bg-opacity-70 p-4 rounded-2xl ' onSubmit={(event) => signIn(event)}>
            <h2 className='text-center mb-2 font-gotika text-2xl text-amarelo-700'>{texts.loginTitle}</h2>
            <input className='p-2 rounded-md bg-cinza-600' type='text' placeholder='Nome de usuário' value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
            <input className='p-2 rounded-md bg-cinza-600' type='password' placeholder='Senha' value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <button
                type='submit'
                className='p-2 min-w-[150px] bg-amarelo-700 rounded-md w-full text-lg  self-center text-cinza-400 uppercase'>
                {texts.loginButton}
            </button>
            <Link to='/sign-up' className='text-amarelo-700 text-center uppercase hover:underline'>{texts.createAccountButton}</Link>
        </form>
    )
}

export default FormSignIn