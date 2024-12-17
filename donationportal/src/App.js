import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignPage from "./Pages/SignPage";
import CompletedCases from "./Pages/CompletedCases";
import DonorUsers from "./Pages/DonorUsers";
import AllUsers from "./Pages/AllUsers";
import ListCasesPage from "./Pages/ListCasesPage";
import OngoingCasesAdmin from "./Components/OngoingCasesAdmin";
import NewNavbar from "./Components/NewNavbar";
import Donation from "./Components/Donation";
import Payment from "./Components/Payment";
import AboutUs from "./Pages/Aboutus";
import DonationRecord from "./Components/DonationRecord";
import NewAdminPanel from "./Pages/NewAdminPanel";
import ExistingAdmin from "./Components/ExistingAdmins";

function App() {
  return (
    <Router>
      <NewNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/list-cases" element={<ListCasesPage />} />
        <Route path="/ongoing-cases-admin" element={<OngoingCasesAdmin />} />
        <Route path="/completed-cases" element={<CompletedCases />} />
        <Route path="/donor-users" element={<DonorUsers />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/donations/:caseID" element={<Donation />} />
        <Route path="/payment/:caseID" element={<Payment />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/userDonations" element={<DonationRecord />} />
        <Route path="/exsisting-admins" element={<ExistingAdmin />} />
        <Route path="/admin" element={<NewAdminPanel />} />
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
