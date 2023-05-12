import React from "react";
import Calendar from "./Calendar";
import { type ClassSchedule } from "../types";
import { axiosRequest } from "../AxiosRequest";

export const Classes = (): JSX.Element => {
  const [classesByDay, setClassesByDay] = React.useState<ClassSchedule[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isLoaded) {
      void axiosRequest.get("/classes").then((response) => {
        setClassesByDay(response.data);
        setIsLoaded(true);
      });
    }
  }, [isLoaded]);

  return (
    <div>
      <h1 className=" text-center text-3xl text-white">Classes</h1>
      <Calendar schedules={classesByDay} />
    </div>
  );
};
