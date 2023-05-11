import { Navigate } from "react-router-dom";
import React from "react";
import { type User, UserDetails } from "../types";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}") as User;
  if (user.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const ProtectedRouteUser = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}") as User;
  if (user.role !== "Member") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
