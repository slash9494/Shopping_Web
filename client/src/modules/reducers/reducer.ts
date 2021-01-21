import {State,Action} from '../types';
import {createReducer} from 'typesafe-actions';
import { LOGIN_USER } from '../actions';


const initialState:State = [];

const userReducer = createReducer<State,Action>(initialState,{
    [LOGIN_USER] : (state,action) =>({
        ...state,
        loginSuccess:action.payload
    })
})

export default userReducer