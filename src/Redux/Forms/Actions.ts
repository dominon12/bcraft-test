import { FormName } from "./../../Types/FormTypes";
import * as types from "./Types";

export const updateFieldValue = (
  formName: FormName,
  fieldName: string,
  fieldValue: string
) => ({
  type: types.UPDATE_FIELD_VALUE,
  payload: {
    formName,
    fieldName,
    fieldValue,
  },
});

export const clearFormsState = () => ({
  type: types.CLEAR_STATE,
});
