import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

//Showing Exsisting Admins
export default function ExistingAdmin() {
  const [userList, setUserList] = useState([]);
  const [notAdmins, setNotAdmins] = useState([]);

  const role = Cookies.get("role");

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllAdmins")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once (on mount)

  useEffect(() => {
    Axios.get("http://localhost:3001/getAdminsNotInSignup")
      .then((response) => {
        setNotAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
      <div className="container my-3">
        {role == "admin" && (
          <>
            <div>
              <h5>Exsisting Admins:</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Zip Code</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, key) => (
                    <tr key={key}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td>{user.zip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <b>These Admins Exsists But Not start Working: </b>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {notAdmins.map((user, key) => (
                    <tr key={key}>
                      <td>{user.email}</td>
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
