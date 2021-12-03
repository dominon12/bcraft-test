import React, { useEffect, useRef, useState } from "react";

import { checkFormValid, emailPattern } from "../../Services/FormService";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import FormTemplate from "../Templates/FormTemplate";

/**
 * Renders login form with inputs
 * and a button and handles login
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const LoginForm: React.FC = (props): JSX.Element => {
  // email field
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  // password field
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  // form
  const [formValid, setFormValid] = useState(false);

  /**
   * Check if form is valid on every
   * inputs values changes
   */
  useEffect(() => {
    const isValid = checkFormValid([emailInputRef, passwordInputRef]);

    setFormValid(isValid);
  }, [email, password]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        required
      />
      <Button disabled={!formValid}>Log In</Button>
    </FormTemplate>
  );
};

export default LoginForm;
