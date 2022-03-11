import React from "react";
import Cards from "../components/Cards/Cards";
import PageHeading from "../components/PageHeading/PageHeading";
import TokenExchangeBar from "../components/TokenExchange/TokenExchangeBar";

function TokenPage() {
  return (
    <div>
      <TokenExchangeBar />
      <div className="container">
        <div className="grid place-items-center">
          <div className="flex items-center">
            <ul className="flex flex-row gap-5 text-lg">
              <PageHeading title="Tokens" isActive={true} />
            </ul>
          </div>
        </div>
        <br />
        <div className="grid grid-cols-2  ">
          <Cards />
          <Cards />
        </div>
        <div className="grid grid-cols-2  gap-x-20">
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default TokenPage;
