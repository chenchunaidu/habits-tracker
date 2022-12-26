import React from "react";
import type { Habit as HabitType } from "~/models/habit.server";
import Image from "../common/image";

export interface HabitProps extends HabitType {
  completed?: boolean;
  onChange?: () => void;
}

const Habit: React.FC<HabitProps> = ({
  id,
  completed,
  image,
  title,
  description,
  endTime,
  startTime,
  onChange,
}) => {
  return (
    <div>
      <div
        key={id}
        className={`flex items-center space-x-4 rounded-md ${
          completed
            ? "bg-gradient-to-r from-lime-300 to-lime-400"
            : "bg-gradient-to-r from-gray-100 to-gray-200"
        } p-4 shadow-sm`}
      >
        <input
          type="checkbox"
          className="h-6 w-6"
          checked={!!completed}
          onChange={onChange}
        ></input>
        <Image
          src={image}
          alt={title}
          className="h-12 w-12 rounded-md object-cover"
        />
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm font-semibold text-slate-600">
            {startTime} - {endTime}
          </div>
          <div className="text-sm text-slate-700">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Habit;
