
import { post, get } from './index';

import { store } from '../store';

export const signIn = ({ email, password }) => {
    return post({
        url: '/auth/signin',
        body: {
            email, password
        }
    })
}




export const signUp = ({ email, password, userName }) => {
    return post({
        url: '/auth/signup',
        body: {
            email, password, userName
        }
    })
}


export const getUserInfo = () => {
    return get({
        url: '/auth/userInfo',
    })
}