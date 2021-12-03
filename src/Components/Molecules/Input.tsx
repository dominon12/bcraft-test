import React, { forwardRef, useState } from "react";

import "./Input.scss";
import FormFieldContainer from "../Atoms/FormFieldContainer";
import FormFieldError from "../Atoms/FormFieldError";
import FormFieldLabel from "../Atoms/FormFieldLabel";
import { ValidationOptions } from "../Types/FormTypes";
import { validateFormField } from "../../Services/FormService";

interface Props {
  value: string;
  setValue: (nextValue: string) => void;
  id: string;
  placeholder: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  labelText?: string;
  required?: boolean;
  validationOptions?: ValidationOptions;
}

/**
 * Input form field with validation,
 * error messages and a label.
 *
 * @return {*}  {JSX.Element}
 */
const Input = forwardRef<HTMLInputElement, Props>((props, ref): JSX.Element => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [wasTouched, setWasTouched] = useState(false);

  /**
   * Validates form field value
   * based on passed props.
   *
   * @param {string} value - value to validate
   */
  const validateFieldValue = (value: string) => {
    const { valid, errors } = validateFormField(
      value,
      props.validationOptions,
      props.required
    );

    setIsValid(valid);
    setErrorMessages(errors);
  };

  /**
   * Handles process of changing input value.
   * Validates value if it was touched.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - input field event
   */
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set touched
    let instantTouched = wasTouched;
    if (!wasTouched) {
      setWasTouched(true);
      instantTouched = true;
    }
    // set value
    const nextValue = e.target.value;
    props.setValue(nextValue);
    // validate if necessary
    instantTouched && validateFieldValue(nextValue);
  };

  return (
    <FormFieldContainer>
      {props.labelText && (
        <FormFieldLabel fieldId={props.id} required={props.required}>
          {props.labelText}
        </FormFieldLabel>
      )}

      <input
        ref={ref}
        className={`form-field ${
          isValid ? (wasTouched ? "valid" : "") : "invalid"
        }`}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChangeInputValue}
        required={props.required}
        type={props.type}
      />

      {!isValid &&
        errorMessages.map((errMessage, index) => (
          <FormFieldError key={index}>{errMessage}</FormFieldError>
        ))}
    </FormFieldContainer>
  );
});

export default Input;
