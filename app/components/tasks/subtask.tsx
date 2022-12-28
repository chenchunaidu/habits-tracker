import { useFetcher } from "@remix-run/react";
import React from "react";
import Editor from "../common/lexical/lexical";

export interface SubtaskProps {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

const Subtask: React.FC<SubtaskProps> = (subtask) => {
  const toggle = useFetcher();
  const checked = toggle.submission
    ? Boolean(toggle.submission.formData.get("subtaskStatus"))
    : subtask.completed;
  return (
    <div
      key={subtask.id}
      className="flex items-start space-x-4 rounded-md bg-white p-4 text-stone-700"
    >
      <div className="flex items-start space-x-2">
        <toggle.Form method="put">
          <input
            type="hidden"
            name="formName"
            value={"subtask-status-update"}
          />
          <input type="hidden" value={subtask.id} name="subtaskId" />
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            name="subtaskStatus"
            checked={checked}
            onChange={(e) => toggle.submit(e.target.form)}
          />
        </toggle.Form>
        <div>
          <div className="font-semibold">{subtask.title}</div>
          <Editor initialState={subtask.description} />
        </div>
      </div>
    </div>
  );
};

export default Subtask;
