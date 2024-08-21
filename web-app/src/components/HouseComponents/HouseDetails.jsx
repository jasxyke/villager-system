import React, { useState } from "react";
import arrowLeftIcon from "../../assets/icons/arrow-left.png";
import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/trash.png";
import userIcon from "../../assets/icons/profile.png";
import bookIcon from "../../assets/icons/Book.png";
import usersIcon from "../../assets/icons/Users.png";
import homeIcon from "../../assets/icons/Home.png";
import mapMarkerIcon from "../../assets/icons/map-marker.png";
import plusCircleIcon from "../../assets/icons/plus-circle.png";

const ITEMS_PER_PAGE = 5;

const HouseDetails = ({
  lot,
  blockName,
  onBack,
  onAddMember,
  newMember,
  setNewMember,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberType, setMemberType] = useState("Family");

  const [currentPage, setCurrentPage] = useState(1);

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      onAddMember({ name: newMember, type: memberType });
      setNewMember("");
      setIsModalOpen(false);
    }
  };

  const totalPages = Math.ceil(lot.members.length / ITEMS_PER_PAGE);

  const paginatedMembers = lot.members.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative bg-[var(--darkGreen)] text-white rounded-lg p-6 shadow-lg rounded-s-xl">
      <div className="mb-6 flex items-center space-x-4 justify-between rounded-s-xl">
        <img
          src={arrowLeftIcon}
          alt="Back"
          onClick={onBack}
          className="text-2xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
        />
        <div className="ml-auto flex space-x-4">
          {/*<img
            src={editIcon}
            alt="Edit"
            className="text-xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
          />
          <img
            src={trashIcon}
            alt="Delete"
            className="text-xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
          />*/}
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-0 bg-[var(--mutedGreen)] p-10 rounded-t-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center w-8/12 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <img
              src={userIcon}
              alt="User"
              className="text-5xl text-white p-2 w-12 h-12"
            />
            <span className="w-1 h-full bg-[var(--mutedGreen)]" />
            <span className="text-lg font-medium ml-2 text-black">
              {lot.resident}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <img
              src={bookIcon}
              alt="Book"
              className="text-5xl text-white p-2 w-12 h-12"
            />
            <span className="w-1 h-full bg-[var(--mutedGreen)]" />
            <span className="text-lg font-medium ml-2 text-black">
              OWNER
              {/*lot.ownerStatus*/}
            </span>
          </div>
        </div>

        <div className="flex flex-auto gap-4">
          <div className="flex items-center w-72 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <img
              src={usersIcon}
              alt="Users"
              className="text-5xl text-white p-2 w-12 h-12"
            />
            <span className="w-1 h-full bg-[var(--mutedGreen)]" />
            <span className="text-lg font-medium ml-2 text-black">
              {lot.members.length} MEMBERS
            </span>
          </div>
          <div className="flex items-center w-4/12 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <img
              src={homeIcon}
              alt="Home"
              className="text-5xl text-white p-2 w-12 h-12"
            />
            <span className="w-1 h-full bg-[var(--mutedGreen)]" />
            <span className="text-lg font-medium ml-2 text-black">
              {blockName}
            </span>
          </div>
          <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-[var(--darkGreen)]">
            <img
              src={mapMarkerIcon}
              alt="Map Marker"
              className="text-5xl text-white p-2 w-12 h-12"
            />
            <span className="w-1 h-full bg-[var(--mutedGreen)]" />
            <span className="text-lg font-medium ml-2 text-black">
              LOT {lot.lot}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--darkerGreen)] p-10 rounded-b-lg">
        <div className="text-xl font-semibold mb-4">Members:</div>
        {paginatedMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[var(--darkGreen)] text-black flex justify-between items-center px-4 py-3 rounded-lg mb-3 shadow-md hover:bg-[var(--mutedGreen)] transition-colors"
          >
            <span className="text-lg">{member.name}</span>
            <span className="text-lg ml-6">{member.type}</span>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[var(--darkGreen)] text-black px-4 py-2 rounded-lg shadow-md hover:bg-[var(--mutedGreen)]"
            >
              prev
            </button>
            <span className="text-lg text-black">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[var(--darkGreen)] text-black px-4 py-2 rounded-lg shadow-md hover:bg-[var(--mutedGreen)]"
            >
              next
            </button>
          </div>
        )}
        {/*lot.members.map((member, index) => (
          <div
            key={index}
            className="bg-[var(--darkGreen)] text-black flex justify-between items-center px-4 py-3 rounded-lg mb-3 shadow-md hover:bg-[var(--mutedGreen)] transition-colors"
          >
            <span className="text-lg">{member.name}</span>
            <span className="text-lg ml-6">{member.type}</span>
          </div>
        ))*/}

        <div
          className="flex items-center  mt-6 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <button className="bg-[var(--darkGreen)] text-black flex justify-between items-center px-4 py-3 rounded-lg mb-3 shadow-md hover:bg-[var(--mutedGreen)] transition-colors">
            ➕ Add Data
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Add New Member
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="New Member Name"
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--trip)] transition-shadow"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                value={memberType}
                onChange={(e) => setMemberType(e.target.value)}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--trip)] transition-shadow"
              >
                <option value="Family">Family</option>
                <option value="Employee">Employee</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddMember}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
