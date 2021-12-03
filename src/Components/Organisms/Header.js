import React from "react";
import { FiHome } from "react-icons/fi";

import "./Header.scss";
import NavLink from "../Atoms/NavLink";
import AuthBar from "../Molecules/AuthBar";

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <NavLink to="/" Icon={FiHome} />
        </div>
        <div className="header__right">
          <AuthBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
