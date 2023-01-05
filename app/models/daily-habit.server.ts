import arc from "@architect/functions";
import randomstring from "randomstring";
import { getHabitByUserId, getHabitsByUserId } from "./habit.server";

export type HabitStatus = {
  id: string;
  habitId: string;
  userId: string;
  createdAt: number;
  statusDate?: string;
  completed?: boolean;
  month?: string;
};

export const getHabitStatusByUserId = async (userId: string) => {
  const db = await arc.tables();
  const dailyHabit = await db.habitStatus.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  return dailyHabit.Items.map((item) => ({ ...item, id: item?.sk }));
};

const monthlyHabitStatusToObj = (habitStatus: HabitStatus[]) => {
  const habitStatusObj: Record<string, boolean> = {};
  habitStatus.forEach((habit) => {
    if (habit.statusDate) {
      habitStatusObj[habit.statusDate] = habit.completed || false;
    }
  });
  return habitStatusObj;
};

export const getMonthlyHabitStatusByUserId = async ({
  userId,
  habitId,
  month,
}: {
  userId: string;
  habitId: string;
  month: string;
}) => {
  const db = await arc.tables();
  const dailyHabit = await db.habitStatus.query({
    KeyConditionExpression: "pk = :pk AND statusMonth = :statusMonth",
    IndexName: "byUserIdMonth",
    ExpressionAttributeValues: {
      ":pk": userId,
      ":statusMonth": month,
      ":habitId": habitId,
    },
    FilterExpression: "habitId = :habitId",
    ScanIndexForward: false,
  });
  const habit = (await getHabitByUserId(userId, habitId))[0];
  return {
    habit: habit || {},
    monthlyStatus: monthlyHabitStatusToObj(
      dailyHabit.Items.map((item) => ({
        ...item,
        id: item?.sk,
      }))
    ),
  };
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
  return dailyHabit.Items.map((item) => ({ ...item, id: item?.id }));
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
  const month = statusDate.split("-");
  month.pop();
  await db?.habitStatus.put({
    habitId,
    sk: id,
    pk: userId,
    createdAt: time,
    statusDate,
    completed,
    statusMonth: month.join("-"),
  });
};
