import React, { useEffect, useState } from 'react'
import Select from './Select'
import { useNavigate } from 'react-router-dom';
import { CreateHeroForm } from '../../types';
import { getBasicHeroStatus } from '../store/reducers/hero.slice';
import { useDispatch } from 'react-redux';


const texts = {
    createHeroTitle: 'Criar novo Heroi',
    backToHeroPage: "Voltar para seleção de herois"
};

const classOptions = [['Guerreiro', 'knight'], ['Mago', 'wizard'], ['Arqueiro', 'archer'], ['Clerigo', 'cleric']]

type CreateHeroSelectClassContainerType = {
    formValue: CreateHeroForm
    setForm: (obj: CreateHeroForm) => void
}

function CreateHeroSelectClassContainer({ formValue, setForm }: CreateHeroSelectClassContainerType) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigateToHeroPage = () => {
        navigate('/')
    }


    useEffect(() => {
        dispatch(getBasicHeroStatus(formValue.class))
    }, [formValue.class])
    
    return (
        <div className='bg-black h-full md:w-1/4 max-w-[350px] min-w-[250px] rounded-lg bg-opacity-75 justify-center flex flex-wrap py-6'>
            <h3 className='font-gotika text-2xl text-amarelo-200 mt-4 mb-6 text-center self-start w-full'>
                {texts.createHeroTitle}
            </h3>

            <div className='w-4/5 py-3 mx-auto flex flex-col'>
                <Select value={formValue.class} funcaoOnChange={(value) => setForm({ ...formValue, class: value })} options={classOptions} />
            </div>
            <div className='w-4/5 h-[calc(100%-249px)] py-3 mx-auto flex flex-col '>
                <p className='text-amarelo-200 text-justify overflow-y-auto pr-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>

            <button
                onClick={navigateToHeroPage}
                className='text-amarelo-200 bg-verde-600 rounded-md hover:bg-verde-300 py-4 font-bold w-4/5 mx-auto grow-0 self-end text-xl'>
                {texts.backToHeroPage}
            </button>
        </div>
    )
}

export default CreateHeroSelectClassContainer