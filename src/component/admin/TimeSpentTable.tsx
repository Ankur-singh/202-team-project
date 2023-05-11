import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import { axiosRequest } from "../../AxiosRequest";

dayjs.extend(relativeTime);
dayjs.locale("en");

interface User {
  email?: string;
  check_in: string;
  check_out: string;
  total_time: number;
}

type TimeSpent = Record<string, User>;

const TimeSpentTable: React.FC = () => {
  const [timeSpent, setTimeSpent] = useState<TimeSpent>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortedData, setSortedData] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // type of user key
  const [sortColumn, setSortColumn] =
    useState<keyof (User & { email: string })>("email");

  useEffect(() => {
    setIsLoading(true);
    axiosRequest
      .get("/analytics/time-spent?location=all&date_range=all")
      .then((response) => {
        setTimeSpent(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("MMM DD, YYYY h:mm A");
  };

  const formatTime = (totalTime: number): string => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = Math.floor(totalTime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const sortedArr = Object.keys(timeSpent).map((key) => ({
      email: key,
      ...timeSpent[key],
    }));
    console.log(sortColumn, sortOrder);
    sortedArr.sort((a, b) =>
      sortOrder === "asc"
        ? a[sortColumn] > b[sortColumn]
          ? 1
          : -1
        : b[sortColumn] > a[sortColumn]
        ? 1
        : -1
    );
    setSortedData(sortedArr);
    console.log(sortedArr[0]);
  }, [timeSpent, sortOrder, sortColumn]);

  const toggleSortOrder = (): void => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    console.log(sortedData, sortOrder, sortColumn);
  }, [sortedData]);

  return (
    <div className="relative max-h-[450px] overflow-scroll">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th
                onClick={() => {
                  setSortColumn("email");
                  toggleSortOrder();
                }}
                className="cursor-pointer px-4 py-2 text-left"
              >
                Email
              </th>
              <th
                onClick={() => {
                  setSortColumn("check_in");
                  toggleSortOrder();
                }}
                className="cursor-pointer px-4 py-2 text-left"
              >
                Check In
              </th>
              <th
                onClick={() => {
                  setSortColumn("check_out");
                  toggleSortOrder();
                }}
                className="cursor-pointer px-4 py-2 text-left"
              >
                Check Out
              </th>
              <th
                onClick={() => {
                  setSortColumn("total_time");
                  toggleSortOrder();
                }}
                className="cursor-pointer px-4 py-2 text-left"
              >
                Total Time
              </th>
            </tr>
          </thead>
          <tbody className="overflow-scroll pt-16">
            {sortedData.map((user) => {
              const checkIn = formatDate(user.check_in);
              const checkOut = formatDate(user.check_out);
              const totalTime = formatTime(user.total_time);
              return (
                <tr key={user.email} className="border border-gray-300">
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{checkIn}</td>
                  <td className="px-4 py-2">{checkOut}</td>
                  <td className="px-4 py-2">{totalTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeSpentTable;
