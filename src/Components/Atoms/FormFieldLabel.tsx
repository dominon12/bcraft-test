import React from "react";

import "./FormFieldLabel.scss";

interface Props {
  fieldId: string;
  required?: boolean;
}

/**
 * Label for a form field.
 * Shows red start symbol if
 * 'required' prop was set to true.
 *
 * @return {*}  {JSX.Element}
 */
const FormFieldLabel: React.FC<Props> = (props): JSX.Element => {
  return (
    <label
      className={`form-field-label ${props.required ? "required" : ""}`}
      htmlFor={props.fieldId}
    >
      {props.children}
    </label>
  );
};

export default FormFieldLabel;
