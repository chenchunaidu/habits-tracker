import { Link } from "@remix-run/react";
import React from "react";
import Button from "../common/button";
import type { SubtaskProps } from "./subtask";
import Subtask from "./subtask";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  subtasks: SubtaskProps[];
}

const Task: React.FC<TaskProps> = (task) => {
  return (
    <div
      key={task.id}
      className={`rounder-md space-y-4 rounded-md bg-lime-300 py-8 px-4 text-stone-600 shadow-md`}
    >
      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="flex space-x-2">
            <input type="checkbox" className="mt-2 h-4 w-4" />
            <div className="text-lg font-semibold text-stone-700">
              {task.title}
            </div>
          </div>
          <Link to={`/home/tasks/${task.id}/subtask/new`}>
            <Button variant="ghost" size="sm">
              Add subtask
            </Button>
          </Link>
        </div>
        <div>{task.description}</div>
      </div>
      {task?.subtasks?.map(({ id, description, title }) => {
        return (
          <Subtask key={id} title={title} description={description} id={id} />
        );
      })}
    </div>
  );
};

export default Task;
