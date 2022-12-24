import type { FC } from "react";
import { Form } from "@remix-run/react";
import CustomForm from "../common/form/form";
import { createGroupFormData } from "./create-group.data";
import Heading from "../common/heading";
import TransitionButton from "../common/transition-button";
import type { Transition } from "@remix-run/react/dist/transition";

export interface CreateGroupActionData {
  data?: {
    title?: string;
    description?: string;
  };
  errors?: {
    title?: string;
    description?: string;
  };
}

export interface CreateGroupProps {
  actionData: CreateGroupActionData;
  transition?: Transition;
  redirectTo?: string;
}

const CreateGroup: FC<CreateGroupProps> = ({
  actionData,
  transition,
  redirectTo,
}) => {
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-10 shadow-sm">
      <div>
        <Heading order="6" className="text-slate-800">
          Create new group
        </Heading>
      </div>
      <Form method="post">
        <div className="flex flex-col space-y-4">
          <CustomForm inputs={createGroupFormData} actionData={actionData} />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <TransitionButton
            type="submit"
            variant="solid"
            transition={transition}
            text={{
              submitting: "Creating...",
              actionRedirecting: "Created redirecting...",
            }}
          >
            Create
          </TransitionButton>
        </div>
      </Form>
    </div>
  );
};

export default CreateGroup;
