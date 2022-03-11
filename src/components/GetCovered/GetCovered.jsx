import React from "react";
import Cards from "../Cards/Cards";
import GetCoveredHeading from "./GetCoveredHeading";

export default function GetCovered() {
  return (
    <div>
      <div className="grid place-items-center">
        <GetCoveredHeading />
        <Cards />
      </div>
    </div>
  );
}
