import React, { useState } from 'react'
import Select from '../components/Select';
import CreateHeroSelectClassContainer from '../components/CreateHeroSelectClassContainer';
import CreateHeroPreviewContainer from '../components/CreateHeroPreviewContainer';
import { CreateHeroForm } from '../../types';



function CreateHero() {
const [createHeroForm, setCreateHeroForm] = useState<CreateHeroForm>({class: '' , name: ''})

    return (

        <>
            <CreateHeroSelectClassContainer formValue={createHeroForm} setForm={setCreateHeroForm}/>
            <CreateHeroPreviewContainer formValue={createHeroForm} setForm={setCreateHeroForm}/>
        </>
    )
}

export default CreateHero