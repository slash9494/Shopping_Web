import { combineReducers } from "redux";
import userReducer from "./reducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
