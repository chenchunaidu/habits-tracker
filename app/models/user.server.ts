import arc from "@architect/functions";
import invariant from "tiny-invariant";

export type User = {
  id: string;
  email: string;
  verified: boolean;
  avatar: string;
  name: string;
};

export async function getUserById(id: User["id"]): Promise<User | null> {
  const db = await arc.tables();
  const result = await db.user.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": id },
  });

  const [record] = result.Items;
  if (record)
    return {
      id: record.pk,
      email: record.email,
      verified: record.verified,
      avatar: record.avatar,
      name: record.name,
    };
  return null;
}

export async function createUser({ id, ...user }: User) {
  const db = await arc.tables();
  await db.user.put({
    pk: id,
    ...user,
  });

  const newUser = await getUserById(id);
  invariant(user, `User not found after being created. This should not happen`);

  return newUser;
}

export const updateUser = async (user: Partial<User>) => {
  if (user?.id) {
    const currentUser = await getUserById(user?.id);
    const db = await arc.tables();
    await db.user.put({
      ...currentUser,
      pk: user?.id,
      ...user,
    });
  }
};

export async function deleteUser(id: string) {
  const db = await arc.tables();
  await db.user.delete({ pk: id });
}
