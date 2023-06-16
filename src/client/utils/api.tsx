import axios from 'axios';
import { AuthToken } from './authToken';
/* import store from '../store';
import { authenticatedUser, userLogout } from '../store/reducers/user.slice'; */
import toast from 'react-simple-toasts';
import { browserHistory } from './browserHistory';

const texts = {
    unauthenticatedError: 'Erro de autenticação'
}
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use(config => {
    const token = AuthToken.get()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        /*         store.dispatch(authenticatedUser(token)) */
    }
    return config
})


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status: number = error.request.status;
        if (status === 401) {
            AuthToken.remove();
            toast(texts.unauthenticatedError);
            browserHistory.push("/");
        } else if (status === 400) {
        }
    })

export default api