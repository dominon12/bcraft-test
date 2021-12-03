import React from "react";

import "./AuthBar.scss";
import NavLink from "../Atoms/NavLink";

/**
 * Nav bar which conditionally renders login and register link
 * or change password link depending on whether user
 * is logged in or not.
 *
 * @return {*}  {JSX.Element}
 */
const AuthBar: React.FC = (): JSX.Element => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return (
      <div className="auth-bar">
        <div className="auth-bar__link">
          <NavLink to="/change-password" title="Change password" />
        </div>
      </div>
    );
  }

  return (
    <div className="auth-bar">
      <div className="auth-bar__link">
        <NavLink to="/login" title="Login" />
      </div>
      <div className="auth-bar__link">
        <NavLink to="/registration" title="Register" />
      </div>
    </div>
  );
};

export default AuthBar;
