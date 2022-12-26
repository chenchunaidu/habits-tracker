import arc from "@architect/functions";
import randomstring from "randomstring";

export type Group = {
  id: number;
  userId: string;
  title: string;
  description: string;
  createdAt: number;
  image: string;
};

export const createGroup = async ({ userId, ...group }: Group) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  const newGroup = await db.task.put({
    pk: userId,
    ...group,
    sk: id,
    createdAt: time,
  });
  return newGroup;
};

export const getGroupsByUserId = async (userId: string) => {
  const db = await arc.tables();
  const groups = await db.task.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  return groups.Items.map((group) => ({ ...group, id: group.sk }));
};

export const getGroupByGroupId = async (userId: string, groupId: string) => {
  const db = await arc.tables();
  const groups = await db.task.query({
    KeyConditionExpression: "pk= :pk AND sk = :sk",
    ExpressionAttributeValues: { ":sk": groupId, ":pk": userId },
  });
  return (
    groups.Items.map((group) => ({ ...group, id: group.sk, userId }))?.[0] || {}
  );
};
