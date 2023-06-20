import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { User } from '../../types';
import { RootState } from '../store';
import { AuthToken } from '../utils/authToken';
import { getUser } from '../store/reducers/user.slice';

function LoadAuthUser() {
    const user = useSelector<RootState, User>(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = AuthToken.get();
        if (!token || user.isAuthenticated) {
            return;
        }

        dispatch(getUser())

    }, []);
    return null
}

export default LoadAuthUser