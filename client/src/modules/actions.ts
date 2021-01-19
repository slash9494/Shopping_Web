import axios from 'axios';
import {createAction} from 'typesafe-actions';

type LoginUserProps = {
    email:string;
    password:string;
}

export const LOGIN_USER = 'login_user';

export function loginUser (dataToSubmit: LoginUserProps){
    const request = axios.post('api/users/login',dataToSubmit)
        .then(response=>response.data)
    
    return {
        type:LOGIN_USER,
        payload:request
    }
}