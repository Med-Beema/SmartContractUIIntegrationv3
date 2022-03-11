import React from "react";

function FormGroup({ name, type, labelName, handleChange, value }) {
  const fileUploadClass = `form-control block  w-full  px-3  text-base  font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid   transition  ease-in-out  m-0  focus:text-gray-700 focus-visible:border-mb-purple focus-visible:ring-mb-purple`;
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {labelName}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        // required
        onChange={handleChange}
        value={value}
        className={type === "file" ? fileUploadClass : "form-control"}
      />
    </div>
  );
}

export default FormGroup;
