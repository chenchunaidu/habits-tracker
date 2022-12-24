import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createRecommendationFormData: FormInputProps[] = [
  {
    label: "URL",
    inputProps: {
      id: "url",
      name: "url",
      autoFocus: true,
      placeholder: "https://www.hotstar.com/in/movies/rrr/1260108122",
      required: true,
    },
    helperText: "Enter url of the recommendation",
  },
];

export const createRecommendationValidationSchema = yup.object().shape({
  url: yup.string().required().url(),
  groupId: yup.string(),
});
