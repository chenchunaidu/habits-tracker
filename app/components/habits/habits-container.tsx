import React from "react";
import type { HabitProps } from "~/components/habits/habit";
import Habit from "~/components/habits/habit";

interface HabitsContainerProps {
  habits: HabitProps[];
  onChange: (index: string) => void;
}

export const HabitsContainer: React.FC<HabitsContainerProps> = ({
  habits,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {habits?.map(
        ({
          id,
          description,
          title,
          image,
          completed,
          createdAt,
          userId,
          endTime,
          startTime,
        }) => (
          <Habit
            description={description}
            title={title}
            image={image}
            id={id}
            key={id}
            completed={completed}
            createdAt={createdAt}
            userId={userId}
            onChange={() => {
              onChange(id);
            }}
            endTime={endTime}
            startTime={startTime}
          />
        )
      )}
    </div>
  );
};
