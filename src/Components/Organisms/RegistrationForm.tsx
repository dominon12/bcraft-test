import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Molecules/Input";
import { checkFormValid, emailPattern } from "../../Services/FormService";
import Button from "../Atoms/Button";
import FormTemplate from "../Templates/FormTemplate";
import { RootState } from "../../Redux/Store";
import { WebResponse } from "../../Types/ApiTypes";
import { performRegistration } from "../../Services/ApiService";
import { addUser } from "../../Redux/User/Actions";
import { User } from "../../Types/UserTypes";
import {
  SnackBarContext,
  SnackBarMessageColor,
} from "../../Contexts/SnackBarContext";
import { getFormState } from "../../Services/FormStateService";
import { updateFieldValue } from "../../Redux/Forms/Actions";
import { FormName } from "../../Types/FormTypes";

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
  const { user, forms } = useSelector((state: RootState) => state);
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

  // saved form state
  const formName: FormName = "registration";
  const formState = getFormState(forms, formName);

  // email field
  const [email, setEmail] = useState(formState.email ?? "");
  const emailInputRef = useRef<HTMLInputElement>(null);
  // password field
  const [password, setPassword] = useState(formState.password ?? "");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  // repeat password field
  const [password2, setPassword2] = useState(formState.password2 ?? "");
  const password2InputRef = useRef<HTMLInputElement>(null);
  // form
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  /**
   * Saves form fields values in redux's state
   * on every change.
   */
  const updateFormState = () => {
    dispatch(updateFieldValue(formName, "email", email));
    dispatch(updateFieldValue(formName, "password", password));
    dispatch(updateFieldValue(formName, "password2", password2));
  };

  useEffect(() => {
    validateForm();
    updateFormState();
  }, [email, password, password2]);

  /**
   * Sets default inputs values.
   */
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  /**
   * Handles registration process logic.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
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
    clearForm();
    // check response status
    if (response.status === 201) {
      // success
      const user: User = response.data.data;
      dispatch(addUser(user));
      sendMessage("Successfully registered and logged in", {
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
