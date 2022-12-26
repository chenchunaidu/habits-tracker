import { useActionData, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import EditAccountForm from "~/components/account/account.edit.form";
import Avatar from "~/components/common/avatar";
import Container from "~/components/common/container";
import { requiredUser } from "~/lib/auth/auth";
import { getUserById, updateUser } from "~/models/user.server";
import {
  EditAccountData,
  validationSchema,
} from "~/components/account/account.edit.data";
import { validateFormData } from "~/components/common/form/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const sbUser = await requiredUser(request);
  const user = await getUserById(sbUser.id);
  if (user) {
    EditAccountData.forEach((formSchemaItem) => {
      const name = formSchemaItem.inputProps.name;
      if ((name && name == "name") || name == "avatar") {
        formSchemaItem.inputProps.defaultValue = user[name];
      }
    });
  }
  return { formSchema: EditAccountData, user };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    EditAccountData,
    validationSchema
  );
  if (!errors) {
    await updateUser({ id: user.id, ...formOutput });
  }
  return json({ errors, status: 500 });
};

export default function Account() {
  const actionData = useActionData();
  const { formSchema, user } = useLoaderData();

  return (
    <Container className="h-3/4 bg-white p-4 lg:w-1/3">
      <div className="flex flex-col items-center justify-center">
        <Avatar size="2xl" src={user?.avatar} className="object-cover"></Avatar>
        <EditAccountForm actionData={actionData} formSchema={formSchema} />
      </div>
    </Container>
  );
}
