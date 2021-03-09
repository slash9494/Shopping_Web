import { Action, ProductByIdInfo } from "./../types";
import { response } from "express";
import shortId from "shortid";
import faker from "faker";
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
  loadManProductsActionAsync,
  LOAD_MAN_PRODUCTS_REQUEST,
  loadProductByIdActionAsync,
  LOAD_PRODUCT_BY_ID_REQUEST,
} from "./../actions";
import axios from "axios";
import { fileUploadActionAsync } from "../actions";
import createAsyncSaga, {
  createAsyncDummySaga,
} from "../utils/createAsyncSaga";
import { takeEvery, all, fork, takeLatest, delay } from "redux-saga/effects";
import { Images } from "../../pages/uploadProduct";
import { Filters } from "../../pages/shop/manPage";
import { UserCartInfo } from "../../pages/cart";

export type Config = {
  data: {
    header: Object;
  };
};
export type FileUploadAPIProps = {
  formData: FormData;
  config: Config;
};

export type LoadManProductsAPIProps = {
  skip: number;
  limit: number;
  loadMore?: boolean;
  filters?: Filters;
  searchTerm?: string;
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
  return {
    manProducts: generateDummyManProduct(20),
  };
}

const fakeImages = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `https://source.unsplash.com/2000x1200/?man-model&sig=${randomNumber}`;
};

const generateDummyManProduct = (number: Number) =>
  Array(number)
    .fill(20)
    .map(() => ({
      id: shortId.generate(),
      writer: faker.name.findName(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(10000, 110000),
      images: [fakeImages(), fakeImages(), fakeImages()],
      category: faker.random.number({
        min: 1,
        max: 4,
      }),
      size: [
        faker.random.number({
          min: 1,
          max: 3,
        }),
        faker.random.number({
          min: 1,
          max: 3,
        }),
        faker.random.number({
          min: 1,
          max: 3,
        }),
      ],
      sold: faker.random.number({
        min: 0,
        max: 3,
      }),
    }));

async function loadManProductsAPI(body: LoadManProductsAPIProps) {
  const response = await axios.post("api/product/getManProducts", body);
  return response.data;
}

const loadManProductAsyncSaga = createAsyncDummySaga(
  loadManProductsActionAsync,
  loadDummyManProductsAPI
);

function* loadManProductsSaga() {
  yield takeLatest(LOAD_MAN_PRODUCTS_REQUEST, loadManProductAsyncSaga);
}

function loadDummyProductByIdAPI() {
  return {
    title: faker.commerce.productName(),
    descriptionTitle: faker.name.title(),
    description: faker.commerce.productDescription(),
    size: [
      faker.random.number({
        min: 1,
        max: 3,
      }),
      faker.random.number({
        min: 1,
        max: 3,
      }),
      faker.random.number({
        min: 1,
        max: 3,
      }),
    ],
    amountOfS: faker.random.number({
      min: 0,
      max: 2,
    }),
    amountOfM: faker.random.number({
      min: 0,
      max: 2,
    }),
    amountOfL: faker.random.number({
      min: 0,
      max: 2,
    }),
    color: faker.commerce.color(),
    price: faker.random.number({
      min: 20000,
      max: 110000,
    }),
    images: [fakeImages(), fakeImages(), fakeImages()],
    id: faker.random.uuid(),
  };
}

async function loadProductByIdAPI() {
  const response = await axios.get(
    `/api/product/products_by_id?id=${productId}&type=single`
  );
  return response.data;
}

const loadProductByIdAsyncSaga = createAsyncDummySaga(
  loadProductByIdActionAsync,
  loadDummyProductByIdAPI
);

function* loadProductByIdSaga() {
  yield takeLatest(LOAD_PRODUCT_BY_ID_REQUEST, loadProductByIdAsyncSaga);
}

async function loadCartItemsAPI(
  ProductIds: Array<string>,
  userCarts: Array<any>
) {
  const response = await axios.get(
    `/api/product/products_by_id?id=${ProductIds}&type=array`
  );
  userCarts.forEach((cartItem) => {
    response.data.forEach((productDetail: ProductByIdInfo, index: number) => {
      if (cartItem.id === productDetail.id) {
        response.data[index].quantity = cartItem.quantity;
      }
    });
  });

  return response.data;
}

// const loadCartItemAsyncSaga = createAsyncSaga()

// function* loadCartItemSaga(){
//   yield takeLatest()
// }

export default function* productSaga() {
  yield all([
    fork(fileUploadSaga),
    fork(uploadManProductSaga),
    fork(uploadWomanProductSaga),
    fork(uploadKidProductSaga),
    fork(uploadDummyManProductSaga),
    fork(loadManProductsSaga),
    fork(loadProductByIdSaga),
  ]);
}
