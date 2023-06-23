import React, { useState } from 'react'
import Select from '../components/Select';
import CreateHeroSelectClassContainer from '../components/CreateHeroSelectClassContainer';
import CreateHeroPreviewContainer from '../components/CreateHeroPreviewContainer';



function CreateHero() {


    return (

        <>
            <CreateHeroSelectClassContainer />
            <CreateHeroPreviewContainer />
        </>
    )
}

export default CreateHero