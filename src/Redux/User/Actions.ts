import { User } from "../../Types/UserTypes";
import * as types from "./Types";

export const addUser = (user: User) => ({
    type: types.ADD_USER,
    payload: user,
  });
  
  export const removeUser = () => ({
    type: types.REMOVE_USER,
  });