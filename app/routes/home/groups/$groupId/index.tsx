import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import Group from "~/components/user/group";
import { requiredUser } from "~/lib/auth/auth";
import { getGroupByGroupId } from "~/models/group.server";
import { getRecommendationsByGroupId } from "~/models/recommendation.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const groupId = params.groupId;
  if (groupId) {
    const recommendations = await getRecommendationsByGroupId(user.id, groupId);
    const group = await getGroupByGroupId(user.id, groupId);
    return { recommendations, group: group };
  }
};

export default function GroupPage() {
  const { group, recommendations } = useLoaderData();
  const location =
    typeof window !== "undefined" ? window?.location?.origin : "";

  return (
    <Container className="flex h-full flex-col justify-between space-y-4 pb-4">
      <Group
        {...group}
        view="grid"
        recommendations={recommendations}
        groupLink={`${location}/users/${group?.userId}/groups/${group?.id}`}
        isAdmin={true}
      />
    </Container>
  );
}
