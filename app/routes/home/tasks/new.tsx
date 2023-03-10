import { useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { validateFormData } from "~/components/common/form/utils";
import type { createHabitActionData } from "~/components/habits/new.form";
import { requiredUser } from "~/lib/auth/auth";
import Container from "~/components/common/container";
import CreateTask from "~/components/tasks/new.form";
import {
  createTaskFormData,
  createTaskValidationSchema,
} from "~/components/tasks/new.data";
import { createTask } from "~/models/task.server";

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    createTaskFormData,
    createTaskValidationSchema
  );
  if (!errors) {
    try {
      const res = await createTask({
        ...formOutput,
        userId: user.id,
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
      <CreateTask actionData={actionData} transition={transition} />
    </Container>
  );
}
