import React, { useEffect, useState } from "react";
import { axiosRequest } from "../AxiosRequest";
import { type WorkoutDetails } from "../types";

export const WorkoutHistory = (): JSX.Element => {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutDetails[]>([]);
  const [workoutHistoryLoaded, setWorkoutHistoryLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!workoutHistoryLoaded) {
      void axiosRequest.get("/members/activities").then((response) => {
        setWorkoutHistory(response.data);
        setWorkoutHistoryLoaded(true);
      });
    }
  }, [workoutHistoryLoaded]);

  return (
    <div className="">
      <h2 className="mb-4 mt-8 text-center text-xl font-bold">
        Workout Sessions
      </h2>
      {workoutHistory.map((session) => {
        const startTime = new Date(session.start_time);
        const endTime = new Date(session.end_time);
        const duration = Math.round(
          (endTime.getTime() - startTime.getTime()) / 60000
        );
        const formattedStartTime = startTime.toLocaleString();
        const formattedEndTime = endTime.toLocaleString();
        return (
          <div
            key={session._id}
            className="mb-4 flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow-lg"
          >
            <div className="mb-2 flex flex-col items-start">
              <h3 className="mb-2 text-lg font-semibold">{session.name}</h3>
              <div className="flex items-center text-gray-500">
                <span>{formattedStartTime}</span>
                <span className="ml-2 mr-2">&rarr;</span>
                <span>{formattedEndTime}</span>
                <span className="ml-4">({duration} min)</span>
              </div>
            </div>
            <div className="flex items-start text-gray-500">
              <span>{session.location}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
