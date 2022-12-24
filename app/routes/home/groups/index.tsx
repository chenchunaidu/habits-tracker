import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import { requiredUser } from "~/lib/auth/auth";
import { getGroupsByUserId } from "~/models/group.server";
import HomeGroups from "~/components/home/groups";
import Heading from "~/components/common/heading";
import { PlusIcon, ShareIcon } from "@heroicons/react/24/solid";
import CopyToClipBoardButton from "~/components/common/copy-to-clipboard";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getGroupsByUserId(user.id);
  return { groups: data, user };
};

export default function GroupsPage() {
  const { groups, user } = useLoaderData();
  const location =
    typeof window !== "undefined" ? window?.location?.origin : "";
  const link = `${location}/users/${user.id}/groups`;

  return (
    <Container className="space-y-4 ">
      <div className="h-full w-full space-y-4 md:space-y-10">
        <div className="flex w-full items-center justify-between">
          <Heading order="4" className="md:text-2xl">
            Groups
          </Heading>
          <div className="flex items-center">
            <Link to="/home/groups/new">
              <PlusIcon className="h-6 w-6 hover:via-violet-500" />
            </Link>
            <CopyToClipBoardButton copyText={link || ""}>
              <ShareIcon className="h-5 w-5" />
            </CopyToClipBoardButton>
          </div>
        </div>
        <HomeGroups groups={groups} showEmptyCardsMsg link={`/home/groups`} />
      </div>
    </Container>
  );
}
