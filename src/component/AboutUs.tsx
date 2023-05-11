import React from "react";
import about1 from "../images/about1.jpg";
import about2 from "../images/about2.jpg";

export const About = (): JSX.Element => {
  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-to-b from-black to-gray-900">
      <h1 className="pt-20 text-center text-5xl text-amber-500">About Us</h1>
      <div className="flex flex-row">
        <div className="flex w-[50%] flex-col items-center justify-center">
          <p className="p-12 text-center text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit
            scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
            tristique senectus. Dignissim suspendisse in est ante in nibh mauris
            cursus mattis. Ultrices tincidunt arcu non sodales neque sodales ut
            etiam. Et malesuada fames ac turpis egestas integer eget.
          </p>
          <img
            src={about1}
            alt="trainer helping"
            className="h-auto max-w-md rounded-3xl p-2 drop-shadow-xl"
          />
        </div>
        <div className="flex w-[50%] flex-col items-center justify-center">
          <p className="justify-center p-12 text-center text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit
            scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
            tristique senectus. Dignissim suspendisse in est ante in nibh mauris
            cursus mattis. Ultrices tincidunt arcu non sodales neque sodales ut
            etiam. Et malesuada fames ac turpis egestas integer eget.
          </p>
          <img
            src={about2}
            alt="trainer helping"
            className="h-auto max-w-md rounded-3xl p-2 drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};
