import React, { useEffect, useState } from 'react'
import Select from '../components/Select';
import { getBasicHeroStatus } from '../store/reducers/hero.slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DungeonSelectContainer from '../components/DungeonSelectContainer';
import DungeonPreviewContainer from '../components/DungeonPreviewContainer';

function DungeonMenu() {
  const [selectDungeon, setSelectDungeon] = useState('')

  return (
    <>
      <DungeonSelectContainer selectDungeon={selectDungeon} setSelectDungeon={setSelectDungeon}/>
      <DungeonPreviewContainer selectDungeon={selectDungeon} setSelectDungeon={setSelectDungeon}/>
    </>
  )
}

export default DungeonMenu