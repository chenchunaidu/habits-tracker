import React from "react";

export interface SubtaskProps {
  id: string;
  title: string;
  description: string;
}

const Subtask: React.FC<SubtaskProps> = (subtask) => {
  return (
    <div
      key={subtask.id}
      className="flex items-start space-x-4 rounded-md bg-white p-4 text-stone-700"
    >
      <div className="flex items-start space-x-2">
        <div>
          <input type="checkbox" className="mt-1 h-4 w-4" />
        </div>
        <div>
          <div className="font-semibold">{subtask.title}</div>
          <div>{subtask.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Subtask;
