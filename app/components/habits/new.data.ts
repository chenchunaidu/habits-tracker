import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createRecommendationFormData: FormInputProps[] = [
  {
    label: "Name",
    inputProps: {
      id: "habitName",
      name: "habitName",
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

export const createRecommendationValidationSchema = yup.object().shape({
  url: yup.string().required().url(),
  groupId: yup.string(),
});
