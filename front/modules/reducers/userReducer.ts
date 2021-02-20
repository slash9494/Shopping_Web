import { RootState } from "./index";
import { asyncState } from "../utils/reducerUtil";
import { UserState, Action } from "../types";
import { createReducer } from "typesafe-actions";
import produce from "immer";
import { WritableDraft } from "immer/dist/internal";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
} from "../actions";
import { useSelector } from "react-redux";

export const initialState: UserState = {
  loginInfo: asyncState.initial(),
  logOutInfo: asyncState.initial(),
  signUpInfo: asyncState.initial(),
  authCheckInfo: asyncState.initial(),
};

const userReducer = createReducer<UserState, Action>(initialState, {
  [LOG_IN_REQUEST]: (state) => ({
    ...state,
    loginInfo: asyncState.load(),
  }),
  [LOG_IN_SUCCESS]: (state, action) => ({
    ...state,
    loginInfo: asyncState.success(action.payload),
  }),
  [LOG_IN_FAILURE]: (state, action) => ({
    ...state,
    loginInfo: asyncState.error(action.payload),
  }),
  [LOG_OUT_REQUEST]: (state) => ({
    ...state,
    logOutInfo: asyncState.load(),
  }),
  [LOG_OUT_SUCCESS]: (state, action) => ({
    ...state,
    logOutInfo: asyncState.success(action.payload),
    loginInfo: asyncState.initial(),
    authCheckInfo: asyncState.initial(),
  }),
  [LOG_OUT_FAILURE]: (state, action) => ({
    ...state,
    logOutInfo: asyncState.error(action.payload),
  }),
  [AUTH_CHECK_REQUEST]: (state) => ({
    ...state,
    authCheckInfo: asyncState.load(state.authCheckInfo?.data),
  }),
  [AUTH_CHECK_SUCCESS]: (state, action) => ({
    ...state,
    authCheckInfo: asyncState.success(action.payload),
  }),
  [AUTH_CHECK_FAILURE]: (state, action) => ({
    ...state,
    authCheckInfo: asyncState.error(action.payload),
  }),
  [SIGN_UP_REQUEST]: (state) => ({
    ...state,
    signUpInfo: asyncState.load(),
  }),
  [SIGN_UP_SUCCESS]: (state, action) => ({
    ...state,
    signUpInfo: asyncState.success(action.payload),
  }),
  [SIGN_UP_FAILURE]: (state, action) => ({
    ...state,
    signUpInfo: asyncState.error(action.payload),
  }),
});

export default userReducer;
