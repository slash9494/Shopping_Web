import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./ProductReducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  userReducer,
  productReducer,
});

export default rootReducer;
