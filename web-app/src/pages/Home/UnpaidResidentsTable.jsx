import React from "react";

const UnpaidResidentsTable = () => {
  return (
    <div className="rounded-t-md mt-4">
      <div className="text-lg sm:text-2xl mt-4 bg-green text-white p-4 text-center">
        PHP CURRENT EXPENSES
      </div>

      <div className="grid grid-cols-6 gap-4 mt-5 p-4 bg-oliveGreen text-white font-bold">
        <div className="flex items-center justify-center">Name</div>
        <div className="flex items-center justify-center">Block Number</div>
        <div className="flex items-center justify-center">Lot Number</div>
        <div className="flex items-center justify-center">Email</div>
        <div className="flex items-center justify-center">Contact Number</div>
        <div className="flex items-center justify-center">Action</div>
      </div>
      <div className="grid grid-cols-6 gap-4 p-4 bg-white font-bold">
        <div className="flex items-center justify-center">john</div>
        <div className="flex items-center justify-center">1</div>
        <div className="flex items-center justify-center">2</div>
        <div className="flex items-center justify-center">jrey@gmail.com</div>
        <div className="flex items-center justify-center">09101231241</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="bg-mutedGreen p-2 rounded-md">Message</div>
          <div className="bg-mutedGreen p-2 rounded-md">Notify</div>
        </div>
      </div>
    </div>
  );
};

export default UnpaidResidentsTable;
