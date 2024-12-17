import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function OngoingCasesAdmin() {
  const [listCases, setListCases] = useState([]);

  const afterDelete = useNavigate();

  const role = Cookies.get("role");

  const isAuthenticated = Cookies.get("role");

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllCases")
      .then((response) => {
        setListCases(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cases data:", error);
      });
  }, []);

  const deleteUsers = (id) => {
    Axios.post("http://localhost:3001/deleteUsers", { id })
      .then((response) => {
        console.log("success");
        afterDelete("/");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleDonateClick = (id) => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      window.location.href = "/login"; // Change this to your login route
    } else {
      window.location.href = `/donations/${id}`; // Corrected line
    }
  };

  return (
    <>
      <div className="container my-4">
        <center>
          <h3>Listed Cases</h3>
        </center>
      </div>
      {listCases.length === 0 ? (
        <p>No ongoing cases available.</p>
      ) : (
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
                    <b>Amount Needed:</b> ${caseItem.amount}/-
                  </p>
                  <p className="card-text">
                    <b>Date Added :</b>{" "}
                    {moment(caseItem.date).format("DD-MM-YYYY")}
                  </p>
                  <center>
                    <Link
                      className="btn btn-dark mx-2"
                      onClick={() => handleDonateClick(caseItem.id)}
                      disabled={!isAuthenticated}
                    >
                      Donate Now
                    </Link>
                    {role == "admin" && (
                      <button
                        type="submit"
                        onClick={() => deleteUsers(caseItem.id)}
                        className="btn btn-dark mx-2"
                      >
                        Delete
                      </button>
                    )}
                  </center>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
