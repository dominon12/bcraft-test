import React, { useState } from "react";

import "./RegistrationForm.scss";
import Input from "../Molecules/Input";
import { emailPattern } from "../../Services/FormService";

/**
 * Renders registration form with inputs
 * and a button and handles registration
 * process's logic.
 *
 * @return {*}  {JSX.Element}
 */
const RegistrationForm: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div className="registration-form">
      <div className="registration-form__content">
        <form className="registration-form__form">
          <Input
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
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
