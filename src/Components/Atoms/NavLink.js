import React from "react";
import { Link } from "react-router-dom";

import "./NavLink.scss";

const NavLink = ({ to, Icon, title }) => {
  return (
    <Link to={to} className="nav-link">
      {Icon && <Icon className="nav-link__icon" />}
      {title && <div className="nav-link__title">{title}</div>}
    </Link>
  );
};

export default NavLink;
