import React from "react";

export default function Footer() {
  return (
    <div className="bottom-0 w-full fixed overflow-hidden">
      <div className="py-4">
        <div className="w-full border-t border-[#7b7a7a]"></div>
      </div>
      <div className="grid place-items-left">
        <nav className="flex justify-between items-center h-5">
          <ul className="flex flex-row gap-8 text-sm text-[#807373]">
            <li className="footer-item active">Telegram</li>
            <li className="footer-item">Discord</li>
            <li className="footer-item">Medium</li>
            <li className="footer-item">Governance</li>
            <li className="footer-item">Documentation</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
