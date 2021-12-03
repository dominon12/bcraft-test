import React from "react";

import "./FormFieldContainer.scss";

/**
 * Wrapper component around a form field.
 * Encapsulates form field's styles.
 *
 * @return {*}  {JSX.Element}
 */
const FormFieldContainer: React.FC = ({ children }): JSX.Element => {
  return <div className="form-field-container">{children}</div>;
};

export default FormFieldContainer;
