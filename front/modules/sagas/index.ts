import user from "./user";
import product from "./product";
import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([fork(user)]);
  yield all([fork(product)]);
}
