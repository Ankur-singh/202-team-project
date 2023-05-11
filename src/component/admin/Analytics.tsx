import React from "react";
import ClassesGraph from "./ClassesGraph";
import TimeSpentTable from "./TimeSpentTable";
import EnrollmentGraph from "./EnrollmentGraph";
import NumClassesGraph from "./NumClasses";
import ClassPieChart from "./ClassPieChart";

export const Analytics = (): JSX.Element => {
  return (
    <>
      <h1 title="Analytics" className="mt-4 text-center text-4xl">
        Analytics
      </h1>
      <div className="relative mt-12 grid h-[calc(100vh-64px)] grid-cols-12">
        <div className="col-span-6 p-8">
          <ClassesGraph />
        </div>
        <div className="col-span-6 p-8">
          <TimeSpentTable />
        </div>
        <div className="col-span-6 p-8">
          <EnrollmentGraph />
        </div>
        <div className="col-span-6 p-8">
          <NumClassesGraph />
        </div>
        <div className="col-span-6 p-8">
          <ClassPieChart />
        </div>
      </div>
    </>
  );
};
