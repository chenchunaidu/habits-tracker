import arc from "@architect/functions";
import randomstring from "randomstring";
import { convertSubtasksIntoObj, getSubtasksByUserId } from "./subtask.server";

export type Task = {
  id: number;
  userId: string;
  title: string;
  description: string;
  createdAt: number;
};

export const createTask = async ({ userId, ...task }: Task) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  const newGroup = await db.task.put({
    pk: userId,
    ...task,
    sk: id,
    createdAt: time,
  });
  return newGroup;
};

export const getTasksByUserId = async (userId: string) => {
  const db = await arc.tables();
  const tasks = await db.task.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  const subtasks = await getSubtasksByUserId(userId);
  const subtasksObj = await convertSubtasksIntoObj(subtasks);
  return tasks.Items.map((task) => ({
    ...task,
    id: task.sk,
    subtasks: subtasksObj[task.sk],
  }));
};
