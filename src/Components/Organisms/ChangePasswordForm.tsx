import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { checkFormValid } from "../../Services/FormService";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import FormTemplate from "../Templates/FormTemplate";
import { RootState } from "../../Redux/Store";
import { WebResponse } from "../../Types/ApiTypes";
import { performChangePassword } from "../../Services/ApiService";
import {
  SnackBarContext,
  SnackBarMessageColor,
} from "../../Contexts/SnackBarContext";

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

  /**
   * Navigate user to the logic page
   * if he's not logged in.
   */
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

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

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  useEffect(() => {
    const isValid = checkFormValid([newPasswordInputRef, password2InputRef]);

    setFormValid(isValid);
  }, [newPassword, password2]);

  /**
   * Sets default inputs values.
   */
  const clearForm = () => {
    setOldPassword("");
    setNewPassword("");
    setPassword2("");
  };

  /**
   * Handles password change logic.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page from reloading
    e.preventDefault();
    // set is loading to true to indicate loading
    setIsLoading(true);
    // make request to api
    const response: WebResponse = await performChangePassword(
      oldPassword,
      newPassword,
      password2
    );
    // set is loading to false and clean form fields values
    setIsLoading(false);
    clearForm();
    // check response status
    if (response.status === 202) {
      // success
      navigate("/");
      sendMessage("Your password has been successfully changed!", {
        color: SnackBarMessageColor.SUCCESS,
      });
    } else {
      // error
      sendMessage("An error occurred!", {
        color: SnackBarMessageColor.DANGER,
      });
    }
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
