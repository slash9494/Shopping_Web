import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./ProductReducer";
import { HYDRATE } from "next-redux-wrapper";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  index: (state: any = {}, action: any) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  userReducer,
  productReducer,
});

export default rootReducer;
