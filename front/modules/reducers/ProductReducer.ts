import { ProductState, Action } from "../types";
import { createReducer } from "typesafe-actions";
import { asyncState } from "../utils/reducerUtil";
import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
} from "../actions";
import { produce } from "immer";

export const initialState: ProductState = {
  fileUploadInfo: asyncState.initial(),
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
});

export default productReducer;
