import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { subMonths, getMonth, getDay } from "date-fns";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function GithubContributionTable({
  githubTableData: { years, contributions },
}: {
  githubTableData: GithubContributionResponse;
}) {
  console.log(years);
  const params = useSearchParams();
  const router = useRouter();
  const selectedYear = params?.get("selectedYear");
  return (
    <section>
      {years.map((year) => (
        <button
          key={year.year}
          className={`px-2 py-1 rounded-md mr-2 hover:bg-blue-400`}
          onClick={() => {
            router.push(`?selectedYear=${year.year}`, { scroll: false });
          }}
        >
          {year.year}
        </button>
      ))}
      <h2 className="text-3xl font-bold">Github Contribution Table</h2>
      <div className="max-w-full overflow-y-hidden overflow-x-auto">
        <table className="max-w-max border-separate border-spacing-[3px] overflow-hidden relative">
          <thead>
            {/* todo: render month names based on selected option */}
            {/* 1. should render months in order if a year specified like 2022
                2. should render months by starting from the same month as the current month if no year specified
                3. should render months as in the 2nd rule if the year specified is out of range of the data
            */}
            <tr className="h-[13px]">
              <td className="w-[28px]"></td>
              {selectedYear ? (
                months.map((month, index) => (
                  <td
                    key={month}
                    className={`${
                      index === 0 ? "pl-2" : ""
                    } text-xs font-bold text-gray-500 relative`}
                    colSpan={getColSpanValue(new Date(+selectedYear, index, 1))}
                  >
                    <span className="">{month}</span>
                  </td>
                ))
              ) : (
                <>
                  {subMonths(new Date(), 12).getMonth() === 0
                    ? months.map((month, index) => (
                        <td
                          key={month}
                          className={`${
                            index === 0 ? "pl-2" : ""
                          } text-xs font-bold text-gray-500`}
                        >
                          <span>{month}</span>
                        </td>
                      ))
                    : loopMonths(subMonths(new Date(), 12).getMonth()).map(
                        (month, index) => (
                          <td
                            key={month}
                            className={`${
                              index === 0 ? "pl-2" : ""
                            } text-xs font-bold text-gray-500`}
                          >
                            <span>{month}</span>
                          </td>
                        )
                      )}
                </>
              )}
            </tr>
          </thead>
        </table>
      </div>
    </section>
  );
}

function loopMonths(Idx: number) {
  let i = 0;
  const path = [];
  while (i < 12) {
    if (Idx === 12) {
      Idx = 0;
    }
    i++;
    path.push(months[Idx++]);
  }
  return path;
}

function getColSpanValue(date: Date) {
  // get the column count of the month,
  // every column starts with sunday, ends with saturday
  // loop thru the days of the given month and increment column count if the day is sunday or saturday
  // return the column count
  const month = getMonth(date);
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let colSpan = 0;
  for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
    const day = new Date(year, month, i).getDay();
    if (day === 0 || day === 6) {
      colSpan++;
    }
  }
  return colSpan;
}
