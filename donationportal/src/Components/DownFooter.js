import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

//Footer
const DownFooter = () => {
  return (
    <footer className="footer bg-dark text-white py-5 bg-black">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Donation Portal</h5>
            <div className="logo-container">
              <img
                src="/DONATIONPORTAL.png"
                className="d-block logo-image"
                alt="Donation Portal Logo"
                style={{ width: "100px" }} // Adjust the width as needed
              />
            </div>
            <div className="my-3">
              <p>Contact: ahmedkhubab2002@gmail.com</p>
            </div>
            <div className="my-3">
              <p>Location: FAST-House Rohtas Road, G-9/4 Islamabad - 44000</p>
            </div>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink className="nav-link text-white" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/list-cases">
                  Donation Cases
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/completed-cases">
                  Completed Cases
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-white" to="/aboutus">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="text-uppercase">Social Media Links</h5>
            <ul className="list-unstyled d-flex justify-content-between my-3 social-icons">
              {/* Social Media Icons */}
              <li>
                <a href="https://www.facebook.com/" className="text-white">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/home" className="text-white">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" className="text-white">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/feed/" className="text-white">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="mb-0">
          &copy; 2023 DonationPortal.com | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default DownFooter;
