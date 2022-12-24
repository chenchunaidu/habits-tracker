import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const EditAccountData: FormInputProps[] = [
  {
    label: "Avatar URL",
    inputProps: {
      id: "avatar",
      name: "avatar",
      autoFocus: true,
      required: true,
    },
    helperText: "Just copy paste your image url",
  },
  {
    label: "Name",
    inputProps: {
      id: "name",
      name: "name",
    },
  },
];

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3, "Name should be longer than 3 letter")
    .max(250),
  image: yup.string().url("Image url should be link to the image"),
});
