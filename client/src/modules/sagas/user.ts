import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_FAILURE,
  AUTH_CHECK_SUCCESS,
} from "../actions";
import { resolve } from "dns";
import { response } from "express";

type LoginAPIProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  email: string;
  password: string;
  name: string;
};

async function loginAPI(loginData: LoginAPIProps) {
  const response = await axios.post("/api/users/login", loginData);
  return response.data;
}

function* logIn(action: any) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      payload: e.response && e.response.data,
    });
  }
}

function* logInSaga() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

async function signUpAPI(signUpData: SignUpProps) {
  const response = await axios.post("/api/users/register", signUpData);
  return response.data;
}

function* signUp(action: any) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      payload: e,
    });
  }
}

function* signUpSaga() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

async function logOutAPI() {
  const response = await axios.get("/api/users/logout");
  return response.data;
}
function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      payload: e,
    });
  }
}

function* logOutSaga() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

async function authCheckAPI() {
  const response = await axios.get("/api/users/auth");
  return response.data;
}

function* authCheck() {
  try {
    const result = yield call(authCheckAPI);
    yield put({
      type: AUTH_CHECK_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: AUTH_CHECK_FAILURE,
      payload: e,
    });
  }
}

function* authCheckSaga() {
  yield takeEvery(AUTH_CHECK_REQUEST, authCheck);
}

export default function* userSaga() {
  yield all([
    fork(logInSaga),
    fork(signUpSaga),
    fork(logOutSaga),
    fork(authCheckSaga),
  ]);
}
