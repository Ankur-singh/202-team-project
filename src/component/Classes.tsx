import React from "react";
import Calendar from "./Calendar";
import { type ClassSchedule } from "../types";
import { axiosRequest } from "../AxiosRequest";

export const Classes = (): JSX.Element => {
  const [classesByDay, setClassesByDay] = React.useState<ClassSchedule[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>("San Jose");

  React.useEffect(() => {
    if (!isLoaded) {
      void axiosRequest.get(`/classes?location=${location}`).then((response) => {
        setClassesByDay(response.data);
        setIsLoaded(true);
      });
    }
  }, [isLoaded, location]);

  return (
    <div>
      <h1 className=" text-center text-3xl text-white">Classes</h1>
      <select className="block mx-auto my-4" onChange={(e) => {
        console.log(e.target.value);
        setIsLoaded(false)
        setLocation(e.target.value);
      }}>
        <option value="San Jose">San Jose</option>
        <option value="San Francisco">San Francisco</option>
        <option value="Santa Clara">Santa Clara</option>
        <option value="Santa Cruz">Santa Cruz</option>
      </select>
      <Calendar schedules={classesByDay} />
    </div>
  );
};
