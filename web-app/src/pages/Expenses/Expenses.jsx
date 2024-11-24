import React from "react";
import MainLogo from "../../components/MainLogo";

const Expenses = () => {
  return (
    <div>
      <div className="p-4">
        <MainLogo />
      </div>
      <div className="p-6 max-w-5xl m-auto">
        <div className="bg-green rounded-md p-4 text-white">-</div>
      </div>
    </div>
  );
};

export default Expenses;
