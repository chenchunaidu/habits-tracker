import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Fullscreen from "~/components/common/full-screen";
import Header from "~/components/common/header";
import { requiredUser } from "~/lib/auth/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  return user.id;
};

export default function HomePage() {
  const userId = useLoaderData();
  return (
    <Fullscreen className="flex flex-col items-center space-y-4 bg-gray-50">
      <Header userId={userId} />
      <Outlet />
    </Fullscreen>
  );
}
