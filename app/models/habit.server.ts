import arc from "@architect/functions";
import randomstring from "randomstring";
import type { HabitStatus } from "./daily-habit.server";
import { getHabitStatusByUserIdAndDate } from "./daily-habit.server";

export type Habit = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  image?: string;
  createdAt: number;
  startTime?: string;
  endTime?: string;
};

export const createHabit = async ({
  userId,
  title,
  description,
  image,
  startTime,
  endTime,
}: Omit<Habit, "id" | "createdAt">) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  await db?.habit.put({
    sk: id,
    pk: userId,
    title,
    description,
    image,
    createdAt: time,
    endTime,
    startTime,
  });
};

// export const updateRecommendation = async ({
//   id,
//   userId,
//   title,
//   description,
//   groupId,
//   media,
// }: Pick<
//   Habit,
//   "title" | "description" | "groupId" | "id" | "userId" | "media"
// >) => {
//   const db = await arc.tables();
//   const recommendation = await getRecommendationsById(userId, id);
//   const updateRecommendation = await db?.recommendations.put({
//     ...recommendation,
//     title,
//     description,
//     groupId,
//     media,
//   });
//   return updateRecommendation;
// };

export const getHabitsByUserId = async (userId: string): Promise<Habit[]> => {
  const db = await arc.tables();
  const habits = await db.habit.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  return habits.Items.map((item) => ({ ...item, id: item?.sk }));
};

const convertHabitStatusToObj = (habitStatus: HabitStatus[]) => {
  const habitStatusObj: Record<string, boolean> = {};
  habitStatus.forEach((habit) => {
    habitStatusObj[habit.habitId] = !!habit.completed;
  });
  return habitStatusObj;
};

export const getHabitsByUserIdAlongWithStatus = async (userId: string) => {
  const db = await arc.tables();
  const habits = await db.habit.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });

  const date = new Date().toISOString().split("T")[0];
  const habitStatus = await getHabitStatusByUserIdAndDate(userId, date);
  const habitStatusObj = convertHabitStatusToObj(habitStatus);
  return habits.Items.map((item) => ({
    ...item,
    id: item?.sk,
    completed: habitStatusObj[item?.sk],
  }));
};

export const getRecommendationsByGroupId = async (
  userId: string,
  groupId: string
) => {
  const db = await arc.tables();
  const recommendations = await db.habit.scan({
    FilterExpression: "pk = :pk AND groupId = :groupId",
    ExpressionAttributeValues: { ":pk": userId, ":groupId": groupId },
  });
  return recommendations.Items.map((item) => ({ ...item, id: item?.sk }));
};

export const getRecommendationsById = async (userId: string, id: string) => {
  const db = await arc.tables();
  const recommendations = await db.habit.query({
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: { ":pk": userId, ":sk": id },
  });

  return (
    recommendations.Items.map((item) => ({ ...item, id: item?.sk }))?.[0] || {}
  );
};

export async function deleteRecommendation(userId: string, id: string) {
  const db = await arc.tables();
  await db.habit.delete({ sk: id, pk: userId });
}
