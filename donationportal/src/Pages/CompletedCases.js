import React from "react";
import Completed from "../Components/Completed";
import DownFooter from "../Components/DownFooter";

export default function CompletedCases() {
  return (
    <>
      <div>
        <Completed />
      </div>
      <div className="my-5">
        <DownFooter />
      </div>
    </>
  );
}
