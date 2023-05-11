import React from "react";
import home from "../images/home.jpg";

export const Home = (): JSX.Element => {
  return (
    <div>
      <div className="relative bg-gradient-to-b from-black to-slate-500">
        <img
          src={home}
          alt="home"
          className="h-screen w-full object-cover mix-blend-overlay"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <h1 className="pb-96 text-6xl font-normal text-teal-50">
            Intense Fitness
          </h1>
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <h2 className="font pb-48 text-2xl text-teal-50">
            Stronger Than Yesterday
          </h2>
        </div>
      </div>
    </div>
  );
};
