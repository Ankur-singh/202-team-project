import React, { useState } from "react";
import user from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { Profile } from "./Profile";
import { Activity } from "./Activity";
import { WorkoutHistory } from "./WorkoutHistory";
import { Tab } from "./Tab";

export const UserAccount = (): JSX.Element => {
  const [workoutType, setWorkoutType] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");

  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate("/classes");
  };
  const handleWorkoutType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setWorkoutType(event.target.value);
  };

  const handleWorkoutDuration = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setWorkoutDuration(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(workoutType, workoutDuration);
    setWorkoutType("");
    setWorkoutDuration("");
  };

  return (
    <div className="relative grid h-[calc(100vh-64px)] grid-cols-3">
      <div className="col-span-1">
        <Profile type="user" />
      </div>
      <div className="col-span-2">
        <Activity />
        <Tab
          tabs={[
            { name: "Sessions", content: <WorkoutHistory /> },
            // {
            //   name: "Summary",
            //   content: (
            //     <div className="mx-auto">
            //       <h2 className="mb-4 mt-8 text-center text-xl font-bold">
            //         Graphs
            //       </h2>
            //     </div>
            //   ),
            // },
          ]}
        />
      </div>
    </div>
  );
};
