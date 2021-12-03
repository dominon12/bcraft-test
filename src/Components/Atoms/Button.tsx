import React from "react";

import "./Button.scss";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Button component.
 *
 * @return {*}  {JSX.Element}
 */
const Button: React.FC<Props> = (props): JSX.Element => {
  return (
    <button
      className="button"
      onClick={props.onClick}
      disabled={props.disabled || props.isLoading}
    >
      {props.children}
    </button>
  );
};

export default Button;
