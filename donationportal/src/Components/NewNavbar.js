// Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";

export default function NewNavbar() {
  const role = Cookies.get("role");

  const logout = () => {
    Cookies.remove("role");
    Cookies.remove("token");
    console.log("Cookies Removed Succcesfuly");

    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary my--2">
        <div className="container d-flex justify-content-center">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/DONATIONPORTAL.png"
              alt="Bootstrap"
              width="150"
              height="150"
            />
          </NavLink>
        </div>
      </nav>
      <div className="bg-black">
        <ul className="nav justify-content-center my--2">
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/list-cases"
              >
                Donation Cases
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/completed-cases"
              >
                Completed Cases
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/aboutus"
              >
                About Us
              </NavLink>
            </li>

            {role == "admin" && (
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white"
                  activeClassName="active"
                  to="/admin"
                >
                  Admin Panel
                </NavLink>
              </li>
            )}

            {role == null && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "black" }}
                >
                  <li>
                    <Link className="dropdown-item text-white" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" to="/signup">
                      SignUp
                    </Link>
                  </li>
                </ul>
                <style>
                  {`
        .dropdown-item:hover {
          background-color: #333; /* Change the color to your preference */
        }
      `}
                </style>
              </li>
            )}

            {(role == "user" || role == "admin") && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "black" }}
                >
                  <li>
                    <Link
                      className="dropdown-item  text-white"
                      to="/userDonations"
                    >
                      Donation Record
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item  text-white"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
                <style>
                  {`
        .dropdown-item:hover {
          background-color: #333; /* Change the color to your preference */
        }
      `}
                </style>
              </li>
            )}

            {/* {role == "admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
              </li>
            )}

            {role == "user" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )} */}
          </>
        </ul>
      </div>
    </>
  );
}
