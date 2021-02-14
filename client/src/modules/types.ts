import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { initialState } from "./reducers/reducer";

export type Action = ActionType<typeof actions>;

// export type UserInfo = {
//   loginSuccess: Promise<any> | null;
//   register: Promise<any> | null;
//   AuthCheckInfo: Promise<any> | null;
// };

export interface LoginInfo {
  isLoggingIn: boolean;
  logInError: Error | null;
  loginSuccess: boolean | null;
  userId: string | null;
  message: null | string;
}

export interface SignUpInfo {
  isSigningUp: boolean;
  SignUpError: Error | null;
  signUpSuccess: boolean;
}

export interface LogOutInfo {
  isLogginOut: boolean;
  logOutError: Error | null;
  logOutSuccess: boolean | null;
}

export interface AuthCheckInfo {
  isAuthChecking: boolean;
  authCheckError: Error | null;
  _id: string;
  isAdmin: boolean | null;
  isAuth: boolean | null;
  email: string;
  name: string;
  role: null | number;
}

export type State = {
  //   loginSuccess: Promise<any> | null;
  //   register: Promise<any> | null;
  //   AuthCheckInfo: null | Promise<any>;

  loginInfo?: LoginInfo;
  signUpInfo?: SignUpInfo;
  logOutInfo?: LogOutInfo;
  authCheckInfo?: AuthCheckInfo;
};
