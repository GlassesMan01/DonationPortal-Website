import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [error, setError] = useState("");


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


  const signUpUsers = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate inputs
    if (!validateInputs()) {
      return; // Exit function if inputs are invalid
    }

    if (!recaptchaToken) {
      setError("Please verify reCAPTCHA.");
      return;
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult === true) {
      Axios.post("http://localhost:3001/create", {
        name,
        email,
        street,
        city,
        state,
        zip,
        password,
      }).then(() => {
        console.log("success");
        window.location.href = "/login";
      });
    } else {
      setPasswordError(passwordValidationResult);
    }
  };



  const validateInputs = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
    const streetRegex = /^[A-Za-z0-9\s,#.]+$/; // Letters, numbers, spaces, comma, hash, period
    const cityStateRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    const zipRegex = /^\d+$/; // Only numbers

    if (!nameRegex.test(name)) {
      setError("Name should only contain letters and spaces.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!streetRegex.test(street)) {
      setError("Street address should only contain letters, numbers, spaces and these characters(',' '#' '.').");
      return false;
    }

    if (!cityStateRegex.test(city) || !cityStateRegex.test(state)) {
      setError("City and state should only contain letters and spaces.");
      return false;
    }

    if (!zipRegex.test(zip)) {
      setError("Zip code should only contain numbers.");
      return false;
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== true) {
      setError(passwordValidationResult);
      return false;
    }

    return true; // All inputs are valid
  };


  const validatePassword = (password) => {
    // Minimum length requirement
    if (password.length < 8) {
      return "Password requirements doesn't meet";
    }

    // Complexity requirement (at least one uppercase, one lowercase, one number, one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password requirements doesn't meet.";
    }

    return true; // Password meets requirements
  };



  return (
    <>
      <div className="container mt-5">
        <form
          className="p-5"
          style={{
            border: "2px solid #ddd",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "auto",
            backgroundColor: "#f8f9fa",
          }}
          onSubmit={signUpUsers} // Call signUpUsers function on form submit
        >
          {/* Display error message */}
          {error && <div className="alert alert-danger">{error}</div>}

          <h1 className="mb-4 text-center">Sign Up Now</h1>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Abu Ubaidah"
            />
          </div>

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

          <div className="mb-3">
            <label htmlFor="inputStreet" className="form-label">
              Street Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputStreet"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              required
              placeholder="1234 Main St"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
              placeholder="Islamabad"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="inputState"
              value={state}
              onChange={(event) => setState(event.target.value)}
              required
              placeholder="Federal"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              required
              placeholder="44000"
            />
          </div>

          {/* Password input with error message and requirements */}
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              id="inputPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); // Reset error message on change
              }}
              required
              placeholder="Make Strong Password"
            />
            {/* Display password requirements */}
            <div className="form-text">
              Password must:
              <ul>
                <li>Be at least 8 characters long</li>
                <li>Contain at least one uppercase letter</li>
                <li>Contain at least one lowercase letter</li>
                <li>Contain at least one number</li>
                <li>Contain at least one special character (@$!%*?&)</li>
              </ul>
            </div>
            {/* Display error message */}
            {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </div>

          {/* Add reCAPTCHA widget */}
          <div className="mb-3 d-flex justify-content-center" id="recaptcha" data-callback={handleRecaptchaVerify} data-sitekey="6LepcNEpAAAAADHtsfiO_pU2aYB_WFoBYGPiJt2s"></div>


          <div className="mb-4">
            <center>
              <button
                type="submit"
                onClick={signUpUsers}
                className="btn btn-dark"
              >
                Sign Up
              </button>
            </center>
          </div>

          <p className="text-center">
            If you have an account{" "}
            <Link to="/login" className="btn-link">
              Sign in Now!
            </Link>
          </p>
        </form>
      </div>
      <div className="container">
        <p></p>
      </div>
    </>
  );
}
