import type { FormInputProps } from "./input";
import type * as yup from "yup";

export const validateFormData = async (
  formData: FormData,
  inputs: FormInputProps[],
  validationSchema?: yup.BaseSchema
) => {
  const formOutput: Record<string, string> = {};
  const errors: Record<string, string> = {};

  inputs.forEach((input) => {
    const inputName = input.inputProps.name;

    if (inputName) {
      const value = formData.get(inputName);
      if (typeof value === "string") {
        formOutput[inputName] = value;
      }
    }
  });
  try {
    const data = await validationSchema?.validate(formOutput, {
      abortEarly: false,
    });
    return { formOutput: data };
  } catch (error: any) {
    error.inner.forEach((e: any) => {
      errors[e.path] = e.message;
    });
    return { formOutput, errors };
  }
};
