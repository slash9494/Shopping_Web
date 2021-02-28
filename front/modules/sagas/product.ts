import { Action } from "./../types";
import { response } from "express";
import {
  FILE_UPLOAD_REQUEST,
  uploadManProductActionAsync,
  UPLOAD_MAN_PRODUCT_REQUEST,
  uploadWomanProductActionAsync,
  UPLOAD_WOMAN_PRODUCT_REQUEST,
  uploadKidProductActionAsync,
  UPLOAD_KID_PRODUCT_REQUEST,
  uploadDummyManProductActionAsync,
  UPLOAD_DUMMY_MAN_PRODUCT_REQUEST,
} from "./../actions";
import axios from "axios";
import { fileUploadActionAsync } from "../actions";
import createAsyncSaga, {
  createAsyncDummySaga,
} from "../utils/createAsyncSaga";
import { takeEvery, all, fork, takeLatest } from "redux-saga/effects";
import { Images } from "../../pages/uploadProduct";

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

function fileUploadDummyAPI() {
  return {
    fileUploadSuccess: true,
    filePath: [
      "https://images.pexels.com/photos/6386963/pexels-photo-6386963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://static.zara.net/photos///2021/V/0/2/p/0029/820/401/2/w/742/0029820401_2_3_1.jpg?ts=1611309533951",
    ],
    fillName: "testUploadImage",
  };
}

const fileUploadDummyAsyncSaga = createAsyncDummySaga(
  fileUploadActionAsync,
  fileUploadDummyAPI
);

function* fileUploadSaga() {
  yield takeEvery(FILE_UPLOAD_REQUEST, fileUploadDummyAsyncSaga);
}

export type UploadProductAPIProps = {
  body: {
    writer: string;
    title: string;
    description: string;
    price: number;
    images: Images;
    category: number;
  };
};

// async function uploadManProductAPI({ body}: UploadProductAPIProps) {
//   const response = await axios.post(
//     "/api/product/uploadProduct/man",
//     body
//   );
//   return response.data;
// }

// const uploadManProductAsyncSaga = createAsyncSaga(
//   uploadManProductActionAsync,
//   uploadManProductAPI
// );

function* uploadManProductAsyncSaga() {
  return { upLoadProductSuccess: true };
}

function* uploadManProductSaga() {
  yield takeLatest(UPLOAD_MAN_PRODUCT_REQUEST, uploadManProductAsyncSaga);
}

async function uploadWomanProductAPI({ body }: UploadProductAPIProps) {
  const response = await axios.post("/api/product/uploadProduct/woman", body);
  return response.data;
}

const uploadWomanProductAsyncSaga = createAsyncSaga(
  uploadWomanProductActionAsync,
  uploadWomanProductAPI
);

function* uploadWomanProductSaga() {
  yield takeLatest(UPLOAD_WOMAN_PRODUCT_REQUEST, uploadWomanProductAsyncSaga);
}

async function uploadKidProductAPI({ body }: UploadProductAPIProps) {
  const response = await axios.post("/api/product/uploadProduct/kid", body);
  return response.data;
}

const uploadKidProductAsyncSaga = createAsyncSaga(
  uploadKidProductActionAsync,
  uploadKidProductAPI
);

function* uploadKidProductSaga() {
  yield takeLatest(UPLOAD_KID_PRODUCT_REQUEST, uploadKidProductAsyncSaga);
}

function uploadDummyManProductAPI() {
  return { uploadProductSuccess: true };
}

const uploadDummyManProductAsyncSaga = createAsyncDummySaga(
  uploadDummyManProductActionAsync,
  uploadDummyManProductAPI
);

function* uploadDummyManProductSaga() {
  yield takeLatest(
    UPLOAD_DUMMY_MAN_PRODUCT_REQUEST,
    uploadDummyManProductAsyncSaga
  );
}

function loadDummyManProductsAPI() {
  return [{}];
}

export default function* productSaga() {
  yield all([
    fork(fileUploadSaga),
    fork(uploadManProductSaga),
    fork(uploadWomanProductSaga),
    fork(uploadKidProductSaga),
    fork(uploadDummyManProductSaga),
  ]);
}
