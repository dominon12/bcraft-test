import { FormName, FormState } from "../Types/FormTypes";

export function getFormState(forms: FormState[], formName: FormName) {
  const formState = forms.find((formState) => formState.formName === formName);
  const fieldsState: any = {};

  if (formState) {
    formState.fields.forEach(
      ({ fieldName, fieldValue }) => (fieldsState[fieldName] = fieldValue)
    );
  }

  return fieldsState;
}
