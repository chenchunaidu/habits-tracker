import type { FC } from "react";
import React from "react";
import { getMonthlyWeekWiseData } from "./utils";
import type { MonthlyReportDate } from "./utils";

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
}

export const Month: FC<MonthProps> = ({ monthlyObj = {} }) => {
  const weeks = getMonthlyWeekWiseData(monthlyObj);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg"> Monthly report </div>
      <div className="space-y-2">
        {weeks.map((week, index) => (
          <Week weekData={week} key={index} />
        ))}
      </div>
    </div>
  );
};
