import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";


export default function PaymentPage() {
  const role = Cookies.get("role");
  const { caseID } = useParams();
  const location = useLocation();
  const amount = new URLSearchParams(location.search).get("amount");
  const userId = localStorage.getItem("userId");
  const [cardNo, setCardNo] = useState("");
  const [cve, setCve] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");


  // Regular expressions for validation
  const cardNoRegex = /^\d{16}$/; // 16 digits
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
  const cveRegex = /^\d{3}$/; // 3 digits

  const validateInputs = () => {
    if (!cardNoRegex.test(cardNo)) {
      alert("Please enter a 16-digit card number.");
      return false;
    }

    if (!expiryDateRegex.test(expiryDate)) {
      alert("Please enter expiry date in MM/YY format.");
      return false;
    }

    if (!cveRegex.test(cve)) {
      alert("Please enter a 3 digit CVE code.");
      return false;
    }

    return true; // All inputs are valid
  };


  // Get token from cookies or local storage
  const token = Cookies.get('token')

  const paymentPaid = () => {
    if (!validateInputs()) {
      return; // Exit function if inputs are invalid
    }

    const token = Cookies.get('token') || localStorage.getItem("token") 
    console.log(token);
    Axios.post("http://localhost:3001/paymentDonation", {
      userId: userId,
      caseID: caseID,
      amount: amount,
      cardNo: cardNo,
      cve: cve,
      expiryDate: expiryDate,
    },
    {
      headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          userid: userId
      },
    }
    )
      .then(() => {
        setShowModal(true);
        checkCase(); // Call checkCase after payment is successful
      })
      .catch((error) => {
        console.error("Error making payment:", error);
        if (error.response && error.response.data && error.response.data.message) {
          // Set the warning message
          alert(`Warning: ${error.response.data.message}`);

          // Show the warning dialog
          setShowWarning(true);
        } else {
          alert("Warning: Payment failed. Please try again.");

        }
      });
  };

  const checkCase = () => {
    const token = Cookies.get('token') || localStorage.getItem("token") 
    Axios.get(`http://localhost:3001/checkDonationCase/${caseID}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
        userid: userId
      },
  })
      .then((response) => {
        console.log("Response:", response.data);
        console.log("Data:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cases data:", error.response);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something else happened in making the request
          console.error("Error:", error.message);
        }
      });
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

    // Function to close the warning dialog
    const closeWarning = () => setShowWarning(false);

  return (
    <>
      {(role == "admin" || role == "user") && (
        <>
          <form
            className="p-5 mt-5"
            style={{
              border: "2px solid #ddd",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            <div className="mb-3">
              <h1>
                <center> Card Details  </center>
              </h1>
            </div>
            <div className="mb-3 my-4">
              <label htmlFor="inputName" className="form-label">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAmount"
                value={amount}
                readOnly // Add this attribute to make the input read-only
                required
                placeholder="Abu Ubaidah"
              />
            </div>

            <div className="mb-3 my-4">
              <label htmlFor="inputCardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCardNumber"
                value={cardNo}
                onChange={(event) => setCardNo(event.target.value)}
                required
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="mb-3 my-4">
              <label htmlFor="inputExpiryDate" className="form-label">
                Expiry Date
              </label>
              <input
                type="text"
                className="form-control"
                id="inputExpiryDate"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                required
                placeholder="MM/YY"
              />
            </div>

            <div className="mb-3 my-4">
              <label htmlFor="inputCVE" className="form-label">
                CVE
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCVE"
                value={cve}
                onChange={(event) => setCve(event.target.value)}
                required
                placeholder="123"
              />
            </div>

            <div className="mb-4 my-5">
              <center>
                <button
                  type="button"
                  onClick={paymentPaid}
                  className="btn btn-dark"
                >
                  Pay Now
                </button>
                <div className="my-5">
                  <p>
                    If you want to change the amount{" "}
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={`/donations/${caseID}`}
                    >
                      Go Back!
                    </Link>
                  </p>
                </div>
              </center>
            </div>
          </form>

          {/* Modal */}
          <div
            className={`modal ${showModal ? "show" : ""}`}
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  {/* Thank-you message */}
                  <h5 className="modal-title mb-3">Thank You!</h5>
                  <p className="mb-4">
                    Your payment was successful. Thank you for your donation!
                  </p>

                  {/* Button to go to Home */}
                  <Link to="/" className="btn btn-dark">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          {showModal && <div className="modal-backdrop show"></div>}


        </>
      )}
    </>
  );
}
