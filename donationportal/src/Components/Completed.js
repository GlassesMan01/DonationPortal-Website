import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

//Showing Completed Cases
export default function Completed() {
  const [listCases, setListCases] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getCompletedCases")
      .then((response) => {
        setListCases(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cases data:", error);
      });
  }, []);

  const handleDonateClick = (id) => {
    // Handle click for donating, you may want to redirect to a donation page
    console.log(`Donate clicked for case ID: ${id}`);
  };

  const deleteUsers = (id) => {
    // Handle case deletion, you may want to show a confirmation modal
    console.log(`Delete clicked for case ID: ${id}`);
  };

  return (
    <div>
      <div className="container my-4">
        <center>
          <h3>Successfuly Completed Cases</h3>
        </center>
      </div>
      <div className="container row row-cols-1 row-cols-md-3 g-4 h-100">
        {listCases.map((caseItem) => (
          <div className="col" key={caseItem.id}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:3001/uploads/${caseItem.image}`}
                className="card-img-top"
                alt={caseItem.heading}
              />
              <div className="card-body">
                <h5 className="card-title">{caseItem.heading}</h5>
                <p className="card-text">{caseItem.description}</p>
                <p className="card-text">
                  <b>Amount Recived:</b> ${caseItem.total_payments}/-
                </p>
                <p className="card-text">
                  <b>Case Closing Date:</b>{" "}
                  {moment(caseItem.date).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
