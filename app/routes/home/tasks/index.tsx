import { useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import Button from "~/components/common/button";
import Empty from "~/components/common/empty";
import NavFloater from "~/components/habits/nav-floater";
import HomeContainer from "~/components/home/home-container";
import type { TaskProps } from "~/components/tasks/task";
import Task from "~/components/tasks/task";
import { requiredUser } from "~/lib/auth/auth";
import { updateSubTask } from "~/models/subtask.server";
import { getTasksByUserId, updateTask } from "~/models/task.server";

interface loaderResponse {
  tasks: TaskProps[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getTasksByUserId(user.id);
  return { tasks: data };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredUser(request);
  let formData = await request.formData();
  switch (formData.get("formName")) {
    case "task-status-update": {
      const taskId = formData.get("taskId");
      const completed = formData.get("taskStatus");
      if (taskId && typeof taskId === "string") {
        await updateTask({
          userId: user.id,
          id: taskId,
          completed: completed ? true : false,
        });
        return {};
      }
    }

    case "subtask-status-update": {
      console.log("coming here");
      const subtaskId = formData.get("subtaskId");
      const completed = formData.get("subtaskStatus");

      if (subtaskId && typeof subtaskId === "string") {
        await updateSubTask({
          userId: user.id,
          id: subtaskId,
          completed: completed ? true : false,
        });
        return {};
      }
    }

    default: {
      // handle errors
      return {};
    }
  }
  // check action and update
};

export default function Homepage() {
  const { tasks } = useLoaderData<loaderResponse>();

  return (
    <HomeContainer header="Tasks" addLink="/home/tasks/new">
      {tasks.length ? (
        tasks.map(({ subtasks, title, description, id, completed }) => (
          <Task
            title={title}
            description={description}
            id={id}
            subtasks={subtasks}
            key={id}
            completed={completed}
          />
        ))
      ) : (
        <Empty
          buttonLabel="Add new task"
          buttonLink="/home/tasks/new"
          label="You have no tasks"
        />
      )}
      <NavFloater />
    </HomeContainer>
  );
}
