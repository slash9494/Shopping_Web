import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./ProductReducer";
import { HYDRATE } from "next-redux-wrapper";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        userReducer,
        productReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
