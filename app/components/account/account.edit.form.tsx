import type { FC } from "react";
import { Form } from "@remix-run/react";
import CustomForm from "../common/form/form";

import TransitionButton from "../common/transition-button";
import type { Transition } from "@remix-run/react/dist/transition";
import type { FormInputProps } from "../common/form/input";

export interface EditAccountFormData {
  data?: {
    avatar?: string;
    name?: string;
  };
  errors?: {
    avatar?: string;
    name?: string;
  };
}

export interface EditAccountFormProps {
  actionData: EditAccountFormData;
  transition?: Transition;
  redirectTo?: string;
  formSchema: FormInputProps[];
}

const EditAccountForm: FC<EditAccountFormProps> = ({
  actionData,
  transition,
  redirectTo,
  formSchema,
}) => {
  return (
    <div className="flex w-full flex-col space-y-4 rounded-md p-10">
      <Form method="post">
        <div className="flex flex-col space-y-4">
          <CustomForm inputs={formSchema} actionData={actionData} />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <TransitionButton
            type="submit"
            variant="solid"
            transition={transition}
            text={{
              submitting: "Saving...",
              actionRedirecting: "Saved redirecting...",
            }}
          >
            Save
          </TransitionButton>
        </div>
      </Form>
    </div>
  );
};

export default EditAccountForm;
