import React from "react";
import { Navbar } from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./component/Home";
import { Signup } from "./component/Signup";
import { Login } from "./component/Login";
import { UserAccount } from "./component/UserAccount";
import { MembershipWrapper } from "./component/Membership";
import { About } from "./component/AboutUs";
import { Classes } from "./component/Classes";
import { ProtectedRoute, ProtectedRouteUser } from "./component/ProtectedRoute";
import { Admin } from "./component/Admin";

import { Analytics } from "./component/admin/Analytics";

function App(): JSX.Element {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/classes" element={<Classes />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/membership" element={<MembershipWrapper />}></Route>
        <Route
          path="/useraccount"
          element={
            <ProtectedRouteUser>
              <UserAccount />
            </ProtectedRouteUser>
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
