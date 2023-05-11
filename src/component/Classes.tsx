import React from "react";
import WeekSchedule from "./WeekSchedule";

const classesByDay = [
  [
    { name: "Yoga", location: "Studio 1", timeSlot: "7:00 am" },
    { name: "Pilates", location: "Studio 2", timeSlot: "8:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "9:00 am" },
    { name: "Spin", location: "Studio 1", timeSlot: "11:00 am" },
  ],
  [
    { name: "Pilates", location: "Studio 2", timeSlot: "8:00 am" },
    { name: "Yoga", location: "Studio 1", timeSlot: "10:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "12:00 pm" },
    { name: "Spin", location: "Studio 1", timeSlot: "1:00 pm" },
  ],
  [
    { name: "Yoga", location: "Studio 1", timeSlot: "9:00 am" },
    { name: "Pilates", location: "Studio 2", timeSlot: "11:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "2:00 pm" },
    { name: "Spin", location: "Studio 1", timeSlot: "3:00 pm" },
  ],
  [
    { name: "Yoga", location: "Studio 1", timeSlot: "8:00 am" },
    { name: "Pilates", location: "Studio 2", timeSlot: "10:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "12:00 pm" },
    { name: "Spin", location: "Studio 1", timeSlot: "1:00 pm" },
  ],
  [
    { name: "Yoga", location: "Studio 1", timeSlot: "7:00 am" },
    { name: "Pilates", location: "Studio 2", timeSlot: "8:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "9:00 am" },
    { name: "Spin", location: "Studio 1", timeSlot: "11:00 am" },
  ],
  [
    { name: "Pilates", location: "Studio 2", timeSlot: "8:00 am" },
    { name: "Yoga", location: "Studio 1", timeSlot: "10:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "12:00 pm" },
    { name: "Spin", location: "Studio 1", timeSlot: "1:00 pm" },
  ],
  [
    { name: "Yoga", location: "Studio 1", timeSlot: "9:00 am" },
    { name: "Pilates", location: "Studio 2", timeSlot: "11:00 am" },
    { name: "Zumba", location: "Studio 3", timeSlot: "2:00 pm" },
    { name: "Spin", location: "Studio 1", timeSlot: "3:00 pm" },
  ],
];

export const Classes = (): JSX.Element => {
  return (
    <div>
      <h1 className="bg-black text-center text-3xl text-white">Classes</h1>
      <WeekSchedule classesByDay={classesByDay} />
    </div>
  );
};
