import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/common/button";
import { requiredUser } from "~/lib/auth/auth";
import { getHabitsByUserIdAlongWithStatus } from "~/models/habit.server";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Progress } from "~/components/common/progress";
import { HabitsContainer } from "~/components/habits/habits-container";
import type { HabitProps } from "~/components/habits/habit";
import { createHabitStatus } from "~/models/daily-habit.server";
import NavFloater from "~/components/habits/nav-floater";
import HomeContainer from "~/components/home/home-container";

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
      ) : (
        <div className="flex w-full flex-col items-center justify-center space-y-3">
          <TrashIcon className="h-24 w-24 text-slate-200"></TrashIcon>
          <div className="text-slate-500">You have no habits</div>
          <Link to="/home/habits/new">
            <Button>Add new habit</Button>
          </Link>
        </div>
      )}

      <HabitsContainer habits={inCompleteHabits} />
      {completedHabits.length ? (
        <div className="text-slate-700">Completed habits</div>
      ) : (
        <div />
      )}

      <HabitsContainer habits={completedHabits} />
      <NavFloater />
    </HomeContainer>
  );
}
