import React from "react";

import ChangePasswordForm from "../Organisms/ChangePasswordForm";

/**
 * Page where users can change password.
 *
 * @return {*}  {JSX.Element}
 */
const ChangePassword: React.FC = (): JSX.Element => {
  return (
    <div className="change-password">
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
