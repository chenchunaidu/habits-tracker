import { Link, useFetcher } from "@remix-run/react";
import React from "react";
import type { Habit as HabitType } from "~/models/habit.server";
import Image from "../common/image";

export interface HabitProps extends HabitType {
  completed?: boolean;
}

const Habit: React.FC<HabitProps> = ({
  id,
  completed,
  image,
  title,
  description,
  endTime,
  startTime,
}) => {
  const toggle = useFetcher();
  const checked = toggle.submission
    ? // use the optimistic version
      Boolean(toggle.submission.formData.get("habitStatus"))
    : // use the normal version
      completed;

  return (
    <toggle.Form method="put" key={id}>
      <input type="hidden" value={id} name="habitId" />
      <Link
        to={`/home/habits/${id}/monthly-report`}
        className={`flex items-center space-x-4 rounded-md ${
          checked
            ? "bg-gradient-to-r from-lime-300 to-lime-400"
            : "bg-gradient-to-r from-gray-100 to-gray-200"
        } p-4 shadow-sm`}
      >
        <div>
          <input
            name="habitStatus"
            id="habitStatus"
            type="checkbox"
            className="h-6 w-6"
            checked={checked}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              toggle.submit(e.target.form);
            }}
          />
        </div>
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
      </Link>
    </toggle.Form>
  );
};

export default Habit;
