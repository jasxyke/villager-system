import React from "react";
import mainLogo from "../assets/logo.png";
const MainLogo = () => {
  return (
    <div className="flex-1 w-full">
      <img
        src={mainLogo}
        alt="Main Logo"
        className={"h-auto w-[100px] mx-auto mt-5 mb-7"}
      />
    </div>
  );
};

export default MainLogo;
