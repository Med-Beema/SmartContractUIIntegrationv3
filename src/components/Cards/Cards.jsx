import React from "react";

export default function Cards() {
  return (
    <div className="grid place-items-center bg-[#f9f9fe]">
      <div className="w-[485px] h-[300px] rounded shadow-md shadow-[4px 4px 4px rgba(0, 0, 0, 0.25)] bg-[#ffffff]">
        <div className="p-4 divide-y divide-300  divide-[#0000005b]">
          <div className="Heading flex flex-row">
            <div className="abbr basis-1/4 font-[700] text-3xl text-[#7C7777] font-roboto">
              ITKN
            </div>
            <div className="py-1 place-items-center fullName basis-1/2 font-[600] text-xl text-[#000000]">
              Investor Token
            </div>
          </div>
          <div className="bodyContent flex flex-row pt-40">
            <div className="content1 basis-80 leading-10">
              <div className="font-[500] text-sm text-[#7C7777]">
                Premium price
              </div>
              <div className="font-[400] text-sm text-[##000000] py-5">
                4.61%/year
              </div>
            </div>
            <div className="content2 basis-80 leading-9">
              <div className="font-[500] text-sm text-[#7C7777]">My Cover</div>
              <div className="font-[400] text-sm text-[##000000] py-5">
                0 ETH
              </div>
            </div>
            <div className="content3 basis-80 leading-9">
              <div className="font-[500] text-sm text-[#7C7777]">
                Rollover Date
              </div>
              <div className="font-[400] text-sm text-[##000000] py-5">
                3/6/2022
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
