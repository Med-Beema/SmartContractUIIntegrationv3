import React, { useState } from "react";
import FormGroup from "../common/FormGroup";
import axios from "axios";
import Constants from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';
export default function AssessmentCard() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    reason: "",
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */

   
 
   const insuranceContractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function submitclaim(){
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
  function handleChange(e) {
    const data = e.target.value;
    setValues({
      ...values,
      [e.target.name]: data,
    });
  }
  let { claimID } = useParams();
  function handleSubmit(e) {
    e.preventDefault();

    const values = e.currentTarget.name;
    axios
      .put(`${Constants.baseURL}/assessment/${claimID}`, values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("../claims");
        }
      });
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-4xl">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <form
          className="mb-0 space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <FormGroup
            labelName="Reason"
            name="reason"
            type="text"
            handleChange={handleChange}
            value={values.reason}
          />
          <button
            variant="primary"
            type="submit"
            className="bg-mb-purple text-white rounded-lg py-2.5 px-7" onClick={submitclaim}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
