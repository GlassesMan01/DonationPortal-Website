import React, { useState } from "react";
import Admin from "../Components/Admin";
import Cookies from "js-cookie";
import ListCases from "../Components/ListCases";
import AllUsers from "./AllUsers";
import DonorUsers from "./DonorUsers";
import { NavLink } from "react-router-dom";
import ExistingAdmin from "../Components/ExistingAdmins";

export default function NewAdminPanel() {
  const role = Cookies.get("role");
  const [activeSection, setActiveSection] = useState("addAdmin");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <div className="container-fluid">
        {role === "admin" && (
          <div className="row">
            <nav
              id="sidebar"
              className="col-md-3 col-lg-2 d-md-block bg-dark sidebar"
              style={{
                height: "100vh",
                // position: "fixed",
              }}
            >
              <div className="flex-column my-3">
                <NavLink
                  to="#"
                  className={`btn btn-dark ${
                    activeSection === "exsisting-admin" ? "active" : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    backgroundColor:
                      activeSection === "exsisting-admin"
                        ? "#007bff"
                        : "#343a40",
                    color:
                      activeSection === "exsisting-admin" ? "#fff" : "#adb5bd",
                    marginBottom: "1rem",
                    border: "1px solid #fff", // White border
                  }}
                  onClick={() => handleSectionChange("exsisting-admin")}
                >
                  Existing Admins
                </NavLink>
                <NavLink
                  to="#"
                  className={`btn btn-dark ${
                    activeSection === "addAdmin" ? "active" : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    backgroundColor:
                      activeSection === "addAdmin" ? "#007bff" : "#343a40",
                    color: activeSection === "addAdmin" ? "#fff" : "#adb5bd",
                    marginBottom: "1rem",
                    border: "1px solid #fff", // White border
                  }}
                  onClick={() => handleSectionChange("addAdmin")}
                >
                  Add New Admin
                </NavLink>
                <NavLink
                  to="#"
                  className={`btn btn-dark ${
                    activeSection === "listCases" ? "active" : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    backgroundColor:
                      activeSection === "listCases" ? "#007bff" : "#343a40",
                    color: activeSection === "listCases" ? "#fff" : "#adb5bd",
                    marginBottom: "1rem",
                    border: "1px solid #fff",
                  }}
                  onClick={() => handleSectionChange("listCases")}
                >
                  List New Case
                </NavLink>
                <NavLink
                  to="#"
                  className={`btn btn-dark ${
                    activeSection === "registeredUsers" ? "active" : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    backgroundColor:
                      activeSection === "registeredUsers"
                        ? "#007bff"
                        : "#343a40",
                    color:
                      activeSection === "registeredUsers" ? "#fff" : "#adb5bd",
                    marginBottom: "1rem",
                    border: "1px solid #fff",
                  }}
                  onClick={() => handleSectionChange("registeredUsers")}
                >
                  Registered Users
                </NavLink>
                <NavLink
                  to="#"
                  className={`btn btn-dark ${
                    activeSection === "donorUsers" ? "active" : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    backgroundColor:
                      activeSection === "donorUsers" ? "#007bff" : "#343a40",
                    color: activeSection === "donorUsers" ? "#fff" : "#adb5bd",
                    border: "1px solid #fff",
                  }}
                  onClick={() => handleSectionChange("donorUsers")}
                >
                  Donor Users
                </NavLink>
              </div>
            </nav>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {activeSection === "exsisting-admin" && <ExistingAdmin />}
              {activeSection === "addAdmin" && <Admin />}
              {activeSection === "listCases" && <ListCases />}
              {activeSection === "registeredUsers" && <AllUsers />}
              {activeSection === "donorUsers" && <DonorUsers />}
            </main>
          </div>
        )}
      </div>
    </>
  );
}
