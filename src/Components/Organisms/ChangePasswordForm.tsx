import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { checkFormValid } from "../../Services/FormService";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import FormTemplate from "../Templates/FormTemplate";
import { RootState } from "../../Redux/Store";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { changeUserPassword } from "../../Redux/User/Thunks";
import useFormState, { FormFieldProps } from "../../Hooks/useFormState";

/**
 * Renders change password form with inputs
 * and a button and handles change password
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const ChangePasswordForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  // redux
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  /**
   * Navigate user to the logic page
   * if he's not logged in.
   */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // snackbar
  const { sendMessage } = useContext(SnackBarContext);

  // old password field
  const [oldPassword, setOldPassword] = useState("");
  // new password field
  const [newPassword, setNewPassword] = useState("");
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
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
      { name: "oldPassword", value: oldPassword, setValue: setOldPassword },
      {
        name: "newPassword",
        value: newPassword,
        setValue: setNewPassword,
      },
      {
        name: "password2",
        value: password2,
        setValue: setPassword2,
      },
    ],
    [oldPassword, newPassword, password2]
  );

  // saved form state
  useFormState("change-password", formFieldsProps);

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  const validateForm = () => {
    const isValid = checkFormValid([newPasswordInputRef, password2InputRef]);
    setFormValid(isValid);
  };

  useEffect(() => validateForm(), [oldPassword, newPassword, password2]);

  /**
   * Sets default inputs values.
   */
  const clearForm = () => {
    setOldPassword("");
    setNewPassword("");
    setPassword2("");
  };

  /**
   * Dispatches thunk action which handles password
   * change action and clears the form after it.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
    // dispatch thunk action
    dispatch(
      changeUserPassword(
        oldPassword,
        newPassword,
        password2,
        setIsLoading,
        sendMessage
      )
    );
    // clear the form
    clearForm();
  };

  return (
    <FormTemplate title="Change Password" onSubmit={handleChangePassword}>
      <Input
        value={oldPassword}
        setValue={setOldPassword}
        id="change-old-password"
        placeholder="Old Password"
        labelText="Old Password"
        name="old-password"
        type="password"
        disabled={isLoading}
        required
      />
      <Input
        ref={newPasswordInputRef}
        value={newPassword}
        setValue={setNewPassword}
        id="change-password"
        placeholder="New Password"
        labelText="New Password"
        name="new-password"
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
        id="change-password2"
        placeholder="Repeat password"
        labelText="Repeat password"
        name="password2"
        type="password"
        validationOptions={{
          toBeEqualTo: {
            valueToBeEqualTo: newPassword,
            valueName: "New password",
          },
        }}
        disabled={isLoading}
        required
      />
      <Button disabled={!formValid} isLoading={isLoading}>
        Change
      </Button>
    </FormTemplate>
  );
};

export default ChangePasswordForm;
