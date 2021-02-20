import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  SIGN_UP_REQUEST,
  AUTH_CHECK_REQUEST,
  loginActionAsync,
  signUpActionAsync,
  logOutActionAsync,
  authCheckActionAsync,
} from "../actions";

import createAsyncSaga from "../utils/createAsyncSaga";

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

const loginAsyncSaga = createAsyncSaga(loginActionAsync, loginAPI);

function* logInSaga() {
  yield takeEvery(LOG_IN_REQUEST, loginAsyncSaga);
}

async function signUpAPI(signUpData: SignUpProps) {
  const response = await axios.post("/api/users/signUp", signUpData);
  return response.data;
}

const signUpAsyncSaga = createAsyncSaga(signUpActionAsync, signUpAPI);

function* signUpSaga() {
  yield takeEvery(SIGN_UP_REQUEST, signUpAsyncSaga);
}

async function logOutAPI() {
  const response = await axios.get("/api/users/logout");
  return response.data;
}
// function* logOut() {
//   try {
//     const result = yield call(logOutAPI);

//     yield put({
//       type: LOG_OUT_SUCCESS,
//       payload: result,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: LOG_OUT_FAILURE,
//       payload: e,
//     });
//   }
// }

const logOutAsyncSaga = createAsyncSaga(logOutActionAsync, logOutAPI);

function* logOutSaga() {
  yield takeEvery(LOG_OUT_REQUEST, logOutAsyncSaga);
}

async function authCheckAPI() {
  const response = await axios.get("/api/users/auth");
  return response.data;
}

// function* authCheck() {
//   try {
//     const result = yield call(authCheckAPI);
//     yield put({
//       type: AUTH_CHECK_SUCCESS,
//       payload: result,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: AUTH_CHECK_FAILURE,
//       payload: e,
//     });
//   }
// }

const authCheckAsyncSaga = createAsyncSaga(authCheckActionAsync, authCheckAPI);

function* authCheckSaga() {
  yield takeEvery(AUTH_CHECK_REQUEST, authCheckAsyncSaga);
}

export default function* userSaga() {
  yield all([
    fork(logInSaga),
    fork(signUpSaga),
    fork(logOutSaga),
    fork(authCheckSaga),
  ]);
}
