import arc from "@architect/functions";
import randomstring from "randomstring";

export type HabitStatus = {
  id: string;
  habitId: string;
  userId: string;
  createdAt: number;
  statusDate?: string;
  completed?: boolean;
};

export const getHabitStatusByUserId = async (userId: string) => {
  const db = await arc.tables();
  const dailyHabit = await db.habitStatus.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  return dailyHabit.Items.map((item) => ({ ...item, statusDate: item?.sk }));
};

export const getHabitStatusByUserIdAndDate = async (
  userId: string,
  statusDate: string
) => {
  const db = await arc.tables();
  const dailyHabit = await db.habitStatus.query({
    KeyConditionExpression: "pk = :pk AND statusDate = :statusDate",
    IndexName: "byUserIdDate",
    ExpressionAttributeValues: { ":pk": userId, ":statusDate": statusDate },
    ScanIndexForward: false,
  });
  return dailyHabit.Items.map((item) => ({ ...item, habitId: item?.sk }));
};

export const createHabitStatus = async ({
  userId,
  habitId,
  completed,
}: Omit<HabitStatus, "id" | "createdAt" | "statusDate">) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  //FIXME: Check if we need to pass date as argument
  const statusDate = new Date().toISOString().split("T")[0];
  await db?.habitStatus.put({
    id: id,
    sk: habitId,
    pk: userId,
    createdAt: time,
    statusDate,
    completed,
  });
};
