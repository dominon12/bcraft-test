import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { checkFormValid, emailPattern } from "../../Services/FormService";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import FormTemplate from "../Templates/FormTemplate";
import { RootState } from "../../Redux/Store";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { loginUser } from "../../Redux/User/Thunks";
import useFormState, { FormFieldProps } from "../../Hooks/useFormState";

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
  }, [user]);

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

  // form fields mapping for useFormState hook
  // useMemo is used to return a stable link
  const formFieldsProps: FormFieldProps[] = useMemo(
    () => [
      { name: "email", value: email, setValue: setEmail },
      {
        name: "password",
        value: password,
        setValue: setPassword,
      },
    ],
    [email, password]
  );

  // saved form state
  useFormState("login", formFieldsProps);

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  const validateForm = () => {
    const isValid = checkFormValid([emailInputRef, passwordInputRef]);
    setFormValid(isValid);
  };

  useEffect(() => validateForm(), [email, password]);

  /**
   * Sets default inputs values.
   */
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  /**
   * Dispatches thunk action which handles user
   * login action and clears the form after it.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
    // dispatch thunk action
    dispatch(loginUser(email, password, setIsLoading, sendMessage));
    // clear the form
    clearForm();
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
