import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import Button from "~/components/common/button";
import NavFloater from "~/components/habits/nav-floater";
import HomeContainer from "~/components/home/home-container";
import { requiredUser } from "~/lib/auth/auth";
import { getTasksByUserId } from "~/models/task.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getTasksByUserId(user.id);
  return { tasks: data };
};

export default function Homepage() {
  const { tasks } = useLoaderData();
  return (
    <HomeContainer header="Tasks" addLink="/home/tasks/new">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounder-md space-y-4 rounded-md bg-lime-300 py-8 px-4 text-stone-600 shadow-md`}
        >
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-stone-700">
                {task.title}
              </div>
              <Link to={`/home/tasks/${task.id}/subtask/new`}>
                <Button variant="ghost" size="sm">
                  Add subtask
                </Button>
              </Link>
            </div>
            <div>{task.description}</div>
          </div>
          {task?.subtasks?.map((subtask) => {
            return (
              <div
                key={subtask.id}
                className="flex items-start space-x-4 rounded-md bg-white p-4 text-stone-700"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <div className="font-semibold">{subtask.title}</div>
                  </div>
                  <div>{subtask.description}</div>
                </div>
              </div>
            );
          })}
          <Button size="md" variant="ghost" className="w-full">
            Mark as done
          </Button>
        </div>
      ))}
      <NavFloater />
    </HomeContainer>
  );
}
