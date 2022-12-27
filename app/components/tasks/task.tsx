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
      {task?.subtasks?.map(({ id, description, title }) => {
        return (
          <Subtask key={id} title={title} description={description} id={id} />
        );
      })}
      <Button size="md" variant="ghost" className="w-full">
        Mark as done
      </Button>
    </div>
  );
};

export default Task;
