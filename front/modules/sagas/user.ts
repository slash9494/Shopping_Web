import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  LOAD_CART_PRODUCTS_SUCCESS,
} from "./../actions";
import axios from "axios";
import {
  all,
  call,
  fork,
  put,
  takeLatest,
  takeEvery,
  delay,
} from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  SIGN_UP_REQUEST,
  AUTH_CHECK_REQUEST,
  loginActionAsync,
  signUpActionAsync,
  logOutActionAsync,
  authCheckActionAsync,
  addToCartActionAsync,
  ADD_TO_CART_REQUEST,
} from "../actions";

import createAsyncSaga, {
  createAsyncDummySaga,
} from "../utils/createAsyncSaga";
import { UserCartInfo } from "../../pages/cart";
import { ProductByIdInfo } from "../types";

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
  yield takeLatest(LOG_IN_REQUEST, loginAsyncSaga);
}

async function signUpAPI(signUpData: SignUpProps) {
  const response = await axios.post("/api/users/signUp", signUpData);
  return response.data;
}

const signUpAsyncSaga = createAsyncSaga(signUpActionAsync, signUpAPI);

function* signUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUpAsyncSaga);
}

async function logOutAPI() {
  const response = await axios.get("/api/users/logout");
  return response.data;
}

const logOutAsyncSaga = createAsyncSaga(logOutActionAsync, logOutAPI);

function* logOutSaga() {
  yield takeLatest(LOG_OUT_REQUEST, logOutAsyncSaga);
}

async function authCheckAPI() {
  const response = await axios.get("/api/users/auth");
  return response.data;
}

const authCheckAsyncSaga = createAsyncSaga(authCheckActionAsync, authCheckAPI);

function* authCheckSaga() {
  yield takeEvery(AUTH_CHECK_REQUEST, authCheckAsyncSaga);
}

async function addToCartAPI(_id: string, productInfo: ProductByIdInfo) {
  const response = await axios.post(
    `/api/users/addToCart?productId=${_id}`,
    productInfo
  );
  return response.data;
}

// const addToCartAsyncSaga = createAsyncSaga(addToCartActionAsync, addToCartAPI);

function* addToCartAsyncSaga(action: any) {
  try {
    const addToCartResult = yield call(
      addToCartAPI,
      action.id,
      action.productInfo
    );
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: addToCartResult,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_TO_CART_FAILURE,
      payload: error.response.data,
    });
  }
}

function* addToCartSaga() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCartAsyncSaga);
}

async function removeCartItemAPI(id: string) {
  const response = await axios.get(`/api/users/removeFromCart?_id=${id}`);
  response.data.userCart.forEach((cartItem: UserCartInfo) => {
    response.data.productInfo.forEach(
      (productItemInfo: ProductByIdInfo, index: any) => {
        if (cartItem.id === productItemInfo._id) {
          response.data.userCart[index].quantity = productItemInfo.quantity;
        }
      }
    );
  });

  return response.data;
}

// const removeCartItemAsyncSaga = createAsyncSaga()

// function* removeCartItemSaga(){
//   yield takeLatest()
// }

export default function* userSaga() {
  yield all([
    fork(logInSaga),
    fork(signUpSaga),
    fork(logOutSaga),
    fork(authCheckSaga),
    fork(addToCartSaga),
  ]);
}
