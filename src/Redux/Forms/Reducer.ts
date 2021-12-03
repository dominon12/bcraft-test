import { AnyAction } from "redux";

import * as types from "./Types";
import { FormState } from "../../Types/FormTypes";

const INITIAL_STATE: FormState[] = [];

const formsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case types.UPDATE_FIELD_VALUE:
      const formName = action.payload.formName;
      const fieldName = action.payload.fieldName;
      const fieldValue = action.payload.fieldValue;

      let form = state.find((formState) => formState.formName === formName);

      if (form) {
        form.fields = [
          ...form.fields.filter(
            (formFieldState) => formFieldState.fieldName !== fieldName
          ),
          { fieldName, fieldValue },
        ];
        return [
          ...state.filter((formState) => formState.formName !== formName),
          form,
        ];
      } else {
        const formToAdd: FormState = {
          formName,
          fields: [
            {
              fieldName,
              fieldValue,
            },
          ],
        };
        return [
          ...state.filter((formState) => formState.formName !== formName),
          formToAdd,
        ];
      }
    case types.CLEAR_STATE:
      return [];
    default:
      return state;
  }
};

export default formsReducer;
