import React, { useState } from "react";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';

export default function Stake() {
  const [stakeTokenAmt,setStakeTokenAmt]=useState()
  const [unstakeTokenAmt,setUnstakeTokenAmt]=useState()
  const handleStakeChange =(value)=>{
    setStakeTokenAmt(value)
  }
  const handleUnstakeChange =(value)=>{
    setUnstakeTokenAmt(value)
  }
   ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */


   const insuranceContractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function stakeTokens(){
     if (typeof window.ethereum !== 'undefined') {
       await requestAccount();
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       console.log({provider});
       const signer = provider.getSigner();
       const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
       const address = signer.getAddress();
       console.log("address: ", address);
       console.log(stakeTokenAmt);
       const transaction = await contract.stakeTokens(stakeTokenAmt);
       await transaction.wait();
       console.log('Transaction : ', transaction);
       
       ///////checking data 
       console.log("checking:");
     
     
     
       
     } 
   
 
   }
   
   async function unStakeTokens(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      const address = signer.getAddress();
      console.log("address: ", address);
      console.log(unstakeTokenAmt)
      const transaction = await contract.unstakeTokens(unstakeTokenAmt);
      await transaction.wait();
      console.log('Transaction : ', transaction);
      
      ///////checking data 
      console.log("checking:");
        
    
      
    } 
  

  }
 ////////////////////////////////////////////////////////////////////////////////////////
 
  return (
    <div>
      <div className="flex justify-between">
        <div className="px-40 mt-20 grid place-items-left bg-[#f9f9fe]">
          <div className="w-[500px] h-[350px] rounded shadow-md shadow-[4px 4px 4px rgba(0, 0, 0, 0.25)] bg-[#ffffff]">
            <div className="m-10 space-y-4">
              <label class="text-black text-lg font-regular" for="username">
                Number of Tokens
              </label>
              <input
                className="h-14 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-purple focus:outline-purple focus:shadow-outline"
                type="numeric"
                onChange={(e) => handleStakeChange(e.target.value)}
                value = {stakeTokenAmt}
              ></input>
            </div>
            <div className="pt-10 grid place-items-center">
              {" "}
              <button className="bg-mb-green text-white rounded-lg py-2.5 px-24"
              onClick={stakeTokens}>
                Stake
              </button>
            </div>
          </div>
        </div>
        <div className="px-40 mt-20 grid place-items-left bg-[#f9f9fe]">
          <div className="w-[500px] h-[350px] rounded shadow-md shadow-[4px 4px 4px rgba(0, 0, 0, 0.25)] bg-[#ffffff]">
            <div class="m-10 space-y-4">
              <label className="text-black text-lg font-regular" for="username">
                Number of Tokens
              </label>
              <input
                className="h-14 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-purple focus:outline-purple focus:shadow-outline"
                type="numeric"
                onChange={(e) => handleUnstakeChange(e.target.value)}
                value = {stakeTokenAmt}
              ></input>
            </div>
            <div className="pt-10 grid place-items-center">
              {" "}
              <button className="bg-mb-green text-white rounded-lg py-2.5 px-24" onClick={unStakeTokens} >
                UnStake
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
