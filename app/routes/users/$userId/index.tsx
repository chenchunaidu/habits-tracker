import type { Group } from "~/models/group.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRecommendationsByUserId } from "~/models/recommendation.server";
import { getUserById } from "~/models/user.server";
import Cards from "~/components/user/cards";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.userId) return { groups: [] };
  const cards = await getRecommendationsByUserId(params.userId);
  const user = await getUserById(params.userId);
  return { cards: cards, user };
};

export const meta: MetaFunction = ({ data }) => {
  const { user = {}, groups = [] } = data;
  const title = `${user?.name}'s recommendations`;
  const avatar = user?.avatar;
  const userGroupTitles = groups?.map(
    (group: Group) => (user?.name || "") + " " + (group?.title || "")
  );
  return {
    title: `${user?.name}'s recommendations`,
    description: userGroupTitles,
    key: userGroupTitles.join(" | "),
    "twitter:site": "website",
    "twitter:card": userGroupTitles,
    "twitter:description": userGroupTitles,
    "twitter:image": avatar,
    "og:description": userGroupTitles,
    "og:image": avatar,
    "og:title": title,
    "og:site_name": title,
    "og:type": "website",
  };
};

export default function UserPage() {
  const { cards } = useLoaderData();

  return <Cards cards={cards} />;
}
