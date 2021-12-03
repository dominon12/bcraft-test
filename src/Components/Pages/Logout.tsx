import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { removeUser } from "../../Redux/User/Actions";

/**
 * Logs user out.
 *
 * @return {*} null
 */
const Logout: React.FC = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendMessage } = useContext(SnackBarContext);

  /**
   * Logs user out and navigates
   * him to the home page
   */
  useEffect(() => {
    dispatch(removeUser());
    sendMessage("Successfully logged out");
    navigate("/");
  }, []);

  return null;
};

export default Logout;
