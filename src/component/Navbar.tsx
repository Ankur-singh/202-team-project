import React from "react";
import { Link } from "react-router-dom";
import { type User } from "../types";

export const Navbar = (): JSX.Element => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}") as User;
  return (
    <div className="bg-black">
      <ul className="mx-auto flex gap-10 pb-4 pl-9 pr-9 pt-6 text-base text-white">
        <Link to="/">
          <li className="transition delay-150 hover:text-amber-500">Home</li>
        </Link>
        <div className="ml-auto flex gap-10 pr-9 text-base text-white">
          <Link to="/about">
            <li className="transition delay-150 hover:text-amber-500">
              About Us
            </li>
          </Link>
          <Link to="/membership">
            <li className="transition delay-150 hover:text-amber-500">
              Membership
            </li>
          </Link>
          <Link to="/classes">
            <li className="transition delay-150 hover:text-amber-500">
              Classes
            </li>
          </Link>
          {/* <Link to="/signup"> */}
          {/*  <li className="transition delay-150 hover:text-amber-500"> */}
          {/*    Signup */}
          {/*  </li> */}
          {/* </Link> */}
          {!user.sub ? (
            <Link to="/login">
              <li className="transition delay-150 hover:text-amber-500">
                Login
              </li>
            </Link>
          ) : (
            <></>
          )}

          {user.role === "Admin" ? (
            <Link to="/admin/analytics">
              <li className="transition delay-150 hover:text-amber-500">
                Analytics
              </li>
            </Link>
          ) : (
            <></>
          )}

          {user.role === "Admin" ? (
            <Link to="/admin">
              <li className="transition delay-150 hover:text-amber-500">
                Profile
              </li>
            </Link>
          ) : (
            <></>
          )}

          {user.role === "Member" ? (
            <Link to="/useraccount">
              <li className="transition delay-150 hover:text-amber-500">
                Profile
              </li>
            </Link>
          ) : (
            <></>
          )}

          {user.sub && (
            <li
              className="transition delay-150 hover:text-amber-500"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};
