import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { checkFormValid, emailPattern } from "../../Services/FormService";
import { WebResponse } from "../../Types/ApiTypes";
import { User } from "../../Types/UserTypes";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import FormTemplate from "../Templates/FormTemplate";
import { RootState } from "../../Redux/Store";
import { addUser } from "../../Redux/User/Actions";
import { performLogin } from "../../Services/ApiService";
import {
  SnackBarContext,
  SnackBarMessageColor,
} from "../../Contexts/SnackBarContext";

/**
 * Renders login form with inputs
 * and a button and handles login
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const LoginForm: React.FC = (props): JSX.Element => {
  const navigate = useNavigate();

  // redux
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  /**
   * Navigate user to the home page
   * if he's already logged in.
   */
  useEffect(() => {
    if (user) navigate("/");
  }, []);

  // snackbar
  const { sendMessage } = useContext(SnackBarContext);

  // email field
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  // password field
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  // form
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  useEffect(() => {
    const isValid = checkFormValid([emailInputRef, passwordInputRef]);

    setFormValid(isValid);
  }, [email, password]);

  /**
   * Sets default inputs values.
   */
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  /**
   * Handles login process logic.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
    // set is loading to true to indicate loading
    setIsLoading(true);
    // make request to api
    const response: WebResponse = await performLogin(email, password);
    // set is loading to false and clean form fields values
    setIsLoading(false);
    clearForm();
    // check response status
    if (response.status === 200) {
      // success
      const user: User = response.data.data;
      dispatch(addUser(user));
      sendMessage("Successfully logged in", {
        color: SnackBarMessageColor.SUCCESS,
      });
      navigate("/");
    } else {
      // error
      sendMessage("An error occurred!", {
        color: SnackBarMessageColor.DANGER,
      });
    }
  };

  return (
    <FormTemplate title="Login" onSubmit={handleLogin}>
      <Input
        ref={emailInputRef}
        value={email}
        setValue={setEmail}
        id="login-email"
        placeholder="Email"
        labelText="Email"
        name="email"
        type="email"
        validationOptions={{
          regexp: emailPattern,
        }}
        disabled={isLoading}
        required
      />
      <Input
        ref={passwordInputRef}
        value={password}
        setValue={setPassword}
        id="login-password"
        placeholder="Password"
        labelText="Password"
        name="password"
        type="password"
        validationOptions={{
          minLength: 4,
          maxLength: 10,
          includeUppercaseLetters: true,
        }}
        disabled={isLoading}
        required
      />
      <Button disabled={!formValid} isLoading={isLoading}>
        Log In
      </Button>
    </FormTemplate>
  );
};

export default LoginForm;
