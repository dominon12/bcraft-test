import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

import "./NavLink.scss";

interface Props {
  to: string;
  icon?: IconType;
  title?: string;
}

/**
 * Link component which can be conditionally
 * rendered with title, icon or with both.
 *
 * @return {*}  {JSX.Element}
 */
const NavLink: React.FC<Props> = (props): JSX.Element => {
  return (
    <Link to={props.to} className="nav-link">
      {props.icon && <props.icon className="nav-link__icon" />}
      {props.title && <div className="nav-link__title">{props.title}</div>}
    </Link>
  );
};

export default NavLink;
