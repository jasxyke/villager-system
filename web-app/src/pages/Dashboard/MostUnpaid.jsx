import React from "react";

const MostUnpaid = () => {
  return (
    <div className="w-full sm:w-5/12 bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9] rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="p-4 rounded-xl max-h-[60vh] overflow-y-auto border border-gray-300">
        <div className="bg-[#97A97C] p-4 rounded-md text-white font-semibold text-lg">
          Most Unpaid Residents
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-6 p-4 bg-white hover:bg-gray-200 cursor-pointer rounded-md shadow-md transition-transform duration-300 transform hover:scale-105">
            <div className="flex flex-1 flex-col">
              <div className="text-lg font-semibold text-gray-900">
                JOHN REY REBUSQUILLO
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-500">BLOCK 1 LOT 1</div>
                <div className="text-sm text-red-500 font-semibold">
                  ₱1000.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostUnpaid;
