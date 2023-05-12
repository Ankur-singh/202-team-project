import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosRequest } from "../AxiosRequest";

export const Signup = (): JSX.Element => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  const handleSignUpSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const response = await axiosRequest.post("/employees/enroll", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-row items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <div className="flex w-[60%] flex-col p-4">
        <h1 className="flex items-center justify-center pb-12 text-5xl text-amber-500">
          Join Us
        </h1>
        <h1 className="pb-10 text-3xl text-orange-400">Sign Up</h1>
        <form
          onSubmit={(e) => {
            void handleSignUpSubmit(e);
          }}
        >
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="John"
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Doe"
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
                required
              />
            </div>

          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
            <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="john.doe@company.com"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            </div>
            <div>
            {/*  Dropdown */}
              <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
                Member Type
              </label>
              <select
                id="memberType"
                >
                <option value="free">Free</option>
                <option value="gold">Gold</option>
                <option value="platnum">Platinum</option>
              </select>
            </div>

          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="mb-6">
              <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="•••••••••"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-6">
              <label className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                value={confirmPassword}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="•••••••••"
                onChange={(event) => {
                  setConfirm(event.target.value);
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-400 dark:focus:ring-orange-500 sm:w-auto"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};
