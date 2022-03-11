import React from "react";

function TokenBuyButton({ tokenName, BuyTokens,BuyCTKN }) {
  return (
    <div>
      <button className="bg-mb-green rounded-lg py-2.5 px-7 mt-10" onClick={tokenName=="ITKN"?BuyTokens:BuyCTKN}>
        Buy {tokenName}
      </button>
    </div>
  );
}

export default TokenBuyButton;
