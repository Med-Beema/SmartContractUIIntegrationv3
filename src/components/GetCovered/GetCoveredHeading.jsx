import React from "react";

function GetCoveredHeading() {
  return (
    <div>
      <nav className="flex justify-between items-center h-20">
        <ul className="flex flex-row gap-16 text-lg">
          <li className="nav-item-getCovered active">My Details</li>
          <li className="nav-item-getCovered">All Covers</li>
        </ul>
      </nav>
    </div>
  );
}

export default GetCoveredHeading;
