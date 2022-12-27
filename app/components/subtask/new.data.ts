import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const CreateSubTaskFormData: FormInputProps[] = [
  {
    label: "Name",
    inputProps: {
      id: "title",
      name: "title",
      autoFocus: true,
      placeholder: "Read trigonometry formulas",
      required: true,
    },
    helperText: "Enter name of the subtask",
  },
  {
    label: "Description",
    formInputType: "textarea",
    inputProps: {
      id: "description",
      name: "description",
      placeholder: "Read trigonometry formulas and memorize them",
    },
    helperText: "Add subtask description",
  },
];

export const createSubTaskValidationSchema = yup.object().shape({
  title: yup.string().required(),
});
