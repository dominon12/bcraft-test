import { AnyAction } from "redux";

import { User } from "../../Types/UserTypes";
import * as types from "./Types";

type UserReducerState = User | null;

const INITIAL_STATE: UserReducerState = null;

const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case types.ADD_USER:
      return action.payload;
    case types.REMOVE_USER:
      return null;
    default:
      return state;
  }
};

export default userReducer;
