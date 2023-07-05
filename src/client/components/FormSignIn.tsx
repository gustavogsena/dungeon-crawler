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
        <form noValidate className='flex flex-col gap-3 w-full max-w-[350px] bg-black bg-opacity-75 p-4 rounded-2xl ' onSubmit={(event) => signIn(event)}>
            <h2 className='text-center mb-2 font-gotika text-2xl text-amarelo-200'>{texts.loginTitle}</h2>
            <input className='bg-amarelo-200 shadow-sm w-full rounded-[10px] text-base p-3 box-border text-verde-600 placeholder-verde-600 placeholder-opacity-100 ' type='text' placeholder='Nome de usuário' value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
            <input className='bg-amarelo-200 shadow-sm w-full rounded-[10px] text-base p-3 box-border text-verde-600 placeholder-verde-600 placeholder-opacity-100' type='password' placeholder='Senha' value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <button
                type='submit'
                className='p-2 min-w-[150px] w-full text-lg  self-center bg-verde-600 rounded-md hover:bg-verde-300 uppercase text-amarelo-200 font-bold'>
                {texts.loginButton}
            </button>
            <Link to='/sign-up' className='text-amarelo-200 text-center uppercase hover:underline'>{texts.createAccountButton}</Link>
        </form>
    )
}

export default FormSignIn