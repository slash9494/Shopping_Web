import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;

// export type UserInfo = {
//   loginSuccess: Promise<any> | null;
//   register: Promise<any> | null;
//   userData: Promise<any> | null;
// };

export type State = {};
