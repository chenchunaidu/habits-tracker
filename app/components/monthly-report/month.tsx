import type { FC } from "react";
import React from "react";
import { getMonthlyWeekWiseData } from "./utils";
import type { MonthlyReportDate } from "./utils";
import { Habit } from "~/models/habit.server";

interface WeekProps {
  weekData: (MonthlyReportDate | null)[];
}

const Week: FC<WeekProps> = ({ weekData }) => {
  return (
    <div className="flex space-x-2">
      {weekData.map((day) => {
        return (
          <div
            key={day?.date}
            className={`flex h-9 w-9  items-center justify-center rounded-full ${
              day?.status ? " bg-lime-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            <span>{day?.date}</span>
          </div>
        );
      })}
    </div>
  );
};

interface MonthProps {
  monthlyObj: Record<string, boolean>;
  habit: Habit;
}

export const Month: FC<MonthProps> = ({ monthlyObj = {}, habit }) => {
  const { weeks, monthName } = getMonthlyWeekWiseData(monthlyObj);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col rounded-md p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-slate-700">{habit.title}</div>
          <div className="rounded-md bg-lime-500 px-2 py-1 text-xs text-white">
            {monthName} status
          </div>
        </div>
        <div className="text-sm text-slate-700">{habit.description}</div>
        <div className="text-sm text-slate-700">
          {habit.startTime} - {habit.endTime}
        </div>
      </div>
      <div className="space-y-4 rounded-md p-4 shadow-md">
        <div className="space-y-2">
          {weeks.map((week, index) => (
            <Week weekData={week} key={index} />
          ))}
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-lime-500"></div>
            <div className="text-xs text-slate-500">Completed habit</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-gray-200"></div>
            <div className="text-xs text-slate-500">Skipped habit</div>
          </div>
        </div>
      </div>
    </div>
  );
};
