import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { User } from '../../types';
import { RootState } from '../store';
import { AuthToken } from '../utils/authToken';
import { getUser } from '../store/reducers/user.slice';
import { useNavigate } from 'react-router-dom';

function LoadAuthUser() {
    const user = useSelector<RootState, User>(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const token = AuthToken.get();
        console.log(token)
        if (!token) {
            navigate('/sign-in')
            return;
        }
        if (user.isAuthenticated) return

        dispatch(getUser())

    }, []);
    return null
}

export default LoadAuthUser