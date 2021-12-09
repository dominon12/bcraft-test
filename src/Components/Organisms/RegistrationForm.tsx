import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Molecules/Input";
import { checkFormValid, emailPattern } from "../../Services/FormService";
import Button from "../Atoms/Button";
import FormTemplate from "../Templates/FormTemplate";
import { RootState } from "../../Redux/Store";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { registerUser } from "../../Redux/User/Thunks";
import useFormState, { FormFieldProps } from "../../Hooks/useFormState";

/**
 * Renders registration form with inputs
 * and a button and handles registration
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const RegistrationForm: React.FC = (): JSX.Element => {
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
  // repeat password field
  const [password2, setPassword2] = useState("");
  const password2InputRef = useRef<HTMLInputElement>(null);
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
      {
        name: "password2",
        value: password2,
        setValue: setPassword2,
      },
    ],
    [email, password, password2]
  );

  // saved form state
  useFormState("registration", formFieldsProps);

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  const validateForm = () => {
    const isValid = checkFormValid([
      emailInputRef,
      passwordInputRef,
      password2InputRef,
    ]);
    setFormValid(isValid);
  };

  useEffect(() => validateForm(), [email, password, password2]);

  /**
   * Sets default inputs values.
   */
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  /**
   * Dispatches thunk action which handles user
   * registration action and clears the form after it.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
    // dispatch thunk action
    dispatch(
      registerUser(email, password, password2, setIsLoading, sendMessage)
    );
    // clear the form
    clearForm();
  };

  return (
    <FormTemplate title="Registration" onSubmit={handleRegister}>
      <Input
        ref={emailInputRef}
        value={email}
        setValue={setEmail}
        id="reg-email"
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
        id="reg-password"
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
      <Input
        ref={password2InputRef}
        value={password2}
        setValue={setPassword2}
        id="reg-password2"
        placeholder="Repeat password"
        labelText="Repeat password"
        name="password2"
        type="password"
        validationOptions={{
          toBeEqualTo: {
            valueToBeEqualTo: password,
            valueName: "Password",
          },
        }}
        disabled={isLoading}
        required
      />
      <Button disabled={!formValid} isLoading={isLoading}>
        Register
      </Button>
    </FormTemplate>
  );
};

export default RegistrationForm;
