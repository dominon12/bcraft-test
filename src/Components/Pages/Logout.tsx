import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { removeUser } from "../../Redux/User/Actions";

/**
 * Logs user out.
 *
 * @return {*} null
 */
const Logout: React.FC = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Logs user out and navigates
   * him to the home page
   */
  useEffect(() => {
    dispatch(removeUser());
    navigate("/");
    // TODO show logout message
  }, []);

  return null;
};

export default Logout;
