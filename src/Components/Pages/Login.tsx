import React from "react";

import LoginForm from "../Organisms/LoginForm";

/**
 * Page where users can log in.
 *
 * @return {*}  {JSX.Element}
 */
const Login: React.FC = (): JSX.Element => {
  return (
    <div className="login">
      <LoginForm />
    </div>
  );
};

export default Login;
