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
} from "../actions";
import { produce } from "immer";

export const initialState: ProductState = {
  fileUploadInfo: asyncState.initial(),
  uploadProductInfo: asyncState.initial(),
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
    uploadProductInfo: asyncState.success({ uploadProductSuccess: true }),
  }),
  [UPLOAD_DUMMY_MAN_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.error(action.payload),
  }),
});

export default productReducer;
