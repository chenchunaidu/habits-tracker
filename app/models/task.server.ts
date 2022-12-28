import arc from "@architect/functions";
import randomstring from "randomstring";
import { convertSubtasksIntoObj, getSubtasksByUserId } from "./subtask.server";

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: number;
  completed: boolean;
  updateAt: number;
};

export const createTask = async ({ userId, ...task }: Task) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  const newTask = await db.task.put({
    pk: userId,
    ...task,
    sk: id,
    createdAt: time,
  });
  return newTask;
};

export const updateTask = async ({
  userId,
  id,
  completed,
}: Pick<Task, "id" | "userId" | "completed">) => {
  const db = await arc.tables();
  const time = Date.now();
  const currentTask = await db.task.query({
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: { ":pk": userId, ":sk": id },
    ScanIndexForward: false,
  });
  if (currentTask.Items.length) {
    await db.task.put({
      ...currentTask.Items[0],
      completed: completed,
      updatedAt: time,
    });
  }
};

export const getTasksByUserId = async (
  userId: string,
  completed: boolean = false
) => {
  const db = await arc.tables();
  const tasks = await db.task.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
    // FilterExpression: "completed = :completed",
  });
  const subtasks = await getSubtasksByUserId(userId);
  const subtasksObj = await convertSubtasksIntoObj(subtasks);
  return tasks.Items.map((task) => ({
    ...task,
    id: task.sk,
    subtasks: subtasksObj[task.sk],
  }));
};
