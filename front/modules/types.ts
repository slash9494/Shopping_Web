import { AsyncState } from "./utils/reducerUtil";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;

export interface LoginInfo {
  loginSuccess: boolean | null;
  userId: string | null;
  message: null | string;
}

export interface SignUpInfo {
  signUpSuccess: boolean | null;
}

export interface LogOutInfo {
  logOutSuccess: boolean | null;
}

export interface AuthCheckInfo {
  _id: string;
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  role: null | number;
}

export interface UserState {
  loginInfo?: AsyncState<LoginInfo, Error>;
  signUpInfo?: AsyncState<SignUpInfo, Error>;
  logOutInfo?: AsyncState<LogOutInfo, Error>;
  authCheckInfo?: AsyncState<AuthCheckInfo, Error>;
}

export interface FileUploadInfo {
  fileUploadSuccess: boolean | null;
  filePath: string[] | null;
  fillName: string[] | null;
}

export interface UploadProductInfo {
  uploadProductSuccess: boolean;
}

export interface LoadProductsInfo {
  manProducts: any[];
  womanProducts: any[];
  kidProduct: any[];
}

export interface ProductState {
  fileUploadInfo?: AsyncState<FileUploadInfo, Error>;
  uploadProductInfo?: AsyncState<UploadProductInfo, Error>;
  loadProductsInfo?: AsyncState<LoadProductsInfo, Error>;
}
