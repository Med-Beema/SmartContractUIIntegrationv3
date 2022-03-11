import React, { useState } from "react";
import img from "../.././MedBeema.ico";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';
export default function CoverCard() {
  ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */
   const [approve, setApproval] = useState()

   const insuranceContractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
   async function depositCoverFees_Policy(ipfsUrl){
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
      const transaction = await contract.depositCoverFees({value: coverFees});
      await transaction.wait();
      console.log('Transaction : ', transaction);
      
      ///////checking data 
      console.log("checking:");
      const readtransaction =  await contract.approvedHolders(address);
      console.log('approved?:', readtransaction);
      setApproval(readtransaction);
      
    } 
  

  }


   ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="mt-10 grid place-items-left bg-[#f9f9fe]">
        <div class="w-[485px] h-[370px] rounded shadow-md shadow-[4px 4px 4px rgba(0, 0, 0, 0.25)] bg-[#ffffff]">
          <div class="p-4">
            <div className="Heading flex flex-row">
              <div className="basis-1/4">
                <img src={img}></img>
              </div>
              <div className="px-8 py-1 place-items-center fullName  font-[600] text-xl text-[#000000]">
                <div className="font-[700] text-4xl text-black">
                  MedProtocol
                </div>
                <div className="pl-4 font-[500] text-lg text-[#7C7777]">
                  smart contract integrity
                </div>
              </div>
            </div>
            <div className="bodyContent flex flex-row pt-20">
              <div className="content1 basis-80 leading-10">
                <div className="font-[500] text-sm text-[#7C7777]">
                  Premium price
                </div>
                <div className="font-[400] text-sm text-[##000000] py-5">
                  4.61%/year
                </div>
              </div>
              <div className="content2 basis-80 leading-9">
                <div className="font-[500] text-sm text-[#7C7777]">
                  My Cover
                </div>
                <div className="font-[400] text-sm text-[##000000] py-5">
                  0 ETH
                </div>
              </div>
              <div className="content3 basis-80 leading-9">
                <div className="font-[500] text-sm text-[#7C7777]">
                  Rollover Date
                </div>
                <div className="font-[400] text-sm text-[##000000] py-5">
                  3/6/2022
                </div>
              </div>
            </div>
            <div className="pt-10 grid place-items-center">
              {" "}
              <button className="bg-purple text-white rounded-lg py-2.5 px-7" onClick={depositCoverFees_Policy}>
               Buy Cover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
