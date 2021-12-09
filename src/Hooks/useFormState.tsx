import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFieldValue } from "../Redux/Forms/Actions";

import { RootState } from "../Redux/Store";
import { FormName } from "../Types/FormTypes";

/**
 * Values needed for
 * useFormState hook to work.
 *
 * @export
 * @interface FormFieldProps
 */
export interface FormFieldProps {
  name: string;
  value: string;
  setValue: React.Dispatch<string>;
}

/**
 * Returns saved state of the specified form.
 *
 * Initializes form fields with saved values.
 *
 * Updates form's state in redux on every
 * change.
 *
 * @param {string} formName - name of the form
 * @return {*} form state
 */
function useFormState(formName: FormName, formFieldsProps: FormFieldProps[]) {
  // dispatch
  const dispatch = useDispatch();
  // get all forms from redux's state
  const forms = useSelector((state: RootState) => state.forms);
  // get specific form
  const formState = forms.find((formState) => formState.formName === formName);
  // declare empty object
  const fieldsState: any = {};
  if (formState) {
    // if form state exists, add it to created empty object
    formState.fields.forEach(
      ({ fieldName, fieldValue }) => (fieldsState[fieldName] = fieldValue)
    );
  }

  /**
   * initialize form fields values with
   * values from the store.
   */
  useEffect(() => {
    formFieldsProps.forEach((formFieldProps) => {
      const savedValue = fieldsState[formFieldProps.name];
      if (savedValue) formFieldProps.setValue(savedValue);
    });
  }, []);

  /**
   * Saves form fields values in redux's state
   * on every change.
   */
  useEffect(() => {
    formFieldsProps.forEach((formFieldProps) => {
      dispatch(
        updateFieldValue(formName, formFieldProps.name, formFieldProps.value)
      );
    });
  }, [formFieldsProps]);

  // return form state
  return fieldsState;
}

export default useFormState;
