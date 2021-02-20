import { response } from "express";
import { FILE_UPLOAD_REQUEST } from "./../actions";
import axios from "axios";
import { fileUploadActionAsync } from "../actions";
import createAsyncSaga from "../utils/createAsyncSaga";
import { takeEvery, all, fork } from "redux-saga/effects";

export type Config = {
  data: {
    header: Object;
  };
};
export type FileUploadAPIProps = {
  formData: FormData;
  config: Config;
};

async function fileUploadAPI({ formData, config }: FileUploadAPIProps) {
  const response = await axios.post(
    "/api/product/uploadImage",
    formData,
    config
  );
  console.log(response.data);
  return response.data;
}

const fileUploadAsyncSaga = createAsyncSaga(
  fileUploadActionAsync,
  fileUploadAPI
);

function* fileUploadSaga() {
  yield takeEvery(FILE_UPLOAD_REQUEST, fileUploadAsyncSaga);
}

export default function* productSaga() {
  yield all([fork(fileUploadSaga)]);
}
