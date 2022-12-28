import arc from "@architect/functions";
import randomstring from "randomstring";

export type Subtask = {
  id: string;
  taskId: string;
  userId: string;
  title: string;
  description: string;
  createdAt: number;
  completed: boolean;
};

export const createSubTask = async ({ userId, ...task }: Subtask) => {
  const db = await arc.tables();
  const time = Date.now();
  const id = time + randomstring.generate(4);
  const newGroup = await db.subtask.put({
    pk: userId,
    ...task,
    sk: id,
    createdAt: time,
  });
  return newGroup;
};

export const getSubtasksByUserId = async (userId: string) => {
  const db = await arc.tables();
  const subtasks = await db.subtask.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
    ScanIndexForward: false,
  });
  return subtasks.Items.map((task) => ({ ...task, id: task.sk }));
};

export const convertSubtasksIntoObj = async (subtasks: Subtask[]) => {
  const subtaskObj: Record<string, Array<Record<string, unknown>>> = {};
  subtasks.forEach((subtask) => {
    if (subtaskObj[subtask.taskId]) {
      subtaskObj[subtask.taskId].push(subtask);
    } else {
      subtaskObj[subtask.taskId] = [subtask];
    }
  });
  return subtaskObj;
};

export const updateSubTask = async ({
  userId,
  id,
  completed,
}: Pick<Subtask, "id" | "userId" | "completed">) => {
  const db = await arc.tables();
  const time = Date.now();
  const currentSubTask = await db.subtask.query({
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: { ":pk": userId, ":sk": id },
    ScanIndexForward: false,
  });

  if (currentSubTask.Items.length) {
    await db.subtask.put({
      ...currentSubTask.Items[0],
      completed: completed,
      updatedAt: time,
    });
  }
};
