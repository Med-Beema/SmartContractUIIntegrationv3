import React from "react";
import ClaimResult from "./ClaimResult";

export default function ClaimsDetails() {
  return (
    <div>
      <div className="mt-6 mx-10 panelBody">
        <div className="claims mt-10 mx-12 float-right">
          <div className="flex space-x-4">
            <button className="bg-mb-green text-white rounded-lg py-2.5 px-7">
              Accept Claim
            </button>
            <button className="bg-[#fc0307] rounded-lg text-white py-2.5 px-7">
              Reject Claim
            </button>
          </div>
        </div>
        <div>
          <ClaimResult quorum={50} voters={50} />
        </div>
        <div className=" claimDetails mt-6 mx-10 panelBody">
          {" "}
          <div className="gap-y-10 topPart">
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Claim ID :</div>
              <label className="text-lg">#11111</label>
            </div>
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Votes For :</div>
              <label className="text-lg">11111</label>
            </div>
            <div className="flex gap-3 pb-6">
              <div className="font-bold text-xl">Votes Against :</div>
              <label className="text-lg">232323</label>
            </div>
            <div className="pb-6">
              <div className="font-bold text-xl pb-2">Description :</div>
              <label className="text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </label>
            </div>
            <div className="pb-2">
              <div className="font-bold text-xl">Uploaded Files :</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
