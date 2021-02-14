import { AxiosError } from "axios";

import { State, Action } from "../types";
import { createReducer } from "typesafe-actions";
import produce from "immer";

import { WritableDraft } from "immer/dist/internal";
import { access } from "fs";

// import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../actions";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const AUTH_CHECK_REQUEST = "AUTH_CHECK_REQUEST";
export const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";
export const AUTH_CHECK_FAILURE = "AUTH_CHECK_FAILURE";

export const initialState: State = {
  // loginSuccess: null,
  // register: null,
  // userData: null,
  loginInfo: {
    isLoggingIn: false,
    logInError: null,
    loginSuccess: null,
    userId: null,
    message: null,
  },
  logOutInfo: {
    isLogginOut: false,
    logOutError: null,
    logOutSuccess: null,
  },
  signUpInfo: {
    isSigningUp: false,
    SignUpError: null,
    signUpSuccess: false,
  },
  authCheckInfo: {
    isAuthChecking: false,
    authCheckError: null,
    _id: "",
    isAdmin: null,
    isAuth: null,
    email: "",
    name: "",
    role: null,
  },
};

// const userReducer =  (state=initialState,action:Action)=>produce(state,(draft:WritableDraft<action.payload,ction>)=>{
//   switch(action.type){
//     case LOG_IN_REQUEST:{
//       draft.loginInfo.isLoggingIn=true;
//       break;
//     }
//     case LOG_IN_SUCCESS:{
//       draft.loginInfo.isLogginIn=false,
//       draft.loginInfo.
//     }
//     default:{

//     }
//   }
// }

const userReducer = createReducer<State, Action>(initialState, {
  [LOG_IN_REQUEST]: (state) => ({
    ...state,
    loginInfo: {
      isLoggingIn: true,
      logInError: null,
      loginSuccess: null,
      userId: null,
      message: null,
    },
  }),
  [LOG_IN_SUCCESS]: (state, action) => ({
    ...state,
    loginInfo: {
      isLoggingIn: false,
      logInError: null,
      loginSuccess: action.payload.loginSuccess,
      userId: action.payload.userId,
      message: action.payload.message,
    },
  }),
  [LOG_IN_FAILURE]: (state, action) => ({
    ...state,
    loginInfo: {
      isLoggingIn: false,
      logInError: action.payload,
      loginSuccess: null,
      userId: null,
      message: null,
    },
  }),
  [LOG_OUT_REQUEST]: (state) => ({
    ...state,
    logOutInfo: {
      isLogginOut: true,
      logOutError: null,
      logOutSuccess: null,
    },
  }),
  [LOG_OUT_SUCCESS]: (state, action) => ({
    ...state,
    logOutInfo: {
      isLogginOut: false,
      logOutError: null,
      logOutSuccess: action.payload.logOutSuccess,
    },
  }),
  [LOG_OUT_FAILURE]: (state, action) => ({
    ...state,
    logOutInfo: {
      isLogginOut: false,
      logOutError: action.payload,
      logOutSuccess: false,
    },
  }),
  [AUTH_CHECK_REQUEST]: (state) => ({
    ...state,
    authCheckInfo: {
      isAuthChecking: true,
      authCheckError: null,
      _id: "",
      isAdmin: false,
      isAuth: false,
      email: "",
      name: "",
      role: null,
    },
  }),
  [AUTH_CHECK_SUCCESS]: (state, action) => ({
    ...state,
    authCheckInfo: {
      isAuthChecking: false,
      authCheckError: null,
      _id: action.payload._id,
      isAdmin: action.payload.isAdmin,
      isAuth: action.payload.isAuth,
      email: action.payload.email,
      name: action.payload.name,
      role: action.payload.role,
    },
  }),
  [AUTH_CHECK_FAILURE]: (state, action) => ({
    ...state,
    authCheckInfo: {
      isAuthChecking: true,
      authCheckError: action.payload,
      _id: "",
      isAdmin: false,
      isAuth: false,
      email: "",
      name: "",
      role: null,
    },
  }),
});

export default userReducer;
