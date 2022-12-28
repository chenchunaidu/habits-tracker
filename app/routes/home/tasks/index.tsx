import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import Empty from "~/components/common/empty";
import NavFloater from "~/components/habits/nav-floater";
import HomeContainer from "~/components/home/home-container";
import type { TaskProps } from "~/components/tasks/task";
import Task from "~/components/tasks/task";
import { requiredUser } from "~/lib/auth/auth";
import { getTasksByUserId } from "~/models/task.server";

interface loaderResponse {
  tasks: TaskProps[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getTasksByUserId(user.id);
  return { tasks: data };
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
            completed
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
