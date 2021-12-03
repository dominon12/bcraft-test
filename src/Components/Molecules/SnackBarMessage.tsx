import React from "react";

import "./SnackBarMessage.scss";
import {
  ISnackBarMessageAction,
  SnackBarMessageColor,
} from "../../Contexts/SnackBarContext";

interface Props {
  color: SnackBarMessageColor;
  delay: number;
  action?: ISnackBarMessageAction;
}

/**
 * Snackbar message in different colors
 * with fade-in and fade-out animations.
 *
 * @return {*}  {JSX.Element}
 */
const SnackBarMessage: React.FC<Props> = (props): JSX.Element => {
  return (
    <div
      className={`snackbar-message ${props.color}`}
      style={{
        animation: `fade-in 200ms ease-in-out 0s 1, fade-out 200ms ease-in-out ${
          props.delay - 200
        }ms 1`,
      }}
    >
      <div className="snackbar-message__body">{props.children}</div>
      {props.action && (
        <div
          className="snackbar-message__action hover-highlight"
          onClick={props.action.callback}
        >
          {props.action.text}
        </div>
      )}
    </div>
  );
};

export default SnackBarMessage;
