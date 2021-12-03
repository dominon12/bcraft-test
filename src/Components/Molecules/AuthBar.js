import React from "react";

import "./AuthBar.scss";
import NavLink from "../Atoms/NavLink";

const AuthBar = () => {
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
