import { AxiosError } from "axios";
import { createAction, Action, createAsyncAction } from "typesafe-actions";
import {
  LoginInfo,
  LogOutInfo,
  UserData,
  SignUpInfo,
  FileUploadInfo,
  UploadProductInfo,
  LoadProductsInfo,
  LoadProductByIdInfo,
  ProductByIdInfo,
} from "./types";
// import { createAsyncAction, asyncActionCreator } from "./utils/actionUtil";

// User Action //
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
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";
export const REMOVE_CART_ITEM_REQUEST = "REMOVE_CART_ITEM_REQUEST";
export const REMOVE_CART_ITEM_SUCCESS = "REMOVE_CART_ITEM_SUCCESS";
export const REMOVE_CART_ITEM_FAILURE = "REMOVE_CART_ITEM_FAILURE";

export const AUTH_DUMMY_REQUEST = "AUTH_DUMMY_REQUEST";
export const AUTH_DUMMY_SUCCESS = "AUTH_DUMMY_SUCCESS";
export const AUTH_DUMMY_FAILURE = "AUTH_DUMMY_FAILURE";
// Upload Action //
export const FILE_UPLOAD_REQUEST = "FILE_UPLOAD_REQUEST";
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_FAILURE = "FILE_UPLOAD_FAILURE";
export const UPLOAD_MAN_PRODUCT_REQUEST = "UPLOAD_MAN_PRODUCT_REQUEST";
export const UPLOAD_MAN_PRODUCT_SUCCESS = "UPLOAD_MAN_PRODUCT_SUCCESS";
export const UPLOAD_MAN_PRODUCT_FAILURE = "UPLOAD_MAN_PRODUCT_FAILURE";
export const UPLOAD_WOMAN_PRODUCT_REQUEST = "UPLOAD_WOMAN_PRODUCT_REQUEST";
export const UPLOAD_WOMAN_PRODUCT_SUCCESS = "UPLOAD_WOMAN_PRODUCT_SUCCESS";
export const UPLOAD_WOMAN_PRODUCT_FAILURE = "UPLOAD_WOMAN_PRODUCT_FAILURE";
export const UPLOAD_KID_PRODUCT_REQUEST = "UPLOAD_KID_PRODUCT_REQUEST";
export const UPLOAD_KID_PRODUCT_SUCCESS = "UPLOAD_KID_PRODUCT_SUCCESS";
export const UPLOAD_KID_PRODUCT_FAILURE = "UPLOAD_KID_PRODUCT_FAILURE";

export const UPLOAD_DUMMY_MAN_PRODUCT_REQUEST =
  "UPLOAD_DUMMY_MAN_PRODUCT_REQUEST";
export const UPLOAD_DUMMY_MAN_PRODUCT_SUCCESS =
  "UPLOAD_DUMMY_MAN_PRODUCT_SUCCESS";
export const UPLOAD_DUMMY_MAN_PRODUCT_FAILURE =
  "UPLOAD_DUMMY_MAN_PRODUCT_FAILURE";
// Load Product Action //
export const LOAD_MAN_PRODUCTS_REQUEST = "LOAD_MAN_PRODUCTS_REQUEST";
export const LOAD_MAN_PRODUCTS_SUCCESS = "LOAD_MAN_PRODUCTS_SUCCESS";
export const LOAD_MAN_PRODUCTS_FAILURE = "LOAD_MAN_PRODUCTS_FAILURE";
export const LOAD_WOMAN_PRODUCTS_REQUEST = "LOAD_WOMAN_PRODUCTS_REQUEST";
export const LOAD_WOMAN_PRODUCTS_SUCCESS = "LOAD_WOMAN_PRODUCTS_SUCCESS";
export const LOAD_WOMAN_PRODUCTS_FAILURE = "LOAD_WOMAN_PRODUCTS_FAILURE";
export const LOAD_KID_PRODUCTS_REQUEST = "LOAD_KID_PRODUCTS_REQUEST";
export const LOAD_KID_PRODUCTS_SUCCESS = "LOAD_KID_PRODUCTS_SUCCESS";
export const LOAD_KID_PRODUCTS_FAILURE = "LOAD_KID_PRODUCTS_FAILURE";
export const LOAD_PRODUCT_BY_ID_REQUEST = "LOAD_PRODUCT_BY_ID_REQUEST";
export const LOAD_PRODUCT_BY_ID_SUCCESS = "LOAD_PRODUCT_BY_ID_SUCCESS";
export const LOAD_PRODUCT_BY_ID_FAILURE = "LOAD_PRODUCT_BY_ID_FAILURE";

// const LOG_IN = asyncActionCreator(`LOG_IN`);
// export const loginActionAsync = createAsyncAction(LOG_IN)

// User ActionCreator //

export const loginActionAsync = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
)<any, LoginInfo, AxiosError>();

export const logOutActionAsync = createAsyncAction(
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
)<void, LogOutInfo, AxiosError>();

export const authCheckActionAsync = createAsyncAction(
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE
)<void, UserData, AxiosError>();

export const signUpActionAsync = createAsyncAction(
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
)<any, SignUpInfo, AxiosError>();

export const addToCartActionAsync = createAsyncAction(
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE
)<any, UserData, AxiosError>();

//removecartitem

export const authCheckDummyActionAsync = createAsyncAction(
  AUTH_DUMMY_REQUEST,
  AUTH_DUMMY_SUCCESS,
  AUTH_DUMMY_FAILURE
)<any, any, AxiosError>();

// Upload ActionCreator //

