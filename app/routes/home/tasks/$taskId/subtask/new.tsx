import { useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { validateFormData } from "~/components/common/form/utils";
import type { createHabitActionData } from "~/components/habits/new.form";
import { requiredUser } from "~/lib/auth/auth";
import Container from "~/components/common/container";
import {
  createTaskFormData,
  createTaskValidationSchema,
} from "~/components/tasks/new.data";
import CreateSubTask from "~/components/subtask/new.form";
import { createSubTask } from "~/models/subtask.server";

export const action: ActionFunction = async ({ request, params }) => {
  console.log(params);
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    createTaskFormData,
    createTaskValidationSchema
  );
  const taskId = params["taskId"];
  if (!errors) {
    try {
      const res = await createSubTask({
        ...formOutput,
        userId: user.id,
        taskId,
      });
      return redirect(`/home/tasks`);
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  return { errors, data: formOutput };
};

export default function CreateHabitPage() {
  const actionData = useActionData() as createHabitActionData;
  const transition = useTransition();

  return (
    <Container className="h-full w-full px-0 md:w-1/2">
      <CreateSubTask actionData={actionData} transition={transition} />
    </Container>
  );
}
