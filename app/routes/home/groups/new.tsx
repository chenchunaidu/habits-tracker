import {
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { validateFormData } from "~/components/common/form/utils";
import CreateGroup from "~/components/group/create-new-group";
import type { CreateGroupActionData } from "~/components/group/create-new-group";
import {
  createGroupFormData,
  validationSchema,
} from "~/components/group/create-group.data";
import { createGroup } from "~/models/group.server";
import { requiredUser } from "~/lib/auth/auth";
import Container from "~/components/common/container";

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    createGroupFormData,
    validationSchema
  );
  const redirectTo = formData.get("redirectTo") as string;

  if (!errors) {
    try {
      const res = await createGroup({ ...formOutput, userId: user.id });
      return redirect(redirectTo);
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  return json({ errors, data: formOutput }, { status: 500 });
};

export default function CreateGroupPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/home/groups";
  const actionData = useActionData() as CreateGroupActionData;
  const transition = useTransition();

  return (
    <Container className="h-full w-full px-0 md:w-1/2">
      <CreateGroup
        actionData={actionData}
        transition={transition}
        redirectTo={redirectTo}
      />
    </Container>
  );
}
