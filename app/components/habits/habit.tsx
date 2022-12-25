import React from "react";

export interface HabitProps {
  id: number;
  completed?: boolean;
  image?: string;
  title: string;
  description: string;
  onChange?: () => void;
}

const Habit: React.FC<HabitProps> = ({
  id,
  completed,
  image,
  title,
  description,
  onChange,
}) => {
  return (
    <div>
      {" "}
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
          checked={completed}
          onChange={onChange}
        ></input>
        <img
          src={image}
          alt="habit.title"
          className="h-12 w-12 rounded-md object-cover"
        />
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm font-semibold text-slate-600">
            9:00AM - 9:30 AM
          </div>
          <div className="text-sm text-slate-700">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Habit;
