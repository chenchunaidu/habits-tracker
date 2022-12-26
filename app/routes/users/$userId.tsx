import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import Fullscreen from "~/components/common/full-screen";
import LoginBanner from "~/components/common/login-banner";
import Profile from "~/components/user/profile";
import { isAuthenticated } from "~/lib/auth/auth";
import { getUserById } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const authenticated = await isAuthenticated(request);
  if (!params.userId) return { groups: [] };
  const user = await getUserById(params.userId);
  return { user, authenticated };
};

export default function UserPage() {
  const { user, authenticated } = useLoaderData();

  return (
    <Fullscreen className="flex flex-col items-center">
      <Container className="space-y-4">
        <Profile user={user} />
        <Outlet />
      </Container>
      {!authenticated ? (
        <div className="fixed bottom-0 flex w-full justify-center bg-lime-700  p-4">
          <LoginBanner />
        </div>
      ) : (
        <div></div>
      )}
    </Fullscreen>
  );
}
