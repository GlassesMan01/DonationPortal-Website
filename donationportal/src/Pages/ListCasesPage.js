import React from "react";
import DownFooter from "../Components/DownFooter";
import OngoingCasesAdmin from "../Components/OngoingCasesAdmin";

export default function ListCasesPage() {
  return (
    <>
      <div className="container">
        <OngoingCasesAdmin />
      </div>
      <div className="my-5">
        <DownFooter />
      </div>
    </>
  );
}
