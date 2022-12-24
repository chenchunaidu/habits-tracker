import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";

import Fullscreen from "~/components/common/full-screen";
import Login from "~/components/login/login-form";
import { validateFormData } from "~/components/common/form/utils";
import {
  loginFormData,
  loginValidationSchema,
} from "~/components/login/login.data";
import { isAuthenticated, signInUser } from "~/lib/auth/auth";
import supabaseToken from "~/lib/auth/cookie";
import type { ApiError } from "@supabase/supabase-js";

//TODO: If token already exists go to index screen
export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthenticated(request, true);
  if (user) return redirect("/home");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
    server?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { errors = {}, formOutput } = await validateFormData(
    formData,
    loginFormData,
    loginValidationSchema
  );
  try {
    const { data, error } = await signInUser({
      ...formOutput,
    });
    if (data && data?.user) {
      return redirect("/home", {
        headers: {
          "Set-Cookie": await supabaseToken.serialize(
            data.session?.access_token,
            {
              expires: data.session?.expires_at
                ? new Date(data.session?.expires_at)
                : new Date(),
              maxAge: data.session?.expires_in,
            }
          ),
        },
      });
    }
    throw error;
  } catch (error) {
    errors.server = (error as ApiError)?.message;
    return json({ errors }, { status: 500 });
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const actionData = useActionData() as ActionData;
  const transition = useTransition();

  return (
    <Fullscreen className="flex justify-center">
      <Login actionData={actionData} transition={transition} />
    </Fullscreen>
  );
}
