import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createHabitFormData: FormInputProps[] = [
  {
    label: "Name",
    inputProps: {
      id: "title",
      name: "title",
      autoFocus: true,
      placeholder: "Jogging",
      required: true,
    },
    helperText: "Enter name of the habit",
  },
  {
    label: "Description",
    formInputType: "textarea",
    inputProps: {
      id: "description",
      name: "description",
      placeholder: "Run for 30min from Home to KBR Park",
    },
    helperText:
      "Add some description which can useful as a motivation for habit",
  },
  {
    label: "Start Time",
    inputProps: {
      id: "startTime",
      name: "startTime",
      type: "time",
    },
    helperText: "Enter start time of the habit",
  },
  {
    label: "End Time",
    inputProps: {
      id: "endTime",
      name: "endTime",
      type: "time",
    },
    helperText: "Enter end time of the habit",
  },
];

export const createHabitValidationSchema = yup.object().shape({
  title: yup.string().required(),
});
