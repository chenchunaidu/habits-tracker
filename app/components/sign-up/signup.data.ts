import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const singUpFormData: FormInputProps[] = [
  {
    label: "Name",
    inputProps: {
      id: "name",
      name: "name",
      autoFocus: true,
      placeholder: "Mary jones",
      required: true,
    },
  },
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

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required().min(3).max(250),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
