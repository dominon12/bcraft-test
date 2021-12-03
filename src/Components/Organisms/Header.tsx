import React from "react";
import { FiHome } from "react-icons/fi";

import "./Header.scss";
import NavLink from "../Atoms/NavLink";
import AuthBar from "../Molecules/AuthBar";

/**
 * Header with links for navigation
 * between pages.
 *
 * @return {*}  {JSX.Element}
 */
const Header: React.FC = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <NavLink to="/" icon={FiHome} />
        </div>
        <div className="header__right">
          <AuthBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
