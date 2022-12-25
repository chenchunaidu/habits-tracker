import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { validateFormData } from "~/components/common/form/utils";
import type { CreateRecommendationActionData } from "~/components/habits/new.form";
import {
  editRecommendationFormData,
  createRecommendationValidationSchema,
} from "~/components/habits/edit.data";
import {
  getRecommendationsById,
  updateRecommendation,
} from "~/models/recommendation.server";
import CreateRecommendation from "~/components/habits/new.form";
import { requiredUser } from "~/lib/auth/auth";
import Container from "~/components/common/container";
import { getGroupsByUserId } from "~/models/group.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const groups = await getGroupsByUserId(user.id);
  const options = groups?.map((group) => ({
    label: group.title,
    value: group.id,
  }));
  const recommendation = await getRecommendationsById(
    user.id,
    params.recommendationId || ""
  );
  editRecommendationFormData.forEach((formSchemaItem) => {
    if (formSchemaItem.inputProps.name) {
      formSchemaItem.inputProps.defaultValue =
        recommendation[formSchemaItem.inputProps.name];
    }
    return formSchemaItem;
  });
  return {
    groupOptions: options,
    recommendation,
    formSchema: editRecommendationFormData,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    [
      ...editRecommendationFormData,
      {
        inputProps: {
          id: "group",
          name: "groupId",
        },
      },
    ],
    createRecommendationValidationSchema
  );
  if (!errors) {
    try {
      const res = await updateRecommendation({
        ...formOutput,
        userId: user.id,
        id: params.recommendationId,
      });
      return redirect(`/home`);
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  return { errors, data: formOutput };
};

export default function EditRecommendationPage() {
  const { groupOptions, formSchema, recommendation } = useLoaderData();
  const actionData = useActionData() as CreateRecommendationActionData;
  const transition = useTransition();
  return (
    <Container className="h-full w-full px-0 md:w-1/2">
      <CreateRecommendation
        title="Edit recommendation"
        submitButtonLabel="Edit"
        actionData={actionData}
        transition={transition}
        groupOptions={groupOptions}
        formSchema={formSchema || editRecommendationFormData}
        groupDefaultValue={recommendation?.groupId}
      />
    </Container>
  );
}
