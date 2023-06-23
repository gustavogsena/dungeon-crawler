import React from 'react'
import Header from '../components/Header'
import SelectHeroContainer from '../components/SelectHeroContainer'
import HeroContainer from '../components/HeroContainer';


function Home() {
    return (
        <>
            <SelectHeroContainer />
            <HeroContainer />
        </>
    )
}

export default Home