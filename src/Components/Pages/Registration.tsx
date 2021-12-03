import React from "react";

import RegistrationForm from "../Organisms/RegistrationForm";

/**
 * Registration page.
 *
 * @return {*}  {JSX.Element}
 */
const Registration: React.FC = (): JSX.Element => {
  return (
    <div className="registration">
      <RegistrationForm />
    </div>
  );
};

export default Registration;
