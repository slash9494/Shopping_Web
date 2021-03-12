import { AsyncState } from "./utils/reducerUtil";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { number } from "prop-types";
import { ReactImageGalleryItem } from "react-image-gallery";

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
  id: number;
  quantity: number;
  date: Date;
}

export interface UserInfo {
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
  userInfo?: AsyncState<UserInfo, Error>;
}

// Product Types //

export interface FileUploadInfo {
  fileUploadSuccess: boolean | null;
  filePath: string[] | null;
  fillName: string[] | null;
}

export interface UploadProductInfo {
  upLoadProductSuccess: boolean;
}

interface ProductsInfo {
  id: number;
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

interface ImagesData {
  original: string;
  thumbnail: string;
}

export interface ProductByIdInfo {
  title: string;
  descriptionTitle: string;
  description: string;
  size: Number[];
  amountOfS: string;
  amountOfM: string;
  amountOfL: string;
  color: string;
  price: string;
  images: Array<any>;
  category: Number;
  sold: Number;
  views: Number;
  id: Number;
  quantity?: number;
}

export interface LoadProductByIdInfo {
  productInfo: ProductByIdInfo;
}

export interface ProductState {
  fileUploadInfo?: AsyncState<FileUploadInfo, Error>;
  uploadProductInfo?: AsyncState<UploadProductInfo, Error>;
  loadProductsInfo?: AsyncState<LoadProductsInfo, Error>;
  loadProductByIdInfo?: AsyncState<ProductByIdInfo, Error>;
}
