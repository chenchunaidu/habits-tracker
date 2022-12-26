import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";

import Fullscreen from "~/components/common/full-screen";
import SignUp from "~/components/sign-up/signup";
import { validateFormData } from "~/components/common/form/utils";
import {
  signUpValidationSchema,
  singUpFormData,
} from "~/components/sign-up/signup.data";
import { createNewUser, isAuthenticated } from "~/lib/auth/auth";
import type { ApiError } from "@supabase/supabase-js";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthenticated(request, true);
  if (user) return redirect("/home");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
    name?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { errors = {}, formOutput } = await validateFormData(
    formData,
    singUpFormData,
    signUpValidationSchema
  );
  if (Object.keys(errors).length) {
    return json({ errors, data: formOutput });
  }
  try {
    const { data, error } = await createNewUser({ ...formOutput });
    if (data) {
      return redirect("/email-confirmation");
    }
    throw error;
  } catch (error) {
    errors.server = (error as ApiError)?.message;
    return json({ errors, data: formOutput }, { status: 500 });
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "create account | Trackbit",
  };
};

export default function SignUpPage() {
  const actionData = useActionData() as ActionData;
  const transition = useTransition();
  return (
    <Fullscreen className="flex items-center justify-center">
      <SignUp actionData={actionData} transition={transition} />
    </Fullscreen>
  );
}
