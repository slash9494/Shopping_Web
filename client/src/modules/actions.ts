import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { LoginInfo, LogOutInfo, AuthCheckInfo } from "./types";

// type LoginUserProps = {
//   email: string;
//   password: string;
// };

// export type RegisterUserProps = {
//   email: string;
//   password: string;
//   name: string;
// };

export const LOGIN_USER = "login_user";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const REGISTER_USER = "register_user";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const AUTH_USER = "auth_user";
export const AUTH_CHECK_REQUEST = "AUTH_CHECK_REQUEST";
export const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";
export const AUTH_CHECK_FAILURE = "AUTH_CHECK_FAILURE";

export const loginActionAsync = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
)<String, LoginInfo, AxiosError>();

export const logOutActionAsync = createAsyncAction(
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
)<String, LogOutInfo, AxiosError>();

export const authCheckActionAsync = createAsyncAction(
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE
)<String, AuthCheckInfo, AxiosError>();
// export const Async = createAsyncAction(
//     LOG_IN_SUCCESS,
//     LOG_IN_FAILURE,
//     LOG_IN_REQUEST
// )

// export function loginUser(dataToSubmit: LoginUserProps) {
//   const request = axios
//     .post("/api/users/login", dataToSubmit)
//     .then((response) => response.data);

//   return {
//     type: LOGIN_USER,
//     payload: request,
//   };
// }

// export function registerUser(dataToSubmit: RegisterUserProps) {
//   const request = axios
//     .post("/api/users/register", dataToSubmit)
//     .then((response) => response.data);

//   return {
//     type: REGISTER_USER,
//     payload: request,
//   };
// }

// export function auth() {
//   const request = axios
//     .get("/api/users/auth")
//     .then((response) => response.data);

//   return {
//     type: AUTH_USER,
//     payload: request,
//   };
// }
