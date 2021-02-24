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

const dummyState: any = {
  items: [
    {
      images: [
        "https://images.pexels.com/photos/5325884/pexels-photo-5325884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "https://images.pexels.com/photos/5325887/pexels-photo-5325887.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5325886/pexels-photo-5325886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
      id: 1,
      category: 1,
      title: "오리지널 화이트 티셔츠",
      description:
        "100%면 소재 오리지널 화이트 티셔츠. 슬림 소매 및 라운드 넥 디자인 ",
      price: "15,000",
      size: ["S", "M", "L"],
    },
    {
      images: [
        "https://images.pexels.com/photos/5325900/pexels-photo-5325900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/5325899/pexels-photo-5325899.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      ],
      id: 2,
      category: 1,
      title: "스트라이프 티셔츠",
      description: "레드와 화이트의 스트라이프 티셔츠",
      price: "22,000",
      size: ["S", "M", "L"],
    },
    {
      images: [
        "https://images.pexels.com/photos/1833082/pexels-photo-1833082.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "https://images.pexels.com/photos/1852482/pexels-photo-1852482.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      ],
      id: 3,
      category: 1,
      title: "라이더 자켓",
      description: "올 레더 라이더 자켓",
      price: "88,000",
      size: ["S", "M", "L"],
    },
    {
      images: [
        "https://images.pexels.com/photos/5876622/pexels-photo-5876622.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      ],
      id: 3,
      category: 1,
      title: "스텐다드 블레이져",
      description: "포멀하먄서 캐주얼한 스텐다드 블레이져",
      price: "55,000",
      size: ["S", "M", "L"],
    },
    {
      images: [
        "https://images.pexels.com/photos/5876516/pexels-photo-5876516.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5876511/pexels-photo-5876511.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      ],
      id: 4,
      category: 1,
      title: "네이쳐 블레이져",
      description: "아이보리 블레이져",
      price: "55,000",
      size: ["S", "M", "L"],
    },
  ],
};

export const LOAD_MAN_TOP_ITEM = "LOAD_MAN_TOP_ITEM";

export const loadManItem = {
  type: LOAD_MAN_TOP_ITEM,
};

export function dummyProductReducer(state = dummyState, action: any): any {
  switch (action.type) {
    case LOAD_MAN_TOP_ITEM: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

export default productReducer;
