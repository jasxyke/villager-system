import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaBook, FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";
import { ROLE_TYPES_RESIDENT } from "../../data/contants";
import useResidents from "../../hooks/useResidents";
import { formatFullName } from "../../utils/DataFormatter";
import AddResidentModal from "./AddResidentModal";
import EditResident from "./EditResident";

const HouseDetails = ({ house, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residents, setResidents] = useState(house.residents);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  const { addResident, editResident } = useResidents();

  const handleSuccess = (message, newMember) => {
    alert(message);
    setResidents([...residents, newMember]);
  };

  const handleError = (msg) => {
    alert(msg);
  };

  const handleAddMember = (newMember) => {
    const newMemberData = { ...newMember, houseId: house.id };
    addResident(newMemberData, handleSuccess, handleError);
  };

  const handleResidentUpdate = (editedResident) => {
    const newResidents = residents.map((resident) =>
      resident.id === editedResident.id ? editedResident : resident
    );

    setResidents(newResidents);
  };

  return (
    <div className="relative bg-primary text-white rounded-lg shadow-lg rounded-s-xl">
      {!isEditing ? (
        <div className="pt-6">
          <div className="mb-2 px-6 flex items-center space-x-4 justify-between rounded-s-xl">
            <IoMdArrowBack size={30} color="white" onClick={onBack} />
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

          <div className="flex flex-col gap-6 mb-0 bg-primary p-10 rounded-t-lg">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center w-8/12 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
                <FaRegUserCircle size={40} color="black" />
                <span className="w-[2px] h-full bg-black" />

                <span className="text-lg font-medium ml-2 text-black">
                  {residents.map((resident) =>
                    resident.user.role_type === "home_owner"
                      ? formatFullName(
                          resident.user.firstname,
                          resident.user.middlename,
                          resident.user.lastname,
                          false
                        )
                      : null
                  )}
                </span>
              </div>
              <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
                <FaBook size={40} color="black" />
                <span className="w-[2px] h-full bg-black" />
                <span className="text-lg font-medium ml-2 text-black">
                  OWNER
                  {/*lot.ownerStatus*/}
                </span>
              </div>
            </div>

            <div className="flex flex-auto gap-4">
              <div className="flex items-center w-72 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
                <MdPeopleOutline size={40} color="black" />
                <span className="w-[2px] h-full bg-black" />
                <span className="text-lg font-medium ml-2 text-black">
                  {residents.length} MEMBERS
                </span>
              </div>
              <div className="flex items-center w-4/12 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
                <IoLocationOutline size={40} color="black" />
                <span className="w-[2px] h-full bg-black" />
                <span className="text-lg font-medium ml-2 text-black">
                  BLOCK {house.block}
                </span>
              </div>
              <div className="flex items-center w-64 h-14 rounded-xl gap-2.5 pl-2.5 border-transparent bg-greyGreen shadow-lg">
                <IoLocationOutline size={40} color="black" />
                <span className="w-[2px] h-full bg-black" />
                <span className="text-lg font-medium ml-2 text-black">
                  LOT {house.lot}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-b-lg">
            <div className="text-xl font-semibold mb-4 px-5">Members:</div>
            {residents.map((member, index) => (
              <div
                onClick={() => {
                  console.log(member);
                  setSelectedResident(member);
                  setIsEditing(true);
                }}
                key={index}
                className="bg-greyGreen text-black flex border-b-2 border-primary justify-between items-center px-9 py-5 shadow-md hover:bg-secondary cursor-pointer transition-colors"
              >
                <span className="text-lg">
                  {formatFullName(
                    member.user.firstname,
                    member.user.middlename,
                    member.user.lastname,
                    false
                  )}
                </span>
                <span className="text-lg ml-6">
                  {ROLE_TYPES_RESIDENT.map(
                    (role) => role.value === member.user.role_type && role.text
                  )}
                </span>
              </div>
            ))}

            <AddResidentModal
              isModalOpen={isModalOpen}
              onAddMember={handleAddMember}
              onModalClose={() => setIsModalOpen(false)}
            />

            <div
              onClick={() => setIsModalOpen(true)}
              className="bg-greyGreen text-black flex border-b-2 border-primary justify-between items-center px-9 py-4 shadow-md hover:bg-secondary cursor-pointer transition-colors"
            >
              <div className="flex justify-center items-center text-lg text-white ">
                <CiCirclePlus size={40} color="white" className="mr-2" /> ADD
                DATA
              </div>
              {/* <button
    
            className="bg-greyGreen text-white flex justify-between items-center px-4 py-3 rounded-lg mb-3 shadow-md hover:bg-[var(--mutedGreen)] transition-colors"
          >
            <CiCirclePlus size={40} color="white" className="mr-2" /> Add Data
          </button> */}
            </div>
          </div>
        </div>
      ) : (
        <EditResident
          resident={selectedResident}
          onBack={() => setIsEditing(false)}
          editResident={editResident}
          updateResident={handleResidentUpdate}
          house={house}
        />
      )}
    </div>
  );
};

export default HouseDetails;
