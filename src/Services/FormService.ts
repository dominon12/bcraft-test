import {
  ToBeEqualValidation,
  ValidationOptions,
} from "./../Components/Types/FormTypes";

export const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates whether passed value is empty
 * if 'required' param is truthy.
 *
 * @param {string} value - value to validate
 * @param {boolean} [required] - is value required
 * @return {*}  {(string | undefined)} - error message or undefined
 */
function emptyStringValidator(
  value: string,
  required?: boolean
): string | undefined {
  if (required && value.length === 0) {
    return "This field can't be empty";
  }
}

/**
 * Validates whether passed value
 * corresponds to passed regular expression.
 *
 * @param {string} value - value to validate
 * @param {RegExp} [regexp] - regular expression
 * @return {*}  {(string | undefined)} - error message or undefined
 */
function regexpValidator(value: string, regexp?: RegExp): string | undefined {
  if (regexp && !regexp.test(value)) {
    return "Field's value doesn't match with specified pattern";
  }
}

/**
 * Validates whether passed value
 * is equal to passed 'toBeEqualTo.valueToBeEqualTo.
 * param.
 *
 * @param {string} value - value to validate
 * @param {ToBeEqualValidation} [toBeEqualTo]
 * @return {*}  {(string | undefined)} - error message or undefined
 */
function toBeEqualToValidator(
  value: string,
  toBeEqualTo?: ToBeEqualValidation
): string | undefined {
  if (toBeEqualTo && value !== toBeEqualTo.valueToBeEqualTo) {
    return `Fields' value isn't equal to ${toBeEqualTo.valueName} field`;
  }
}

/**
 * Validates whether passed value
 * includes at least one capital letter.
 *
 * @param {string} value - value to validate
 * @param {boolean} [shouldValidate]
 * @return {*}  {(string | undefined)} - error message or undefined
 */
function includesUppercaseLettersValidator(
  value: string,
  shouldValidate?: boolean
): string | undefined {
  if (shouldValidate) {
    const hasUppercaseLetters =
      value.split("").filter((letter) => letter === letter.toUpperCase())
        .length > 0;
    if (!hasUppercaseLetters) {
      return "Field's value must include at least one uppercase letter";
    }
  }
}

/**
 * Validates whether passed value has
 * length bigger than 'minLength' param.
 *
 * @param {string} value - value to validate
 * @param {number} [minLength]
 * @return {*}  {(string | undefined)} - error message or undefined
 */
function minLengthValidator(
  value: string,
  minLength?: number
): string | undefined {
  if (minLength && value.length < minLength) {
    return `Field's value must be at least ${minLength} characters long`;
  }
}

/**
 * Validates whether passed value
 * has length smaller than 'maxLength'
 * param.
 *
 * @param {string} value - value to validate
 * @param {number} [maxLength]
 * @return {*}  {(string | undefined)} - error message or undefined
 */
function maxLengthValidator(
  value: string,
  maxLength?: number
): string | undefined {
  if (maxLength && value.length > maxLength) {
    return `Field's value can't be longer than ${maxLength} characters`;
  }
}

/**
 * Validates passed 'value' param
 * using different validators depending
 * on 'validationOptions' param.
 *
 * @export
 * @param {string} value - value to validate
 * @param {ValidationOptions} [validationOptions] - validation options
 * @param {boolean} [required] - is value required
 * @return {*}  {{
 *   isValid: boolean; - indicated whether value successfully passed validation
 *   errors: string[]; - array of error messages
 * }}
 */
export function validateFormField(
  value: string,
  validationOptions?: ValidationOptions,
  required?: boolean
): {
  valid: boolean;
  errors: string[];
} {
  let error;
  let errors: string[] = [];

  // test empty string
  error = emptyStringValidator(value, required);
  if (error) errors.push(error);

  // test regexp
  error = regexpValidator(value, validationOptions?.regexp);
  if (error) errors.push(error);

  // test to be equal
  error = toBeEqualToValidator(value, validationOptions?.toBeEqualTo);
  if (error) errors.push(error);

  // check whether passed string includes at least
  // one uppercase letter
  error = includesUppercaseLettersValidator(
    value,
    validationOptions?.includeUppercaseLetters
  );
  if (error) errors.push(error);

  // min length validation
  error = minLengthValidator(value, validationOptions?.minLength);
  if (error) errors.push(error);

  // max length validation
  error = maxLengthValidator(value, validationOptions?.maxLength);
  if (error) errors.push(error);

  return {
    valid: errors.length === 0,
    errors,
  };
}
