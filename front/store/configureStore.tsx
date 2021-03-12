import {
  applyMiddleware,
  createStore,
  compose,
  Store,
  CombinedState,
  AnyAction,
} from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { Action } from "../modules/types";
import rootReducer from "../modules/reducers";
import { rootSaga } from "../modules/sagas";

export interface IStore extends Store<CombinedState<any>, AnyAction> {
  sagaTask?: Task;
}

// function getServerState() {
//   return JSON.parse(document.getElementById('__NEXT_DATA__').textContent).props.pageProps.initialState;
// }

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store: IStore = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
