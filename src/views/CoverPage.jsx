import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Cards from "../components/Cards/Cards";
import GetCoveredHeading from "../components/GetCovered/GetCoveredHeading";
import MyDetails from "../components/MyDetails/MyDetails";
import PageHeading from "../components/PageHeading/PageHeading";

function CoverPage() {
  return (
    <div className="container">
      <div className="grid place-items-center">
        <div className="flex items-center">
          <ul className="flex flex-row gap-5 text-lg">
            <NavLink activeClassName="active" to={"/"}>
              <PageHeading title="My Details" />
            </NavLink>
            <NavLink activeClassName="active" to={"AllCovers"}>
              <PageHeading title="All Covers" />
            </NavLink>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CoverPage;
