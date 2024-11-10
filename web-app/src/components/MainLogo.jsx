import React from "react";
import mainLogo from "../assets/logo.png";
const MainLogo = () => {
  return (
    <div className="">
      <img
        src={mainLogo}
        alt="Main Logo"
        className={"h-auto w-[100px] mx-auto mb-7"}
      />
    </div>
  );
};

export default MainLogo;
