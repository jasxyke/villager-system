import React from "react";
import mainLogo from "../assets/logo.png";
import { useAlert } from "../contexts/AlertBox/AlertContext";
const MainLogo = () => {
  const { showAlert } = useAlert();
  return (
    <div className="">
      <img
        onClick={() => showAlert("Hello this is a testing message", false)}
        src={mainLogo}
        alt="Main Logo"
        className={"h-auto w-[100px] mx-auto mb-7"}
      />
    </div>
  );
};

export default MainLogo;
