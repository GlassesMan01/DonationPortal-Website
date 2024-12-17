import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [errorRecaptha, setErrorRecaptha] = useState(null);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        handleRecaptchaVerify();
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  //Replace Recaptcha Site key in this
  const handleRecaptchaVerify = () => {
    const recaptchaElement = document.getElementById("recaptcha");
    if (recaptchaElement && recaptchaElement.childNodes.length === 0) {
      window.grecaptcha.render("recaptcha", {
        sitekey: "SITE KEY HERE",
        callback: (token) => {
          setRecaptchaToken(token);
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setErrorRecaptha("Please verify reCAPTCHA.");
      return;
    }

    const data = {
      email,
      password,
    };

    // Send data to the server
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Login failed: ${response.statusText}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log("Login successful:", response.token);

        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.isAdmin ? "admin" : "user");
        localStorage.setItem("userId", response.userId);

        console.log(response.isAdmin);

        if (response.isAdmin) {
          Cookies.set("role", "admin", { expires: 7 });
          window.location.href = "/admin";
        } else {
          // Redirect to the user page
          Cookies.set("role", "user", { expires: 7 });
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error.message);

        // Set the error state to display the error message
        setError("Invalid credentials");
      });
  };


  return (
    <>
      <div className="container mt-5">
        <form
          onSubmit={handleSubmit}
          className="p-5"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "auto",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div className="mb-3">
            <h1 className="text-center">Login</h1>
          </div>

          {/* Display error message */}
          {error && <div className="alert alert-danger">{error}</div>}
          {errorRecaptha && <div className="alert alert-danger">{errorRecaptha}</div>}


          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Add reCAPTCHA widget */}
          <div className="mb-3 d-flex justify-content-center" id="recaptcha" data-callback={handleRecaptchaVerify} data-sitekey="6LepcNEpAAAAADHtsfiO_pU2aYB_WFoBYGPiJt2s"></div>

          <div className="mb-4 my-4">
            <center>
              <button type="submit" className="btn btn-dark">
                Sign in
              </button>
            </center>
          </div>

          <div className="mb-3">
            <center>
              <Link to="/signup" className="btn-link">
                Sign up Now!
              </Link>
              <p>Become a Donor Now and Make a Change!</p>
            </center>
          </div>
        </form>
      </div>
      <div className="container">
        <p></p>
      </div>
    </>
  );
}
