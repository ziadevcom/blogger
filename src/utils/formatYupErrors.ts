import { ValidationError } from "yup";

export function formatYupErrors(validationErrors: ValidationError) {
  const errors: any = {};
  validationErrors.inner.map((error) => {
    errors[error.path as string] = error.errors[0];
  });
  return errors;
}
