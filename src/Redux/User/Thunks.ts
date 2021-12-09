import { Dispatch } from "redux";

import {
  ISnackBarOptions,
  SnackBarMessageColor,
} from "../../Contexts/SnackBarContext";
import { performLogin, performRegistration } from "../../Services/ApiService";
import { WebResponse } from "../../Types/ApiTypes";
import { User } from "../../Types/UserTypes";
import { addUser } from "./Actions";

/**
 * Thunk that handles login process logic.
 *
 * @param email - user email
 * @param password - user password
 * @param setIsLoading - set state function
 * @param sendMessage - snackbar add message function
 */
export const loginUser =
  (
    email: string,
    password: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    sendMessage: (text: string, options?: ISnackBarOptions | undefined) => void
  ) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    // set is loading to true to indicate loading
    setIsLoading(true);
    // make request to api
    const response: WebResponse = await performLogin(email, password);
    // set is loading to false and clean form fields values
    setIsLoading(false);

    // check response status
    if (response.status === 200) {
      // success
      const user: User = response.data.data;
      // add user to the store
      dispatch(addUser(user));
      // show success message
      sendMessage("Successfully logged in", {
        color: SnackBarMessageColor.SUCCESS,
      });
    } else {
      // error
      // show error message
      sendMessage("An error occurred!", {
        color: SnackBarMessageColor.DANGER,
      });
    }
  };

export const registerUser =
  (
    email: string,
    password: string,
    password2: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    sendMessage: (text: string, options?: ISnackBarOptions | undefined) => void
  ) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    // set is loading to true to indicate loading
    setIsLoading(true);
    // make request to api
    const response: WebResponse = await performRegistration(
      email,
      password,
      password2
    );
    // set is loading to false and clean form fields values
    setIsLoading(false);
    // check response status
    if (response.status === 201) {
      // success
      const user: User = response.data.data;
      // add user to the store
      dispatch(addUser(user));
      // show success message
      sendMessage("Successfully registered and logged in", {
        color: SnackBarMessageColor.SUCCESS,
      });
    } else {
      // error
      // show error message
      sendMessage("An error occurred!", {
        color: SnackBarMessageColor.DANGER,
      });
    }
  };
