import type { Group } from "~/models/group.server";
import { getGroupsByUserId } from "~/models/group.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/models/user.server";
import HomeGroups from "~/components/home/groups";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.userId) return { groups: [], user: { id: params.userId } };
  const groups = await getGroupsByUserId(params.userId);
  const user = await getUserById(params.userId);
  return { groups, user: user || { id: params.userId } };
};

export const meta: MetaFunction = ({ data }) => {
  const { user = {}, groups = [] } = data;
  const title = `${user?.name}'s recommendations`;
  const avatar = data?.user;
  const userGroupTitles = groups?.map(
    (group: Group) => (user?.name || "") + " " + (group?.title || "")
  );
  return {
    title: `${user?.name}'s recommendations`,
    description: userGroupTitles,
    key: userGroupTitles.join(" | "),
    "twitter:site": title,
    "twitter:card": data.avatar,
    "twitter:description": userGroupTitles,
    "twitter:image": avatar,
    "og:description": userGroupTitles,
    "og:image": avatar,
    "og:title": title,
    "og:site_name": title,
    "og:type": "website",
  };
};

export default function UserGroupsPage() {
  const { groups, user } = useLoaderData();
  return <HomeGroups groups={groups} link={`/users/${user?.id}/groups`} />;
}
