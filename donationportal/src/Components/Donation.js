import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { useParams } from "react-router-dom";

//Donstion Cases
export default function Donation() {
  const role = Cookies.get("role");
  let loaded = false
  const [amount, setAmount] = useState("");
  const userId = localStorage.getItem("userId");
  const { caseID } = useParams();
  let [listCase, setListCase] = useState({ status: "loading", data: {} });
  const [alertMessage, setAlertMessage] = useState("");
  const token = Cookies.get('token') || localStorage.getItem('token');

  const getdonation = async (caseID, token, userId) => {
    try {
      let response = await Axios.get(`http://localhost:3001/getdonationCase/${caseID}`, {
  
        headers: {
          Authorization: `Bearer ${token}`,
          userid: userId, // Use camelCase here
        },
      })
        if(response) {
          loaded= true;

          setListCase({ status: 200, data: response.data.data });
          console.log(listCase)
          
        }
    }catch (error) {
      console.error("Error fetching cases data:", error);
    }
  }

  useEffect(() => {
    if(listCase.status=== "loading")
    {
    getdonation(caseID, token, userId);
      
    }
  });


  const handleSubmit = (event) => {
    event.preventDefault();

    const remainingAmount = listCase.data.remainingAmount;

    // Check if the entered amount is greater than the remaining amount
    if (parseFloat(amount) > remainingAmount) {
      setAlertMessage(
        "We cannot receive extra money. Please enter a valid amount."
      );
      return;
    }

    // If the condition is met, proceed with the submission
    console.log(userId);
    console.log(caseID);
    console.log(amount);

    const Data = new FormData();
    Data.append("userId", userId);
    Data.append("caseID", caseID);
    Data.append("amount", amount);

    Axios.post("http://localhost:3001/userDonations", {
      userId: userId,
      caseID: caseID,
      amount: amount,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          userid: userId, // Use camelCase here
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        window.location.href = `/payment/${caseID}?amount=${amount}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {(role == "admin" || role == "user") && (
        <>
          <div className="container my-5">
            <div className="row">
              {listCase.data && (
                <div key={listCase.data.id} className="col-md-8">
                  <div className="card mb-3" style={{ maxWidth: "100%" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <div
                          style={{
                            width: "100%",
                            height: "330px", // Set a fixed height for the square image
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`http://localhost:3001/uploads/${listCase.data.image}`}
                            className="card-img-top"
                            alt={listCase.data.heading}
                            style={{
                              objectFit: "cover",
                              width: "200%",
                              height: "150%",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            {listCase.data.heading}
                          </h5>
                          <p className="card-text">
                            {listCase.data.description}
                          </p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              <b>Date Added :</b>{" "}
                              {moment(listCase.data.date).format("DD-MM-YYYY")}
                            </small>
                          </p>
                          <p className="card-text">
                            <small className="text-body-secondary"></small>
                          </p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              <b>Donated Amount: </b>
                              {listCase.data.totalPayment}
                            </small>
                          </p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              <b>Remaining Amount: </b>{" "}
                              {listCase.data.remainingAmount}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-4">
                <form
                  className="my-5"
                  onSubmit={handleSubmit}
                  style={{
                    border: "2px solid #ddd",
                    padding: "20px",
                    borderRadius: "12px",
                    maxWidth: "600px",
                    margin: "auto",
                  }}
                >
                  {/* Display alert message */}
                  {alertMessage && (
                    <div className="alert alert-danger" role="alert">
                      {alertMessage}
                    </div>
                  )}
                  <div className="col-12 my-3">
                    <label htmlFor="inputAmount" className="form-label">
                      How much amount do you donate?
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAmount"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      required
                      placeholder="100"
                    />
                  </div>
                  <div className="mb-4 my-5">
                    <center>
                      <button type="submit" className="btn btn-dark">
                        Payment
                      </button>
                    </center>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
