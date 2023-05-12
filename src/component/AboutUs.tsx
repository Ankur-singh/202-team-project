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
          {/*  Gym description with locations at San Jose, San Fransisco, Santa Clara, Santa Cruz */}
            Our gym was founded in 2021 and we have been providing great service to our customers since then.
            We have locations in San Jose, San Fransisco, Santa Clara, and Santa Cruz.
            We have a wide variety of equipment and classes to choose from.
            We have a great team of trainers that are ready to help you achieve your fitness goals.
            Sign up today and get a 15 day free trial!

          </p>
          <img
            src={about1}
            alt="trainer helping"
            className="h-auto max-w-md rounded-3xl p-2 drop-shadow-xl"
          />
        </div>
        <div className="flex w-[50%] flex-col items-center justify-center">
          <p className="justify-center p-12 text-center text-white">
          {/*  Facilities available at gym */}
            We have a wide variety of equipment and facilities available for our customers.
            We have a wide variety of equipment to help you achieve your goals.
            We also have personal trainers available to help you with your fitness journey.
            Come sign up today!
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
