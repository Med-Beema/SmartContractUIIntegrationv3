import React from "react";
import FormGroup from "../common/FormGroup";

function FileClaimForm() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-4xl">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <form
          action="#"
          method="POST"
          className="mb-0 space-y-6"
          encType="multipart"
        >
          <FormGroup labelName="Amount" name="amount" type="number" />
          <FormGroup
            labelName="Name of Institution"
            name="institutionName"
            type="text"
          />
          <FormGroup
            labelName="Institution Address"
            name="institutionAddress"
            type="text"
          />
          <FormGroup labelName="Contact" name="contact" type="tel" /> 
          <FormGroup labelName="Description" name="fathersName" type="text" />
          <FormGroup
            labelName="Supporting Documents"
            name="supportingDocs"
            type="file"
            multiple
          />
        </form>
      </div>
    </div>
  );
}

export default FileClaimForm;
