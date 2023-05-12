import React, { useEffect, useState } from "react";
import { type UserDetails } from "../../types";
import { axiosRequest } from "../../AxiosRequest";

const MemberTable: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [userDetailsList, setUserDetailsList] = useState<UserDetails[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const filteredData = userDetailsList.filter((user) =>
    user.user_email.toLowerCase().includes(query.toLowerCase())
  );

  const handleCheckIn = (user: UserDetails): void => {
    void axiosRequest.post(`/employees/check-in/${user.id}`).then((res) => {
      console.log(`Checked in ${user.user_email}`);
      setAlertMessage(`Checked in ${user.user_email}`);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    });
  };

  const handleCheckOut = (user: UserDetails): void => {
    void axiosRequest.post(`/employees/check-out/${user.id}`).then((res) => {
      console.log(`Checked out ${user.user_email}`);
      setAlertMessage(`Checked out ${user.user_email}`);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    });
  };

  useEffect(() => {
    if (!isLoaded) {
      void axiosRequest.get("/admin/users").then((response) => {
        setUserDetailsList(response.data);
        setIsLoaded(true);
      });
    }
  }, [isLoaded]);

  // const handleCheckIn = (user: UserDetails): void => {
  //   // TODO: Implement check-in functionality
  //   console.log(`Checked in ${user.user_email}`);
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      {alertMessage && (
        <div className="mb-4 bg-green-200 p-2 text-green-700">
          {alertMessage}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search by user email"
          className="w-full rounded-md border-2 border-gray-200 bg-gray-100 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">User Email</th>
              <th className="px-4 py-2 text-left">Membership Plan</th>
              <th className="px-4 py-2 text-left">Free Days</th>
              <th className="px-4 py-2 text-left">Check-In</th>
              <th className="px-4 py-2 text-left">Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id} className="border border-gray-300">
                <td className="px-4 py-2">{user.user_email}</td>
                <td className="px-4 py-2">{user.membership_plan}</td>
                <td className="px-4 py-2">{user.free_days}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      handleCheckIn(user);
                    }}
                    className="rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700"
                  >
                    Check In
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      handleCheckOut(user);
                    }}
                    className="rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700"
                  >
                    Check Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
