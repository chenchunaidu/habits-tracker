import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createGroupFormData: FormInputProps[] = [
  {
    label: "Title",
    inputProps: {
      id: "post-title",
      name: "title",
      autoFocus: true,
      placeholder: "Favorite music recommendations",
      required: true,
    },
  },
  {
    label: "Image URL",
    inputProps: {
      id: "image",
      name: "image",
      placeholder: "Enter url of the image",
    },
  },
];

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(3, "Title should be longer than 3 letter")
    .max(250),
  image: yup.string().url("Image url should be link to the image"),
});
