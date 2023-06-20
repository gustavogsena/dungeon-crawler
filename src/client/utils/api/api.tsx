import axios from 'axios';
import { AuthToken } from '../authToken';
/* import store from '../store';
import { authenticatedUser, userLogout } from '../store/reducers/user.slice'; */
import toast from 'react-simple-toasts';
import { browserHistory } from '../browserHistory';

const texts = {
    unauthenticatedError: 'Erro de autenticação'
}
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
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

            if (error.response.data.errors) {
                const errors: string[] = error.response.data.errors.map(({ constraints }: any) => Object.values(constraints)).flat()

                errorToasts(errors)
            } else if (error.response.data.message) {
                const errors: string = error.response.data.message
                errorToasts(errors)
            }

        }
    })


function errorToasts(errors: string[] | string) {
    if (Array.isArray(errors)) {
        errors.map((error) => {
            toast(error)
        })
    } else if (typeof errors === "string") {
        toast(errors)
    }

}


export default api