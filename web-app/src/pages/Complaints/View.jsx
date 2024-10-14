import React from "react";
import { FaBook } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

const View = ({ onBack }) => {
  return (
    <div className="p-4 bg-green rounded-lg">
      <div className="flex p-2">
        <button
          className="text-2xl text-white cursor-pointer hover:text-gray-800 transition"
          onClick={onBack}
          aria-label="Go back"
        >
          <FiArrowLeft />
        </button>
      </div>
      <div className="p-6 flex justify-center items-center">
        <div className="p-4shadow-lg rounded-lg w-full max-w-5xl">
          <div className="flex mb-4 space-x-4">
            <div className="flex items-center flex-1 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
              <span className="text-lg font-medium text-black">Name</span>
            </div>
            <div className="flex items-center flex-1 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
              <span className="text-lg font-medium text-black">TYPE</span>
            </div>
            <div className="flex items-center flex-1 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
              <span className="text-lg font-medium text-black">DATE</span>
            </div>
          </div>
          <div className="bg-greyGreen h-[250px] rounded-md p-4 mb-4">
            <span className="text-black">Content Area</span>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-green-700 transition">
              Solve
            </button>
            <button className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
