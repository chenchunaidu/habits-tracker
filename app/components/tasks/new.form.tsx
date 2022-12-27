import type { FC } from "react";
import { Form } from "@remix-run/react";
import type { CustomFormProps } from "../common/form/form";
import CustomForm from "../common/form/form";
import { createTaskFormData } from "./new.data";
import Heading from "../common/heading";
import type { TransitionButtonText } from "../common/transition-button";
import TransitionButton from "../common/transition-button";
import type { Transition } from "@remix-run/react/dist/transition";
import type { Option } from "../common/select";

export interface createTaskActionData {
  data?: {
    title?: string;
    description?: string;
  };
  errors?: {
    title?: string;
    description?: string;
  };
}

export interface createTaskProps {
  actionData: createTaskActionData;
  transition?: Transition;
  title?: string;
  submitButtonLabel?: string;
  submitButtonLabelTexts?: TransitionButtonText;
  formSchema?: CustomFormProps["inputs"];
}

const CreateTask: FC<createTaskProps> = ({
  actionData,
  transition,
  title = "New Task",
  submitButtonLabel = "Add",
  submitButtonLabelTexts = {
    submitting: "Adding...",
    actionRedirecting: "Added redirecting...",
  },
  formSchema = createTaskFormData,
}) => {
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-10 shadow-sm">
      <div>
        <Heading order="6" className="text-slate-800">
          {title}
        </Heading>
      </div>
      <Form method="post">
        <div className="flex flex-col space-y-4">
          <CustomForm inputs={formSchema} actionData={actionData} />
          <TransitionButton
            transition={transition}
            text={submitButtonLabelTexts}
          >
            {submitButtonLabel}
          </TransitionButton>
        </div>
      </Form>
    </div>
  );
};

export default CreateTask;
