import React, { useState, useEffect } from "react";

const WORKOUT_OPTIONS: string[] = [
  "Treadmill",
  "Cycling",
  "Stair Machine",
  "Weight Training",
];

type Workout = (typeof WORKOUT_OPTIONS)[number];

export function Activity(): JSX.Element {
  const [workout, setWorkout] = useState<Workout>("");
  const [startTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null);

  function startTimer(): void {
    setStartTime(new Date());
    setTimerId(
      window.setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000)
    );
  }

  function stopTimer(): void {
    if (timerId !== null) {
      window.clearInterval(timerId);
      setTimerId(null);
    }
  }

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="mx-auto mt-8 px-48 py-8">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <label
            htmlFor="workout"
            className="mb-4 text-center text-3xl font-semibold text-gray-600"
          >
            Workout Tracker
          </label>
          <select
            id="workout"
            className="rounded-lg border border-gray-400 px-4 py-2 font-semibold text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
            value={workout}
            onChange={(event) => {
              setWorkout(event.target.value);
            }}
          >
            <option value="">Select a workout</option>
            {WORKOUT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex flex-col">
          <label
            htmlFor="start-time"
            className="mb-2 text-sm font-semibold text-gray-600"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            id="start-time"
            className="rounded-lg border border-gray-400 px-4 py-2 font-semibold text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
            value={startTime.toISOString().substr(0, 16)}
            onChange={(event) => {
              setStartTime(new Date(event.target.value));
            }}
          />
        </div>
        <div className="flex justify-center">
          {timerId === null ? (
            <button
              className="mr-4 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              onClick={() => {
                startTimer();
              }}
            >
              Start
            </button>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-semibold">{elapsedTime} seconds</h3>
              <button
                className="mx-auto rounded-lg bg-red-500 px-4 py-2 text-center font-semibold text-white hover:bg-red-700"
                onClick={() => {
                  stopTimer();
                }}
              >
                Stop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
