import arc from "@architect/functions";
import randomstring from "randomstring";

export type HabitStatus = {
  id: string;
  habitId: string;
  userId: string;
  createdAt: number;
  date?: string;
  completed?: boolean;
};

export const getHabitStatusByUserId = async (userId: string) => {
  const db = await arc.tables();
  const dailyHabit = await db.habitStatus.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  return dailyHabit.Items.map((item) => ({ ...item, date: item?.sk }));
};

export const getHabitStatusByUserIdAndDate = async (
  userId: string,
  date: string
) => {
  const db = await arc.tables();
  const dailyHabit = await db.habitStatus.query({
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: { ":pk": userId, ":sk": date },
    ScanIndexForward: false,
  });
  return dailyHabit.Items.map((item) => ({ ...item, date: item?.sk }));
};

export const createHabitStatus = async ({
  userId,
  habitId,
  completed,
}: Omit<HabitStatus, "id" | "createdAt" | "date">) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  //FIXME: Check if we need to pass date as argument
  const date = new Date().toISOString().split("T")[0];
  console.log(id, date, userId);
  await db?.habitStatus.put({
    id: id,
    sk: date,
    pk: userId,
    createdAt: time,
    habitId,
    completed,
  });
};
