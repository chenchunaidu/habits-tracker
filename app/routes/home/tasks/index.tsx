import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import Button from "~/components/common/button";
import NavFloater from "~/components/habits/nav-floater";
import HomeContainer from "~/components/home/home-container";
import Task, { TaskProps } from "~/components/tasks/task";
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
      {tasks.map(({ subtasks, title, description, id }) => (
        <Task
          title={title}
          description={description}
          id={id}
          subtasks={subtasks}
          key={id}
        />
      ))}
      <NavFloater />
    </HomeContainer>
  );
}
