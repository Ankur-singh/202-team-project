import React from "react";
import "./WeekSchedule.css";

interface ClassInfo {
  name: string;
  location: string;
  timeSlot: string;
}

interface Props {
  classesByDay: ClassInfo[][];
}

const WeekSchedule: React.FC<Props> = ({ classesByDay }) => {
  return (
    <div className="week-schedule-container">
      <div className="week-schedule-header">
        <div className="day-header">Sunday</div>
        <div className="day-header">Monday</div>
        <div className="day-header">Tuesday</div>
        <div className="day-header">Wednesday</div>
        <div className="day-header">Thursday</div>
        <div className="day-header">Friday</div>
        <div className="day-header">Saturday</div>
      </div>
      <div className="week-schedule-body">
        {classesByDay.map((dayClasses, id1) => (
          <div className="day-schedule" key={id1}>
            {dayClasses.map((classInfo, id2) => (
              <div className="class-box" key={id2}>
                <div className="class-time">{classInfo.timeSlot}</div>
                <div className="class-name">{classInfo.name}</div>
                <div className="class-location">{classInfo.location}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekSchedule;
