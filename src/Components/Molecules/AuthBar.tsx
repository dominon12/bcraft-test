import React from "react";
import { useSelector } from "react-redux";

import "./AuthBar.scss";
import NavLink from "../Atoms/NavLink";
import { RootState } from "../../Redux/Store";

/**
 * Nav bar which conditionally renders login and register link
 * or change password link depending on whether user
 * is logged in or not.
 *
 * @return {*}  {JSX.Element}
 */
const AuthBar: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  if (user) {
    return (
      <div className="auth-bar">
        <div className="auth-bar__link">
          <NavLink to="/change-password" title="Change password" />
        </div>
        <div className="auth-bar__link">
          <NavLink to="/logout" title="Log out" />
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
