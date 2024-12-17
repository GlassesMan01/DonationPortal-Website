import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

//Record of User Donations
export default function DonationRecord() {
  const role = Cookies.get("role");
  const [listCase, setListCase] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Axios.get(`http://localhost:3001/getUserDonations/${userId}`)
      .then((response) => {
        setListCase(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cases data:", error);
      });
  }, [userId]);

  return (
    <>
      {(role == "admin" || role == "user") && (
        <div className="container mt-5">
          <h1 className="text-center mb-4">Donation Records</h1>

          {listCase.length === 0 ? (
            <p>No donation records available.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Case Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {listCase.map((caseItem) => (
                  <tr key={caseItem.donationId}>
                    <td>{caseItem.heading}</td>
                    <td>${caseItem.amount}</td>
                    <td>{caseItem.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}
