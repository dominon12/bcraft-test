import React, { useEffect, useRef, useState } from "react";

import { checkFormValid } from "../../Services/FormService";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import FormTemplate from "../Templates/FormTemplate";

/**
 * Renders change password form with inputs
 * and a button and handles change password
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const ChangePasswordForm: React.FC = (): JSX.Element => {
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

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  useEffect(() => {
    const isValid = checkFormValid([newPasswordInputRef, password2InputRef]);

    setFormValid(isValid);
  }, [newPassword, password2]);

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        required
      />
      <Button disabled={!formValid}>Change</Button>
    </FormTemplate>
  );
};

export default ChangePasswordForm;