export const fileUploadActionAsync = createAsyncAction(
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE
)<any, FileUploadInfo, AxiosError>();

export const uploadManProductActionAsync = createAsyncAction(
  UPLOAD_MAN_PRODUCT_REQUEST,
  UPLOAD_MAN_PRODUCT_SUCCESS,
  UPLOAD_MAN_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

export const uploadWomanProductActionAsync = createAsyncAction(
  UPLOAD_WOMAN_PRODUCT_REQUEST,
  UPLOAD_WOMAN_PRODUCT_SUCCESS,
  UPLOAD_WOMAN_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

export const uploadKidProductActionAsync = createAsyncAction(
  UPLOAD_KID_PRODUCT_REQUEST,
  UPLOAD_KID_PRODUCT_SUCCESS,
  UPLOAD_KID_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

export const uploadDummyManProductActionAsync = createAsyncAction(
  UPLOAD_DUMMY_MAN_PRODUCT_REQUEST,
  UPLOAD_DUMMY_MAN_PRODUCT_SUCCESS,
  UPLOAD_DUMMY_MAN_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

// Load Product ActionCreator //

export const loadManProductsActionAsync = createAsyncAction(
  LOAD_MAN_PRODUCTS_REQUEST,
  LOAD_MAN_PRODUCTS_SUCCESS,
  LOAD_MAN_PRODUCTS_FAILURE
)<any, LoadProductsInfo, AxiosError>();

export const loadProductByIdActionAsync = createAsyncAction(
  LOAD_PRODUCT_BY_ID_REQUEST,
  LOAD_PRODUCT_BY_ID_SUCCESS,
  LOAD_PRODUCT_BY_ID_FAILURE
)<any, ProductByIdInfo, AxiosError>();

// ###################

// export const loginActionAsync = createAsyncAction(
//   {
//     REQUEST:'LOG_IN_REQUEST',
//     SUCCESS:'LOG_IN_SUCCESS',
//     FAILURE:'LOG_IN_FAILURE'
//   }
// )

// export const logOutActionAsync = createAsyncAction(
//   LOG_OUT_REQUEST,
//   LOG_OUT_SUCCESS,
//   LOG_OUT_FAILURE
// )<void, LogOutInfo, AxiosError>();

// export const authCheckActionAsync = createAsyncAction(
//   AUTH_CHECK_REQUEST,
//   AUTH_CHECK_SUCCESS,
//   AUTH_CHECK_FAILURE
// )<void, UserData, AxiosError>();

// export const signUpActionAsync = createAsyncAction(
//   SIGN_UP_REQUEST,
//   SIGN_UP_SUCCESS,
//   SIGN_UP_FAILURE
// )<any, SignUpInfo, AxiosError>();

// export const addToCartActionAsync = createAsyncAction(
//   ADD_TO_CART_REQUEST,
//   ADD_TO_CART_SUCCESS,
//   ADD_TO_CART_FAILURE
// )<any, UserData, AxiosError>();

// export const authCheckDummyActionAsync = createAsyncAction(
//   AUTH_DUMMY_REQUEST,
//   AUTH_DUMMY_SUCCESS,
//   AUTH_DUMMY_FAILURE
// )<any, any, AxiosError>();

// // Upload ActionCreator //

// export const fileUploadActionAsync = createAsyncAction(
//   FILE_UPLOAD_REQUEST,
//   FILE_UPLOAD_SUCCESS,
//   FILE_UPLOAD_FAILURE
// )<any, FileUploadInfo, AxiosError>();

// export const uploadManProductActionAsync = createAsyncAction(
//   UPLOAD_MAN_PRODUCT_REQUEST,
//   UPLOAD_MAN_PRODUCT_SUCCESS,
//   UPLOAD_MAN_PRODUCT_FAILURE
// )<any, UploadProductInfo, AxiosError>();

// export const uploadWomanProductActionAsync = createAsyncAction(
//   UPLOAD_WOMAN_PRODUCT_REQUEST,
//   UPLOAD_WOMAN_PRODUCT_SUCCESS,
//   UPLOAD_WOMAN_PRODUCT_FAILURE
// )<any, UploadProductInfo, AxiosError>();

// export const uploadKidProductActionAsync = createAsyncAction(
//   UPLOAD_KID_PRODUCT_REQUEST,
//   UPLOAD_KID_PRODUCT_SUCCESS,
//   UPLOAD_KID_PRODUCT_FAILURE
// )<any, UploadProductInfo, AxiosError>();

// export const uploadDummyManProductActionAsync = createAsyncAction(
//   UPLOAD_DUMMY_MAN_PRODUCT_REQUEST,
//   UPLOAD_DUMMY_MAN_PRODUCT_SUCCESS,
//   UPLOAD_DUMMY_MAN_PRODUCT_FAILURE
// )<any, UploadProductInfo, AxiosError>();

// // Load Product ActionCreator //

// export const loadManProductsActionAsync = createAsyncAction(
//   LOAD_MAN_PRODUCTS_REQUEST,
//   LOAD_MAN_PRODUCTS_SUCCESS,
//   LOAD_MAN_PRODUCTS_FAILURE
// )<void, LoadProductsInfo, AxiosError>();

// export const loadProductByIdActionAsync = createAsyncAction(
//   LOAD_PRODUCT_BY_ID_REQUEST,
//   LOAD_PRODUCT_BY_ID_SUCCESS,
//   LOAD_PRODUCT_BY_ID_FAILURE
// )<any, ProductByIdInfo, AxiosError>();
