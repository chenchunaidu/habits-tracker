import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import React from "react";
import { requiredUser } from "~/lib/auth/auth";
import { getMonthlyHabitStatusByUserId } from "~/models/daily-habit.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const statusDate = new Date().toISOString().split("T")[0];
  const month = statusDate.split("-");
  month.pop();
  const monthlyStatus = await getMonthlyHabitStatusByUserId({
    userId: user.id,
    month: month.join("-"),
    habitId: params["habitId"] || "",
  });
  return { monthlyStatus };
};

export default function MonthlyReport() {
  const { monthlyStatus } = useLoaderData();
  console.log(monthlyStatus);
  return <div>MonthlyReport</div>;
}
