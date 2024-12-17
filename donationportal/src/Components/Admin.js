import React, { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

//Add New Admin
export default function Admin() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const role = Cookies.get("role");

  const addAdmin = () => {
    // Check if the email is not empty
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    Axios.post("http://localhost:3001/newAdmin", {
      email: email,
    })
      .then((response) => {
        setSuccess("Successfully Added!");
        setError(null); // Clear any previous error
        setEmail("");
      })
      .catch((error) => {
        // Check if the error is due to the email already being an admin
        if (error.response && error.response.status === 400) {
          setError("Email is already an admin");
        } else {
          console.error("Error adding admin:", error);
          setError("Error adding admin");
        }
      });
  };

  return (
    <>
      {role === "admin" && (
        <div className="container my-3">
          <div className="card">
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="name@gmail.com"
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  onClick={addAdmin}
                  className="btn btn-dark btn-block"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
