import React, { useState, useEffect } from "react";
import FormGroup from "../common/FormGroup";
import axios from "axios";
import { saveClaim } from "../../Controllers/claim";
import Constants from "../../constants";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';

function FileClaimForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [url, setUrl] = useState('')
  const [data, setData] = useState({})
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    amount: 0,
    institutionName: "",
    institutionAddress: "",
    contact: "",
    description: "",
    suppDocs: "",
  });
  function handleChange(e) {
    const data = e.target.value;
    setValues({
      ...values,
      [e.target.name]: data,
    });
  }

  function handleImageChange(e) {
    setLoading(true);
    if (e.target.files.length) {
      let formData = new FormData();
      formData.set("image", e.target.files[0]);
      axios
        .post("http://localhost:5000/api/uploadImage", formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setValues((prevState) => ({
              ...prevState,
              [e.target.name]: res.data.image,
            }));
            setLoading(false);
          }
        });
    }
  }

  function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      e.stopPropagation();
      console.log(values);
      axios
        .post(`${Constants.baseURL}/api/data`, values)
        .then((response) => {
          console.log(response);
          mapAddressToClaimHash(response.data.image)
          setIsSubmitted(true);
        })
        .then(saveClaim(values))
        .catch((error) => {
          console.log(error);
        });
    }
    setValidated(true);
  }

  useEffect(() => {
    if(url!= ''&& url!=undefined){
  axios
    .get(url, values)
    .then((response) => {
      console.log(response);
      setData(response.data)
      //response.data.image
    })
    .catch((error) => {
      console.log(error);
    });
    setIsSubmitted(true);
  }
      
  }, [url]);

///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */

   
 
   const insuranceContractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function mapAddressToClaimHash(ipfsUrl){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      const address = signer.getAddress();
      console.log("address: ", address);
      console.log("Ipfshash", ipfsUrl);
      const transaction = await contract.submitClaim(ipfsUrl);
      await transaction.wait();
      console.log('Transaction : ', transaction);
      
      
      // ///////checking data 
       console.log("checking:");
      // const readtransaction =  await contract.PolicyholdersClaimDetails(1);
      // console.log('ipfs hash:', readtransaction);
      // console.log('')
    }
  }
 ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-4xl">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <form
          className="mb-0 space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <FormGroup
            labelName="Amount"
            name="amount"
            type="number"
            handleChange={handleChange}
            value={values.amount}
          />
          <FormGroup
            labelName="Name of Institution"
            name="institutionName"
            type="text"
            handleChange={handleChange}
            value={values.institutionName}
          />
          <FormGroup
            labelName="Institution Address"
            name="institutionAddress"
            type="text"
            handleChange={handleChange}
            value={values.institutionAddress}
          />
          <FormGroup
            labelName="Contact"
            name="contact"
            type="tel"
            handleChange={handleChange}
            value={values.contact}
          />
          <FormGroup
            labelName="Description"
            name="description"
            type="text"
            handleChange={handleChange}
            value={values.description}
          />
          <FormGroup
            labelName="Supporting Documents"
            name="suppDocs"
            type="file"
            handleChange={handleImageChange}
          />

          {values.suppDocs && (
            <img src={values.suppDocs} width={200} height={200} alt="" />
          )}

          <button
            variant="primary"
            type="submit"
            className="bg-mb-purple text-white rounded-lg py-2.5 px-7"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileClaimForm;
