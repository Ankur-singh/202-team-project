import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import { type ClassSchedule } from "../types";
import { axiosRequest } from "../AxiosRequest";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

interface Props {
  schedules: ClassSchedule[];
}

const Calendar: React.FC<Props> = ({ schedules }) => {
  const [alertMessage, setAlertMessage] = React.useState<string>("");

  // assuming that the schedules are sorted in ascending order by time
  const dates = schedules.reduce((acc: string[], schedule) => {
    const date = new Date(schedule.time).toISOString().substring(0, 10); // extract the date from the ISO string
    if (!acc.includes(date)) {
      acc.push(date);
    }
    return acc;
  }, []);

  const times = [];
  for (let hour = 8; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      times.push(`${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`);
    }
  }

  const enrollToClass = (id: string): void => {
    //   /members/enroll/{class_idx}
    void axiosRequest.patch(`/members/enroll/${id}`).then((res) => {
      console.log(res);
      setAlertMessage("Enrolled to class");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    });
  };

  return (
    <>
      {alertMessage.length  > 0&&
        <div className="amb-4 bg-green-200 p-2 text-green-700 absolute top-0 left-0 right-0 text-center">
          {alertMessage}
        </div>}
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
        <tr>
          <th className="p-3 bg-gray-200 font-bold text-gray-700 border border-gray-400">
            Time
          </th>
          {dates.map((date) => (
            <th
              key={date}
              className="p-3 bg-gray-200 font-bold text-gray-700 border border-gray-400"
            >
              {date}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {times.map((time) => (
          <tr key={time}>
            <td className="p-3 bg-gray-200 font-bold text-gray-700 border border-gray-400">
              {time}
            </td>
            {dates.map((date) => {
              const matchingSchedules = schedules.filter(
                (schedule) =>
                  new Date(schedule.time).toISOString().substring(0, 10) ===
                  date &&
                  new Date(schedule.time).toISOString().substring(11, 16) ===
                  time
              );
              if (matchingSchedules.length === 0) {
                return (
                  <td
                    key={`${date}-${time}`}
                    className="p-3 bg-white border border-gray-400"
                  />
                );
              }
              return (
                <td
                  key={`${date}-${time}`}
                  className="px-4 py-2 text-center bg-white border border-gray-400"
                >
                  {matchingSchedules.map((schedule) => (
                    <div
                      key={schedule._id}
                      className="p-2 m-1 bg-gray-100 border border-gray-300 rounded-lg"
                    >
                      <div className="font-bold text-gray-700">
                        {schedule.name}
                      </div>
                      <div className="text-gray-600">{schedule.location}</div>
                      <div className="text-gray-600">{`Enrollment: ${schedule.enrollment}`}</div>
                      <button className="px-2 py-1 mt-2 text-sm text-white bg-blue-500 rounded-lg" onClick={() => {
                        enrollToClass(schedule._id);
                      }}>
                        Enroll
                        </button>
                        </div>
                        ))}
                    </td>
                  );
                  })}
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;
