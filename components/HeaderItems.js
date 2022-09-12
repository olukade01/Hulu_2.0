import React from "react";

function HeaderItems({ Icon, title }) {
  return (
    <div className="group flex flex-col items-center w-12 sm:w-20 hover:text-white cursor-pointer">
      <Icon className="h-8 mb-1  group-hover:animate-spin" />
      <p className="tracking-widest opacity-0 group-hover:opacity-100">
        {title}
      </p>
    </div>
  );
}

export default HeaderItems;
