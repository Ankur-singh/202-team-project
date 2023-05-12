import React, { useEffect, useState } from "react";
import { axiosRequest } from "../AxiosRequest";
import { type Class, User, type UserDetails } from "../types";
import { Link } from "react-router-dom";

function formatTime(timeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const date = new Date(timeString);
  return date.toLocaleDateString("en-US", options);
}

function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

interface CardProps {
  _id: string;
  name: string;
  time: number;
  duration: number;
  instructor?: string | null;
  description?: string | null;
  location?: string | null;
}

function Card(classDetails: Class): JSX.Element {
  const { _id, name, time, duration, instructor, description, location } =
    classDetails;
  return (
    <div className="mx-auto w-[60%] overflow-hidden rounded-lg bg-white p-4 shadow-lg my-2">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{formatTime(time)}</p>
        <p className="text-gray-600">{formatDuration(duration)}</p>
        {instructor && (
          <p className="text-gray-600">Instructor: {instructor}</p>
        )}
        {description && <p className="text-gray-600">{description}</p>}
        {location && <p className="text-gray-600">Location: {location}</p>}
      </div>
    </div>
  );
}

export const Profile = ({ type }: { type: "user" | "admin" }): JSX.Element => {
  const [userProfile, setUserProfile] = useState<Partial<UserDetails>>({});

  useEffect(() => {
    void axiosRequest.get("/user").then((response) => {
      console.log(response.data);
      const data = response.data as UserDetails;
      setUserProfile(data);
    });
  }, [userProfile.user_email]);

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <img
          className="h-28 w-28 rounded-full"
          src={`https://i.pravatar.cc/299`}
          alt="profile"
        />
      </div>

      {userProfile && (
        <div className="mt-8 flex justify-center">
          <h1 className="text-xl">
            {userProfile.first_name} {userProfile.last_name}
          </h1>
        </div>
      )}

      {/*  Add button to signup for classes */}
      {type === "user" && (
        <Link to="/classes">
          <div className="mt-8 flex justify-center">
            <button className="rounded bg-amber-400 px-4 py-2 font-bold text-white hover:bg-amber-500">
              Sign up for classes
            </button>
          </div>
        </Link>
      )}

      {/*  Show the list of enrolled classes if userDetails.classes.length else show no classes */}
      {type === "user" && (userProfile as UserDetails).classes?.length > 0 && (
        <div className="mt-8 flex flex-col justify-center">
          <h1 className="text-center text-xl">Enrolled Classes</h1>
          {/* Display the classes in a card format with index number and name and description below the name */}
          {(userProfile as UserDetails).classes.map((classDetails, index) => (
            <Card {...classDetails} key={index} />
          ))}
        </div>
      )}
      {type === "user" && !userProfile?.classes?.length && (
        <div className="mt-8 flex justify-center">
          <h1 className="text-xl">No Classes</h1>
        </div>
      )}

      {type === "admin" && (
        <Link to="/signup">
          <div className="mt-8 flex justify-center">
            <button className="rounded bg-amber-400 px-4 py-2 font-bold text-white hover:bg-amber-500">
              Sign up new user
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};
