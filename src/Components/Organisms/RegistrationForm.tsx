import React, { useEffect, useRef, useState } from "react";

import "./RegistrationForm.scss";
import Input from "../Molecules/Input";
import { checkFormValid, emailPattern } from "../../Services/FormService";
import Button from "../Atoms/Button";

/**
 * Renders registration form with inputs
 * and a button and handles registration
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const RegistrationForm: React.FC = (): JSX.Element => {
  // email field
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  // password field
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  // password2 field
  const [password2, setPassword2] = useState("");
  const password2InputRef = useRef<HTMLInputElement>(null);
  // form
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const isValid = checkFormValid([
      emailInputRef,
      passwordInputRef,
      password2InputRef,
    ]);

    setFormValid(isValid);
  }, [email, password, password2]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="registration-form">
      <div className="registration-form__content">
        <form onSubmit={handleRegister} className="registration-form__form">
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
            required
          />
          <Button disabled={!formValid}>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
