import React from "react";

const ResidentDetails = ({ resident, onBack }) => {
  return (
    <div className="relative bg-[var(--darkGreen)] text-white rounded-lg p-6 shadow-lg rounded-s-xl">
      <div className="mb-6 flex items-center space-x-4 justify-between rounded-s-xl">
        <img
          src="/path/to/arrow-left-icon.svg" // Replace with actual path
          alt="Back"
          onClick={onBack}
          className="text-2xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
        />
        <div className="ml-auto flex space-x-4">
          <img
            src="/path/to/edit-icon.svg" // Replace with actual path
            alt="Edit"
            className="text-xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
          />
          <img
            src="/path/to/trash-icon.svg" // Replace with actual path
            alt="Delete"
            className="text-xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-0 bg-[var(--mutedGreen)] p-10 rounded-t-lg">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.name}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.name}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.name}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.age}
            </span>
          </div>
        </div>

        <div className="flex flex-auto gap-6">
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.block}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.lot}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.birthday}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.sex}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.status}
            </span>
          </div>
        </div>
        <div className="flex flex-auto gap-6">
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.facebook}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.occupation}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.email}
            </span>
          </div>
        </div>
        <div className="flex flex-auto gap-6">
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.type}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <span className="text-lg font-medium ml-2 text-black">
              {resident.membersInHouse}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--darkerGreen)] p-10 rounded-b-lg">
        <div className="text-xl font-semibold mb-4">MEMBERS IN HOUSEHOLD:</div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-[var(--darkGreen)] text-black p-4 rounded-lg shadow-md">
            <span className="text-lg">john</span>
          </div>
          <div className="flex justify-between items-center bg-[var(--darkGreen)] text-black p-4 rounded-lg shadow-md">
            <span className="text-lg">jehn</span>
          </div>
          <div className="flex justify-between items-center bg-[var(--darkGreen)] text-black p-4 rounded-lg shadow-md">
            <span className="text-lg">jihn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;
