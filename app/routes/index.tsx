import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import React from "react";
import { requiredUser } from "~/lib/auth/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  if (user) return redirect("/home");
  return {};
};

export default function Index() {
  return <div></div>;
}
