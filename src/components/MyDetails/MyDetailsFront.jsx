import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <div className="px-40 mt-20 flex justify-around">
        <div className="px-40 mt-20 grid place-items-left bg-[#f9f9fe]">
          <div className="w-[300px] h-[150px] rounded-lg shadow-lg shadow-purple bg-[#ffffff] grid place-items-center">
            <div className="text-3xl">
              {" "}
              <Link to="/MyCovers">My Covers</Link>
            </div>
          </div>
        </div>
        <div className="px-40 mt-20 grid place-items-left bg-[#f9f9fe]">
          <div className="w-[300px] h-[150px] rounded-lg shadow-lg shadow-purple bg-[#ffffff] grid place-items-center">
            <div className="text-3xl">
              {" "}
              <Link to="/Claims">My Claims</Link>
            </div>
          </div>
        </div>
        <div className="px-40 mt-20 grid place-items-left bg-[#f9f9fe]">
          <div className="w-[300px] h-[150px] rounded-lg shadow-lg shadow-purple bg-[#ffffff] grid place-items-center">
            <div className="text-3xl">
              {" "}
              <Link to="/KYC">My KYC</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
