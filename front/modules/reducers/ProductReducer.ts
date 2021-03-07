import { asyncState } from "./../utils/reducerUtil";
import { ProductState, Action } from "../types";
import { createReducer } from "typesafe-actions";
import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
  UPLOAD_DUMMY_MAN_PRODUCT_REQUEST,
  UPLOAD_DUMMY_MAN_PRODUCT_SUCCESS,
  UPLOAD_DUMMY_MAN_PRODUCT_FAILURE,
  LOAD_MAN_PRODUCTS_REQUEST,
  LOAD_MAN_PRODUCTS_SUCCESS,
  LOAD_MAN_PRODUCTS_FAILURE,
  LOAD_PRODUCT_BY_ID_REQUEST,
  LOAD_PRODUCT_BY_ID_SUCCESS,
  LOAD_PRODUCT_BY_ID_FAILURE,
} from "../actions";
import { produce } from "immer";

const productByIdInfo = {
  productInfo: {
    title: "",
    descriptionTitle: "string;",
    description: "string",
    size: [],
    amountOfS: 0,
    amountOfM: 0,
    amountOfL: 0,
    color: "string;",
    price: 0,
    images: [],

    category: 0,
    sold: 0,
    views: 0,
    id: 0,
  },
};

export const initialState: ProductState = {
  fileUploadInfo: asyncState.initial(),
  uploadProductInfo: asyncState.initial(),
  loadProductsInfo: asyncState.initial(),
  loadProductByIdInfo: asyncState.initial(),
};

const productReducer = createReducer<ProductState, Action>(initialState, {
  [FILE_UPLOAD_REQUEST]: (state) => ({
    ...state,
    fileUploadInfo: asyncState.load(state.fileUploadInfo?.data),
  }),
  [FILE_UPLOAD_SUCCESS]: (state, action) => ({
    ...state,
    fileUploadInfo: asyncState.success(action.payload),
  }),
  [FILE_UPLOAD_FAILURE]: (state, action) => ({
    ...state,
    fileUploadInfo: asyncState.error(action.payload),
  }),
  [UPLOAD_DUMMY_MAN_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.load(action.payload),
  }),
  [UPLOAD_DUMMY_MAN_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.success(action.payload),
  }),
  [UPLOAD_DUMMY_MAN_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.error(action.payload),
  }),
  [LOAD_MAN_PRODUCTS_REQUEST]: (state) => ({
    ...state,
    loadProductsInfo: asyncState.load(),
  }),
  [LOAD_MAN_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.success(action.payload),
  }),
  [LOAD_MAN_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.error(action.payload),
  }),
  [LOAD_PRODUCT_BY_ID_REQUEST]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.load(state.loadProductByIdInfo?.data),
  }),
  [LOAD_PRODUCT_BY_ID_SUCCESS]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.success(action.payload),
  }),
  [LOAD_PRODUCT_BY_ID_FAILURE]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.error(action.payload),
  }),
});

export default productReducer;
