import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { formatUserName } from "../../../../mobile/utils/DataFormatter";

const View = ({ onBack, complaint, onSolved }) => {
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
        <div className="p-4 shadow-lg rounded-lg w-full max-w-5xl">
          <div className="flex mb-4 space-x-4">
            <div className="flex items-center flex-1 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
              Complainant:
              <span className="text-md font-medium text-black">
                {formatUserName(complaint.resident.user, false)}
              </span>
            </div>
            <div className="flex items-center flex-1 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
              Complaint Type:
              <span className="text-lg font-medium text-black">
                {complaint.type}
              </span>
            </div>
            <div className="flex items-center flex-1 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
              Date sent:
              <span className="text-lg font-medium text-black">
                {complaint.date_sent}
              </span>
            </div>
          </div>
          <div className="bg-greyGreen h-[250px] rounded-md p-4 mb-4">
            <p className="text-black">{complaint.message}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
              onClick={onSolved}
            >
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
