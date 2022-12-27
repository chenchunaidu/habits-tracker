import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { validateFormData } from "~/components/common/form/utils";
import type { createHabitActionData } from "~/components/habits/new.form";
import {
  createHabitFormData,
  createHabitValidationSchema,
} from "~/components/habits/new.data";
import { createHabit } from "~/models/habit.server";
import CreateHabit from "~/components/habits/new.form";
import { requiredUser } from "~/lib/auth/auth";
import Container from "~/components/common/container";

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    [
      ...createHabitFormData,
      {
        inputProps: {
          id: "group",
          name: "groupId",
        },
      },
    ],
    createHabitValidationSchema
  );
  if (!errors) {
    try {
      const res = await createHabit({
        ...formOutput,
        userId: user.id,
      });
      return redirect(`/home`);
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
      <CreateHabit actionData={actionData} transition={transition} />
    </Container>
  );
}
