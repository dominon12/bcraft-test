import React from "react";
import Title from "../Atoms/Title";
import RegistrationForm from "../Organisms/RegistrationForm";

import "./Registration.scss";

/**
 * Registration page.
 *
 * @return {*}  {JSX.Element}
 */
const Registration: React.FC = (): JSX.Element => {
  return (
    <div className="registration">
      <Title className="registration__title">Registration</Title>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
