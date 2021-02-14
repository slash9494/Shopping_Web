import user from "./user";
import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([fork(user)]);
}
