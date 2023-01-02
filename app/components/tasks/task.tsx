import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link, useFetcher } from "@remix-run/react";
import React from "react";
import Button from "../common/button";
import Menu from "../common/menu/menu";
import type { SubtaskProps } from "./subtask";
import Subtask from "./subtask";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  subtasks: SubtaskProps[];
  completed: boolean;
}

const Task: React.FC<TaskProps> = (task) => {
  const toggle = useFetcher();
  const checked = toggle.submission
    ? // use the optimistic version
      Boolean(toggle.submission.formData.get("taskStatus"))
    : // use the normal version
      task.completed;
  return (
    <div
      key={task.id}
      className={`rounder-md space-y-4 rounded-md bg-lime-300 py-8 px-4 text-stone-600 shadow-md`}
    >
      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="flex space-x-2">
            <toggle.Form method="put">
              <input type="hidden" value="task-status-update" name="formName" />
              <input type="hidden" value={task.id} name="taskId" />
              <input
                type="checkbox"
                className="mt-2 h-4 w-4"
                checked={checked}
                name="taskStatus"
                id="taskStatus"
                onChange={(e) => toggle.submit(e.target.form)}
              />
            </toggle.Form>
            <div className="text-lg font-semibold text-stone-700">
              {task.title}
            </div>
          </div>
          <div className="flex space-x-1">
            <Link to={`/home/tasks/${task.id}/subtask/new`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <PlusIcon className="h-4 w-4" />
                <div>subtask</div>
              </Button>
            </Link>
            <Menu items={[]}>
              <Button variant="link" size="sm">
                <EllipsisVerticalIcon className="h-5 w-5" />
              </Button>
            </Menu>
          </div>
        </div>
        <div>{task.description}</div>
      </div>
      {task?.subtasks?.map(({ id, description, title, completed }) => {
        return (
          <Subtask
            key={id}
            title={title}
            description={description}
            id={id}
            completed={completed}
          />
        );
      })}
    </div>
  );
};

export default Task;
