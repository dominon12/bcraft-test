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
