import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ClaimResult from "./ClaimResult";
import Constants from "../../constants";
import AssessmentCard from "../Cards/AssessmentCard";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';

export default function ClaimsDetails() {
  const navigate = useNavigate();
    const { claimID } = useParams();
  const [allClaimsData, setAllClaimsData] = useState({});
  const [loading, setLoading] = useState(false);
 ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */

   const insuranceContractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function votefor(){
     if (typeof window.ethereum !== 'undefined') {
       await requestAccount();
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       console.log({provider});
       const signer = provider.getSigner();
       const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
       const address = signer.getAddress();
       console.log("address: ", address);
       const transaction = await contract.vote();
       await transaction.wait();
       console.log('Transaction : ', transaction);  
     
       
     } 
   
 
   }
   
 ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${Constants.baseURL}/claim/${claimID}`);
      const json = await data.json();
      //setData(json);
      setAllClaimsData(json[0]);
      console.log(json);
    };
    fetchData().catch(console.error);
  }, [claimID]);

  function acceptClaim(e) {
    axios.put(`${Constants.baseURL}/voteFor/${claimID}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("../claims");
      }
    });
    votefor();
  }

  function rejectClaim(e) {
    axios.put(`${Constants.baseURL}/voteAgainst/${claimID}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("../claims");
      }
    });
    votefor();
  }
  function assessment(e) {
    
  }
  const date = new Date(allClaimsData.createdDate);
  return (
    <div>
      <div className="mt-6 mx-10 panelBody">
        <div className="claims mt-10 mx-12 float-right">
          {(() => {
            switch (allClaimsData.status) {
              case "Voting":
                return (
                  <div className="flex space-x-4">
                    <button
                      className="bg-mb-green text-white rounded-lg py-2.5 px-7"
                      onClick={acceptClaim}
                    >
                      Accept Claim
                    </button>
                    <button className="bg-[#fc0307] rounded-lg text-white py-2.5 px-7"
                     onClick={rejectClaim}>

                      Reject Claim
                    </button>
                  </div>
                );
              case "Assessment":
                return (
                  <div className="flex space-x-4">
                    <button
                      className="bg-mb-green rounded-lg text-white py-2.5 px-7"
                      onClick={assessment}
                    >
                      <Link to={`/assessment/${claimID}`}>Assessment</Link>
                    </button>
                  </div>
                );
              case "Accepted":
                return <div></div>;
              case "Rejected":
                return <div></div>;
              default:
                return null;
            }
          })()}
        </div>
        <div>
          <ClaimResult claimDetail={allClaimsData} />
        </div>
        <div className=" claimDetails mt-6 mx-10 panelBody">
          {" "}
          <div className="gap-y-10 topPart">
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">User ID :</div>
              <label className="text-lg">{allClaimsData.userId}</label>
            </div>
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Created Date</div>
              <label className="text-lg">
                {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}
              </label>
            </div>
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Contact</div>
              <label className="text-lg">{allClaimsData.contact}</label>
            </div>
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Institution Name</div>
              <label className="text-lg">{allClaimsData.instAddress}</label>
            </div>
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Institution Address</div>
              <label className="text-lg">{allClaimsData.instname}</label>
            </div>
            <div className="pb-6">
              <div className="font-bold text-xl pb-2">Description :</div>
              <label className="text-lg">{allClaimsData.description}</label>
            </div>
            <div className="pb-2">
              <div className="font-bold text-xl">Uploaded Files :</div>
              <div>
                <img
                  src={allClaimsData.documents}
                  width={200}
                  height={200}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
