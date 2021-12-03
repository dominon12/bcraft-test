/**
 * Represents validation options.
 *
 * @export
 * @interface ValidationOptions
 */
export interface ValidationOptions {
  toBeEqualTo?: ToBeEqualValidation;
  includeUppercaseLetters?: boolean;
  minLength?: number;
  maxLength?: number;
  regexp?: RegExp;
}

/**
 * To be equal validation
 *
 * @export
 * @interface ToBeEqualValidation
 */
export interface ToBeEqualValidation {
  valueToBeEqualTo: string;
  valueName: string;
}

/**
 * Represents form field state.
 *
 * @export
 * @interface FormFieldState
 */
export interface FormFieldState {
  fieldName: string;
  fieldValue: string;
}

export type FormName = "login" | "registration" | "change-password";

/**
 * Represents form's state.
 *
 * @export
 * @interface FormState
 */
export interface FormState {
  formName: FormName;
  fields: FormFieldState[];
}
