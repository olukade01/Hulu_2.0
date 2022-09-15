import { useRouter } from "next/router";
import React from "react";
import requests from "../utils/Requests";

const Navbar = ({ setMovies }) => {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex px-10 sm:px-20 text-2xl space-x-10 sm:space-x-20 whitespace-nowrap overflow-x-scroll scrollbar-hide">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            key={key}
            onClick={() => {
              router.push(`/?genre=${key}`);
              setMovies([]);
            }}
            className="cursor-pointer duration-200 hover:scale-125 hover:text-white active:text-red-500"
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202a] h-9 w-[8%]" />
    </nav>
  );
};

export default Navbar;
