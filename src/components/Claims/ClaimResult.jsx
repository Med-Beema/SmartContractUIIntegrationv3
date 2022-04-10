import React, { useEffect, useState } from "react";
import Constants from "../../constants";

export default function ClaimResult({ claimDetail }) {
  const date = new Date(claimDetail.createdDate);
  return (
    <div>
      <div className="myClaims">
        <div className="mt-6 mx-10 panelBody h-auto">
          {(() => {
            switch (claimDetail.status) {
              case "Voting":
                return (
                  <div className="font-semibold text-xl float-right">
                    Voting Deadline :
                    {`${date.getFullYear()}/${date.getMonth()}/${
                      date.getDate() + 2
                    }`}
                  </div>
                );
              case "Assessment":
                return (
                  <div className="font-semibold text-xl float-right">
                    Voting Deadline :
                    {`${date.getFullYear()}/${date.getMonth()}/${
                      date.getDate() + 2
                    }`}
                  </div>
                );
              case "Accepted":
                return (
                  <div className="font-semibold text-xl float-right">
                    Voting Has Ended
                  </div>
                );
              case "Rejected":
                return (
                  <div className="font-semibold text-xl float-right">
                    Voting Has Ended
                  </div>
                );
              default:
                return null;
            }
          })()}

          <div className="gap-y-10 topPart">
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Claim ID :</div>
              <label className="text-lg">{claimDetail.claimId}</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Number of Votes For :</div>
              <label className="text-lg">{claimDetail.voteFor}</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Number of Votes Against :</div>
              <label className="text-lg">{claimDetail.voteAgainst}</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Status :</div>
              <label className="text-lg">{claimDetail.status}</label>
            </div>
            <div className="flex gap-3 pb-2">
              <div className="font-bold text-xl">Voting Type :</div>
              <label className="text-lg">Claim Assessor</label>
            </div>
          </div>
          {(() => {
            switch (claimDetail.status) {
              case "Voting":
                return (
                  <div className="progressBar mt-10">
                    <label className="text-lg font-medium">Quorum</label>
                    <div className="h-5 relative  rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-200 absolute"></div>
                      <div
                        className="h-full bg-mb-green absolute"
                        style={{
                          width: claimDetail.quorum  + "%",
                        }}
                      ></div>
                    </div>
                    <div>
                      <label className="float-left">0</label>
                      <label className="float-right">100</label>
                    </div>
                  </div>
                );
              case "Assessment":
                return <div></div>;
              case "Accepted":
                return (
                  <div>
                    <div className="progressBar mt-10">
                      <label className="text-lg font-medium">Quorum</label>
                      <div className="h-5 relative  rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gray-200 absolute"></div>
                        <div
                          className="h-full bg-mb-green absolute"
                          style={{
                            width: claimDetail.quorum + "%",
                          }}
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
                          style={{ width: claimDetail.voteFor + "%" }}
                        ></div>
                      </div>
                      <div>
                        <label className="float-left">For</label>
                        <label className="float-right">Against</label>
                      </div>
                    </div>
                  </div>
                );
              case "Rejected":
                return (
                  <div>
                    <div className="progressBar mt-10">
                      <label className="text-lg font-medium">Quorum</label>
                      <div className="h-5 relative  rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gray-200 absolute"></div>
                        <div
                          className="h-full bg-mb-green absolute"
                          style={{
                            width: claimDetail.quorum  + "%",
                          }}
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
                          style={{ width: claimDetail.voteFor + "%" }}
                        ></div>
                      </div>
                      <div>
                        <label className="float-left">For</label>
                        <label className="float-right">Against</label>
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
