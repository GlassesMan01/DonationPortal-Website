import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

export default function AllUsers() {
  const [userList, setUserList] = useState([]);

  const role = Cookies.get("role");

  useEffect(() => {
    Axios.get("http://localhost:3001/donorUsers")
      .then((response) => {
        setUserList(response.data.data);
        console.log("Donor Users");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (!Array.isArray(userList)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container my-3">
        {role == "admin" && (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Zip Code</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.street}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td>{user.zip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
