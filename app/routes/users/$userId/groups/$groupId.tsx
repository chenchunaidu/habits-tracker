import type { Group } from "~/models/group.server";
import { getGroupByGroupId } from "~/models/group.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRecommendationsByGroupId } from "~/models/habit.server";
import { getUserById } from "~/models/user.server";
import GroupComp from "~/components/user/group";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.userId || !params.groupId) return { groups: [] };
  const recommendations = await getRecommendationsByGroupId(
    params.userId,
    params.groupId
  );
  const user = await getUserById(params.userId);
  const group = await getGroupByGroupId(params.userId, params.groupId);
  return { recommendations: recommendations, user, group };
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

export default function UserGroupPage() {
  const { recommendations, group = {} } = useLoaderData();
  return <GroupComp {...group} recommendations={recommendations} />;
}
