import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requiredUser } from "~/lib/auth/auth";
import { getHabitsByUserIdAlongWithStatus } from "~/models/habit.server";
import { Progress } from "~/components/common/progress";
import { HabitsContainer } from "~/components/habits/habits-container";
import type { HabitProps } from "~/components/habits/habit";
import { createHabitStatus } from "~/models/daily-habit.server";
import HomeContainer from "~/components/home/home-container";
import Empty from "~/components/common/empty";

interface LoaderResponse {
  habits: HabitProps[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getHabitsByUserIdAlongWithStatus(user.id);
  return { habits: data };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredUser(request);
  let formData = await request.formData();
  let habitId = formData.get("habitId");
  if (habitId && typeof habitId === "string") {
    const completed = formData.get("habitStatus");
    await createHabitStatus({
      userId: user.id,
      habitId,
      completed: completed ? true : false,
    });
  }
  return { habitId };
};

export default function Homepage() {
  const { habits } = useLoaderData<LoaderResponse>();

  const completedHabits = habits.filter((habit) => habit.completed);
  const inCompleteHabits = habits.filter((habit) => !habit.completed);

  return (
    <HomeContainer header="Habits" addLink="/home/habits/new">
      {habits?.length ? (
        <div className="space-y-2">
          <Progress
            progress={(completedHabits?.length / (habits?.length || 1)) * 100}
          >
            <div className="text-sm text-slate-700">
              Completed{" "}
              <span className="font-semibold text-black">
                {completedHabits?.length} / {habits?.length}
              </span>{" "}
              tasks
            </div>
          </Progress>
          <HabitsContainer habits={inCompleteHabits} />
          {completedHabits.length ? (
            <div className="text-slate-700">Completed habits</div>
          ) : (
            <div />
          )}

          <HabitsContainer habits={completedHabits} />
        </div>
      ) : (
        <Empty
          buttonLabel="Add new habit"
          buttonLink="/home/habits/new"
          label="You have no habits"
        />
      )}
    </HomeContainer>
  );
}
