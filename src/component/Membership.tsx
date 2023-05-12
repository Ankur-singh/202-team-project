import React from "react";
import clsx from "clsx";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

interface MembershipCardProps {
  type: "gold" | "platinum" | "silver";
  price: number;
  facilities: string[];
}

const MembershipCard: React.FC<MembershipCardProps> = ({
                                                         type,
                                                         price,
                                                         facilities
                                                       }) => {
  const isPlatinum = type === "platinum";

  const cardClasses = clsx(
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "bg-white",
    "shadow-md",
    "rounded-md",
    "p-6",
    "w-72",
    "h-96",
    "transition-all",
    {
      "transform scale-100": isPlatinum,
      "transform scale-90": !isPlatinum
    }
  );

  const titleClasses = clsx("text-lg", "font-bold", "mb-4", {
    "text-gold": type === "gold",
    "text-platinum": type === "platinum",
    "text-silver": type === "silver"
  });

  const priceClasses = clsx("text-4xl", "mb-4", {
    "text-gold": type === "gold",
    "text-platinum": type === "platinum",
    "text-silver": type === "silver"
  });

  const facilityClasses = clsx("text-sm", "mb-1", {
    "text-gold": type === "gold",
    "text-platinum": type === "platinum",
    "text-silver": type === "silver"
  });

  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>{type} Membership</h3>
      <p className={priceClasses}>${price}</p>
      <div className="mb-8 flex flex-col items-center">
        <p className={facilityClasses}>Facilities:</p>
        {facilities.map((facility) => (
          <p key={facility} className={facilityClasses}>
            {facility}
          </p>
        ))}
      </div>
      <button
        className={clsx(
          "text-white",
          "font-semibold",
          "py-2",
          "px-4",
          "border",
          "rounded",
          "transition-all",
          {
            "bg-gold border-gold hover:text-gold hover:bg-transparent":
              type === "gold",
            "bg-platinum border-platinum hover:text-platinum hover:bg-transparent":
              type === "platinum",
            "bg-silver border-silver hover:text-silver hover:bg-transparent":
              type === "silver"
          }
        )}
      >
        Buy Membership
      </button>
    </div>
  );
};
const Membership: React.FC<MembershipCardProps> = ({
                                                     price,
                                                     facilities,
                                                     type
                                                   }) => {
  const getImportanceClassName = (): string => {
    switch (type) {
      case "platinum":
        return "scale-105 text-2xl";
      default:
        return "text-base";
    }
  };

  const importanceClassName = getImportanceClassName();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}") as User;
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        "m-12 flex h-96 w-72 flex-col items-center justify-between rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-6 text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg",
        importanceClassName
      )}
    >
      <h3 className={clsx("font-bold uppercase")}>{type}</h3>
      <div className="text-2xl font-bold text-white">{`$${price}/month`}</div>
      <ul className="text-sm text-gray-600">
        {facilities.map((facility) => (
          <li key={facility} className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-2 h-4 w-4 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M18.7 5.3a.999.999 0 00-1.41 0l-8.39 8.39-3.7-3.7a.999.999 0 10-1.41 1.41l4.12 4.12c.19.18.45.29.7.29.26 0 .52-.1.71-.29l9.1-9.1a.999.999 0 000-1.41z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-white">{facility}</h1>
          </li>
        ))}
      </ul>
      {user.role === "Admin" && <button className="mt-4 rounded-md bg-cyan-400 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={() => navigate("/signup")}>
        Sign Up
       </button>}
    </div>
  );
};

export const MembershipWrapper: React.FC = () => {
  return (
    <>
      <h1 className="bg-black to-slate-700 text-center text-5xl text-amber-500 pt-8"> Memberships</h1>
      <div
        className="flex h-[calc(100vh-100px)] w-full items-center justify-center bg-gray-100 bg-gradient-to-b from-black to-slate-700">
        <div className="flex items-center justify-center">
          <Membership
            type="gold"
            price={50}
            facilities={[
              "Full Access to Gym",
              "Cardio Equipment",
              "Strength Equipment",
              "Locker Rooms"
            ]}
          />
          <Membership
            type="platinum"
            price={100}
            facilities={[
              "Full Access to Gym",
              "Cardio Equipment",
              "Strength Equipment",
              "Locker Rooms",
              "Sauna",
              "Swimming Pool"
            ]}
          />
          <Membership
            type="silver"
            price={25}
            facilities={[
              "15 Days Free",
              "Full Access to Gym",
              "Cardio Equipment",
              "Strength Equipment"
            ]}
          />
        </div>
      </div>
    </>
  );
};
