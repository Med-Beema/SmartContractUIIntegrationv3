import React, { useState, useEffect } from "react";
import FormGroup from "../common/FormGroup";
import axios from "axios";
import InsuranceSystem from '../../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';


function MyDetails() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [url, setUrl] = useState('')
  const [data, setData] = useState({})
   const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    address: "",
    gender: "",
    dob: "",
    occupation: "",
    fathersName: "",
    idType: "",
    idNum: "",
    issuedPlace: "",
    issuedDate: "",
    expiryDate: "",
    userPhoto: "",
    asdasd: "",
    idPhoto: "",
    signature: "",
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
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
     
    } else {
      console.log(values);
      axios
        .post("http://localhost:5000/api/data", values)
        .then((response) => {
          console.log("inside promise");
          console.log(response);
          mapAddressToDetailsHash(response.data.image)
          
        })
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
 
   async function mapAddressToDetailsHash(ipfsUrl){
     if (typeof window.ethereum !== 'undefined') {
       await requestAccount();
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       console.log({provider});
       const signer = provider.getSigner();
       const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
       const address = signer.getAddress();
       console.log("address: ", address);
       const transaction = await contract.submitPolicyHolder(ipfsUrl);
       await transaction.wait();
       console.log('Transaction : ', transaction);
       
       ///////checking data 
       console.log("checking:");
       const readtransaction =  await contract.holdersDetailsIpfsHash(address);
       console.log('ipfs hash:', readtransaction);
      
       
       
       setUrl(ipfsUrl)
       console.log("checking", url)
     
     
       
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
            labelName="Full Name"
            name="fullName"
            type="text"
            handleChange={handleChange}
            value={values.fullName}
          />
          <FormGroup
            labelName="Address"
            name="address"
            type="text"
            handleChange={handleChange}
            value={values.address}
          />
          <FormGroup
            labelName="Gender"
            name="gender"
            type="text"
            handleChange={handleChange}
            value={values.gender}
          />
          <FormGroup
            labelName="Date of Birth"
            name="dob"
            type="date"
            handleChange={handleChange}
            value={values.dob}
          />
          <FormGroup
            labelName="Occupation"
            name="occupation"
            type="text"
            handleChange={handleChange}
            value={values.occupation}
          />
          <FormGroup labelName="Contact" name="contact" type="tel" />
          <FormGroup
            labelName="Father's Name"
            name="fathersName"
            type="text"
            handleChange={handleChange}
            value={values.fathersName}
          />
          <FormGroup
            labelName="Identification Type"
            name="idType"
            type="text"
            handleChange={handleChange}
            value={values.idType}
          />
          <FormGroup
            labelName="Identification Number"
            name="idNum"
            type="text"
            handleChange={handleChange}
            value={values.idNum}
          />
          <FormGroup
            labelName="Issued Place"
            name="issuedPlace"
            type="text"
            handleChange={handleChange}
            value={values.issuedPlace}
          />
          <FormGroup
            labelName="Issued Date"
            name="issuedDate"
            type="date"
            handleChange={handleChange}
            value={values.issuedDate}
          />
          <FormGroup
            labelName="Expiry Date"
            name="expiryDate"
            type="date"
            handleChange={handleChange}
            value={values.expiryDate}
          />
          <FormGroup
            labelName="User Photo"
            name="userPhoto"
            type="file"
            handleChange={handleImageChange}
          />
          {values.userPhoto && (
            <img src={values.userPhoto} width={200} height={200} alt="" />
          )}
          <FormGroup
            labelName="Identification Document Photo"
            name="idPhoto"
            type="file"
            handleChange={handleImageChange}
          />
          {values.idPhoto && (
            <img src={values.idPhoto} width={200} height={200} alt="" />
          )}
          <FormGroup
            labelName="Signature"
            name="signature"
            type="file"
            handleChange={handleImageChange}
          />
          {values.signature && (
            <img src={values.signature} width={200} height={200} alt="" />
          )}

          <div>
            <input type="checkbox" id="terms" name="terms" />
            <label for="terms" className="form-label">
              I agree to terms and conditions.
            </label>
          </div>
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

export default MyDetails;
