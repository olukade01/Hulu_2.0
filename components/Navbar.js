import React from "react";
import requests from "../utils/Requests";

const Navbar = () => {
  return (
    <div className="flex">
      {Object.entries(requests).map(([key, { title, url }]) => (
        <h2 key={key} className="">
          {title}
        </h2>
      ))}
    </div>
  );
};

export default Navbar;
