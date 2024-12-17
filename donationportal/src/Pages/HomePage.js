import React from "react";
import Carousel from "../Components/Carousel";
import Featured from "../Components/Featured";
import DownFooter from "../Components/DownFooter";
import OngoingCasesAdmin from "../Components/OngoingCasesAdmin";
import CompletedCases from "./CompletedCases";
import Completed from "../Components/Completed";

export default function HomePage() {
  return (
    <>
      <div>
        <div>
          <Carousel />
        </div>
        <div className="container my-5">
          <Featured />
        </div>
        <div className="container">
          <OngoingCasesAdmin />
        </div>
        <div className="container my-5">
          <Completed />
        </div>
        <div className="my-5">
          <DownFooter />
        </div>
      </div>
    </>
  );
}
