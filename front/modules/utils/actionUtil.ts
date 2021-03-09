import { createAction } from "typesafe-actions";

// 비동기 액션 타입명 생성기
export const asyncActionCreator = (actionName: string) => {
  const asyncTypeAction = ["_REQUEST", "_SUCCESS", "_FAILURE"];
  return {
    REQUEST: actionName + asyncTypeAction[0],
    SUCCESS: actionName + asyncTypeAction[1],
    FAILURE: actionName + asyncTypeAction[2],
  };
};

// 비동기 액션 생성기
export const createAsyncAction = (asyncAction: {
  REQUEST: any;
  SUCCESS: any;
  FAILURE: any;
}) => {
  return {
    request: createAction(asyncAction.REQUEST),
    success: createAction(asyncAction.SUCCESS),
    failure: createAction(asyncAction.FAILURE),
  };
};
