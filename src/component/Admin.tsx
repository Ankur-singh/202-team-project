import React from "react";
import { Profile } from "./Profile";
import MemberTable from "./member/MemberList";
import ClassesGraph from "./admin/ClassesGraph";

export const Admin = (): JSX.Element => {
  return (
    <div className="relative grid h-[calc(100vh-64px)] grid-cols-3">
      <div className="col-span-1">
        <Profile type="admin" />
      </div>
      <div className="col-span-2">
        <MemberTable />
      </div>
    </div>
  );
};
