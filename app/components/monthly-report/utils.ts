export interface MonthlyReportDate {
  date: string;
  status: boolean;
}

function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

export function getMonthlyWeekWiseData() {
  const noOfDays = daysInThisMonth();
  const weeks = [];
  const now = new Date();
  const monthFirstDay = getFirstDayOfMonth(now.getFullYear(), now.getMonth());
  let week: (MonthlyReportDate | null)[] = [];
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
    week.push({
      date: `${i}`,
      status: false,
    });
    count += 1;
  }
  return weeks;
}
