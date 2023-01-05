import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import React from "react";
import { Month } from "~/components/monthly-report/month";
import { requiredUser } from "~/lib/auth/auth";
import { getMonthlyHabitStatusByUserId } from "~/models/daily-habit.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const statusDate = new Date().toISOString().split("T")[0];
  const month = statusDate.split("-");
  month.pop();
  const { monthlyStatus, habit } = await getMonthlyHabitStatusByUserId({
    userId: user.id,
    month: month.join("-"),
    habitId: params["habitId"] || "",
  });

  return { monthlyStatus, habit };
};

export default function MonthlyReport() {
  const { monthlyStatus, habit } = useLoaderData();

  return (
    <div className="rounded-md bg-white p-6">
      <Month monthlyObj={monthlyStatus} habit={habit} />
    </div>
  );
}
