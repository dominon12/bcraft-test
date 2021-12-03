import React from "react";

import './FormFieldError.scss'

interface Props {}

/**
 * Renders a red sign indicating
 * an error.
 *
 * @return {*}  {JSX.Element}
 */
const FormFieldError: React.FC<Props> = (props): JSX.Element => {
  return <div className="form-field-error">{props.children}</div>;
};

export default FormFieldError;
