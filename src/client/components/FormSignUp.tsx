import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { userSignUp } from '../store/reducers/user.slice';

const texts = {
    signUpTitle: "Criar conta",
    signUpButton: "Registrar",
    toSignInButton: "Login",
};

function FormSignUp() {
    const [form, setForm] = useState({ name: '', surname: '', email: '', username: '', password: '' })
    const dispatch = useDispatch()

    const signUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(userSignUp(form))
    }

    return (
        <form noValidate className='flex flex-col gap-2 w-full max-w-[350px] bg-cinza-600 bg-opacity-70 p-4 rounded-2xl' onSubmit={(event) => signUp(event)}>
            <h2 className='text-center mb-2 font-gotika text-2xl text-amarelo-700'>{texts.signUpTitle}</h2>
            <input className='p-2 rounded-md bg-cinza-600' type='text' placeholder='Nome' value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <input className='p-2 rounded-md bg-cinza-600' type='text' placeholder='Sobrenome' value={form.surname} onChange={(event) => setForm({ ...form, surname: event.target.value })} />
            <input className='p-2 rounded-md bg-cinza-600' type='email' placeholder='E-mail' value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <input className='p-2 rounded-md bg-cinza-600' type='text' placeholder='Nome de usuário' value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
            <input className='p-2 rounded-md bg-cinza-600' type='password' placeholder='Senha' value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <button
                type='submit'
                className='p-2 min-w-[150px] bg-amarelo-700 rounded-md w-full text-lg  self-center text-cinza-400 uppercase'>
                {texts.signUpButton}
            </button>
            <Link to='/sign-in' className='text-amarelo-700 text-center uppercase hover:underline'>{texts.toSignInButton}</Link>
        </form>
    )
}

export default FormSignUp