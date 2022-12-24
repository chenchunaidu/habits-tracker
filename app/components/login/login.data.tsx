import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const loginFormData: FormInputProps[] = [
  {
    label: "Email",
    inputProps: {
      id: "email",
      name: "email",
      type: "email",
      autoFocus: true,
      placeholder: "Mary@gmail.com",
      required: true,
    },
  },
  {
    label: "Password",
    inputProps: {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "**************",
      required: true,
    },
  },
];

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required("Please Enter your password"),
});
