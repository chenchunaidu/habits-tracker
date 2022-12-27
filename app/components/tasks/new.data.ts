import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createTaskFormData: FormInputProps[] = [
  {
    label: "Name",
    inputProps: {
      id: "title",
      name: "title",
      autoFocus: true,
      placeholder: "Complete Trigonometry assignment",
      required: true,
    },
    helperText: "Enter name of the task",
  },
  {
    label: "Description",
    formInputType: "textarea",
    inputProps: {
      id: "description",
      name: "description",
      placeholder:
        "1. Read trigonometry formulas. 2. Do Trigonometry 1A exercise",
    },
    helperText: "Add task description",
  },
];

export const createTaskValidationSchema = yup.object().shape({
  title: yup.string().required(),
});
