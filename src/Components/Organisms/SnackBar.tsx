import React, { useContext } from "react";

import "./SnackBar.scss";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import SnackBarMessage from "../Molecules/SnackBarMessage";

/**
 * Shows snackbar messages.
 * 
 * @return {*}  {JSX.Element}
 */
const SnackBar: React.FC = (): JSX.Element => {
  const { messages } = useContext(SnackBarContext);

  return (
    <div className="snackbar">
      {messages.reverse().map((message) => (
        <SnackBarMessage
          key={message.id}
          color={message.color}
          delay={message.delay}
          action={message.action}
        >
          {message.text}
        </SnackBarMessage>
      ))}
    </div>
  );
};

export default SnackBar;
