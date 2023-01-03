import React from "react";

function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function getMonthlyWeekWiseData() {
  const noOfDays = daysInThisMonth();
  const weeks = [];
  const now = new Date();
  const monthFirstDay = getFirstDayOfMonth(now.getFullYear(), now.getMonth());
  let week = [];
  let count = 0;
  for (let i = 0; i < monthFirstDay.getDay(); i++) {
    week.push(null);
    count += 1;
  }
  for (let i = 1; i < noOfDays + 1; i++) {
    if (count % 7 === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(`${now.getFullYear()}-${now.getMonth() + 1}-${i}`);
    count += 1;
  }
  return weeks;
}

export default function Month() {
  const weeks = getMonthlyWeekWiseData();
  console.log(weeks);
  return <div>Month</div>;
}
