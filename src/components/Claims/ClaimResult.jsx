import React from "react";

export default function ClaimResult({ quorum, voters }) {
  return (
    <div>
      <div className="myClaims">
        <div className="mt-6 mx-10 panelBody h-auto">
          <div className="font-semibold text-xl float-right">
            Voting Has Ended
          </div>
          <div className="gap-y-10 topPart">
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Claim ID :</div>
              <label className="text-lg">#11111</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Number of Votes For :</div>
              <label className="text-lg">11111</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Number of Votes Against :</div>
              <label className="text-lg">232323</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Status :</div>
              <label className="text-lg">Accepted</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Voting Type :</div>
              <label className="text-lg">Claim Assessor</label>
            </div>
          </div>
          <div className="progressBar mt-10">
            <label className="text-lg font-medium">Quorum</label>
            <div className="h-5 relative  rounded-full overflow-hidden">
              <div className="w-full h-full bg-gray-200 absolute"></div>
              <div
                className="h-full bg-mb-green absolute"
                style={{ width: quorum + "%" }}
              ></div>
            </div>
            <div>
              <label className="float-left">0</label>
              <label className="float-right">100</label>
            </div>
          </div>
          <div className="progressBar mt-10 pb-8">
            <div className="h-5 relative  rounded-full overflow-hidden">
              <div className="w-full h-full bg-[#fc0307] absolute"></div>
              <div
                className="h-full bg-mb-green absolute"
                style={{ width: voters + "%" }}
              ></div>
            </div>
            <div>
              <label className="float-left">For</label>
              <label className="float-right">Against</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
