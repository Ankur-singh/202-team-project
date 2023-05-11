import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosRequest } from "../AxiosRequest";
import jwt_decode from "jwt-decode";
import { type User } from "../types";

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = (): void => {
    // navigate("/useraccount");
  };

  const handleLoginSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axiosRequest.post(
        `/auth/login`,
        `grant_type=password&username=${encodeURI(email)}&password=${password}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization: "Basic Og==",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      const decoded: User = jwt_decode(response.data.access_token);
      localStorage.setItem("user", JSON.stringify(decoded));
      localStorage.setItem("token", response.data.access_token);
      if (decoded.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/useraccount");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <div className="flex w-[60%] flex-col p-4">
        <h1 className="flex items-center justify-center pb-8 text-5xl text-amber-500">
          Login
        </h1>
        <form
          className="px-8"
          onSubmit={(e): void => {
            void handleLoginSubmit(e);
          }}
        >
          <div className="mb-6 grid gap-6 md:grid-cols-1">
            <div className="mb-4">
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
            <div className="mb-6 grid gap-6 md:grid-cols-1">
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
              <button
                onClick={handleClick}
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-400 dark:focus:ring-orange-500 sm:w-auto"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
