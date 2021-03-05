import { AsyncState } from "./utils/reducerUtil";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { number } from "prop-types";

export type Action = ActionType<typeof actions>;

// User Types //
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

interface CartInfo {
  id: string;
  quantity: number;
  date: Date;
}

export interface UserData {
  _id: string;
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  role: null | number;
  cart: null | Array<CartInfo>;
  history: null | Array<any>;
}

export interface UserState {
  loginInfo?: AsyncState<LoginInfo, Error>;
  signUpInfo?: AsyncState<SignUpInfo, Error>;
  logOutInfo?: AsyncState<LogOutInfo, Error>;
  userData?: AsyncState<UserData, Error>;
}

// Product Types //

export interface FileUploadInfo {
  fileUploadSuccess: boolean | null;
  filePath: string[] | null;
  fillName: string[] | null;
}

export interface UploadProductInfo {
  uploadProductSuccess: boolean;
}

interface ProductsInfo {
  id: String;
  writer: String;
  title: String;
  price: Number;
  images: ImageData[];
  category: Number;
  size: Number[];
  sold: Number;
}

export interface LoadProductsInfo {
  manProducts: ProductsInfo[];
  womanProducts: ProductsInfo[];
  kidProduct: ProductsInfo[];
}

interface ProductByIdInfo {
  title: string;
  descriptionTitle: string;
  description: string;
  size: Number[];
  amountOfS: Number;
  amountOfM: Number;
  amountOfL: Number;
  color: string;
  price: Number;
  images: ImageData[];
  category: Number;
  sold: Number;
  views: Number;
  id: Number;
}

export interface LoadProductByIdInfo {
  productInfo: ProductByIdInfo;
}

export interface ProductState {
  fileUploadInfo?: AsyncState<FileUploadInfo, Error>;
  uploadProductInfo?: AsyncState<UploadProductInfo, Error>;
  loadProductsInfo?: AsyncState<LoadProductsInfo, Error>;
  loadProductByIdInfo?: AsyncState<LoadProductByIdInfo, Error>;
}
