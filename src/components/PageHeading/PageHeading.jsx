import React from "react";

function PageHeading({ title, isActive }) {
  const active = isActive ? "active" : "";
  return (
    <li
      className={`nav-item-getCovered text-mb-gray pt-5 pb-2  px-10 font-bold ${active}`}
    >
      {title}
    </li>
  );
}

export default PageHeading;
