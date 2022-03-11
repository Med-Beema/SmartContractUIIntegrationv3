import React, { useEffect, useState } from "react";
import TokenBuyButton from "./TokenBuyButton";
import TokenExchangeCard from "./TokenExchangeCard";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';


function TokenExchangeSet({ tokenName }) {
  const exchangeRateToken = 0.01;
  const exchangeRateDollar = 2000;
  //   const isWalletConnected = props.isWalletConnected;
  const [tokenAmount, setTokenAmount] = useState(0);
  const [ethAmount, setEthAmount] = useState(tokenAmount * exchangeRateToken);

 

  function handleTokenChange(value) {
    setTokenAmount(value);
  }

  useEffect(() => {
    setEthAmount(tokenAmount * exchangeRateToken);
  }, [tokenAmount]);

    ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */

   const insuranceContractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function BuyTokens(){
     if (typeof window.ethereum !== 'undefined') {
       await requestAccount();
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       console.log({provider});
       const signer = provider.getSigner();
       const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
       const address = signer.getAddress();
       console.log("address: ", address);
       const coverFees = await contract.coverFees();
       console.log('coverFees ', coverFees);
       let capitalamount = ethAmount.toString();
       const transaction = await contract.depositCapital({value: ethers.utils.parseUnits(capitalamount,'ether')});
       await transaction.wait();
       console.log('Transaction : ', transaction);
          
     } 
    }

     async function BuyCTKN(){
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({provider});
        const signer = provider.getSigner();
        const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
        const address = signer.getAddress();
        console.log("address: ", address);
        const coverFees = await contract.coverFees();
        console.log('coverFees ', coverFees);
        let capitalamount = ethAmount.toString();
        console.log(ethAmount);
        const transaction = await contract.buyCTKN({value: ethers.utils.parseUnits(capitalamount,'ether')});
        await transaction.wait();
        console.log('Transaction : ', transaction);
              
      } 
    }
   
 
   
 ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="grid grid-cols-2  gap-x-20">
        <div>
          <TokenExchangeCard
            currency={tokenName}
            type="Receive"
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
            handleTokenChange={handleTokenChange}
          />
        </div>
        <div>
          <TokenExchangeCard currency="ETH" type="Pay" ethAmount={ethAmount} />
        </div>
      </div>

      <div className="grid place-items-center">
        <div className="flex items-center">
          <ul className="flex flex-row gap-5 text-lg">
            <TokenBuyButton tokenName={tokenName} BuyTokens={BuyTokens} BuyCTKN = {BuyCTKN}/>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TokenExchangeSet;
