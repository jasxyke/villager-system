import React, { useState } from "react";
import { calculateAge, formatFullName } from "../../../utils/DataFormatter";
import ResidentDetail from "./ResidentDetail";
import SelectOptions from "../../../components/forms/SelectOptions";
import {
  CIVIL_STATUSES,
  OCCUPATION_STATUSES,
  ROLE_TYPES_RESIDENT,
  SEX_TYPES,
} from "../../../data/contants";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import useResidents from "../../../hooks/useResidents";
import ResidentHistoryDetails from "./ResidentHistoryDetails";

const ResidentDetails = ({
  resident,
  onBack,
  editResident,
  updateResident,
}) => {
  const [lastname, setLastname] = useState(resident.lastname);
  const [firstname, setFirstname] = useState(resident.firstname);
  const [middlename, setMiddlename] = useState(resident.middlename);
  const [contactNum, setContactNum] = useState(resident.contact_number);
  const [age, setAge] = useState(calculateAge(resident.resident.birthdate));
  const [block, setBlock] = useState(resident.resident.house.block);
  const [lot, setLot] = useState(resident.resident.house.lot);
  const [birthdate, setBirthdate] = useState(resident.resident.birthdate);
  const [sex, setSex] = useState(resident.resident.sex);
  const [civilStatus, setCivilStatus] = useState(
    resident.resident.civil_status
  );
  const [facebook, setFacebook] = useState(resident.resident.fb_name);
  const [occupation, setOccupation] = useState(
    resident.resident.occupation_status
  );
  const [email, setEmail] = useState(resident.email);
  const [roleType, setRoleType] = useState(resident.role_type);
  const [familyMembers, setFamilyMembers] = useState(
    resident.family_members || []
  );

  const onSuccess = (msg, editedResident) => {
    alert(msg);
    updateResident(editedResident);
    return;
  };

  const onError = (msg) => {
    alert(msg);
  };

  const saveEdit = () => {
    const editedResident = {
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      birthdate: birthdate,
      sex: sex,
      civilStatus: civilStatus,
      facebook: facebook,
      occupation: occupation,
      email: email,
      roleType: roleType,
      contactNum: contactNum,
    };

    console.log(editedResident);

    editResident(resident.id, editedResident, onSuccess, onError);
  };

  const deleteResident = () => {
    //
  };

  return (
    <div className="w-full text-white rounded-lg p-6 flex flex-col items-center space-y-10">
      <div className="w-full flex justify-start items-center mb-8">
        <IoMdArrowRoundBack
          className="cursor-pointer text-white hover:text-[#87986A] transition-transform duration-300 transform hover:scale-110"
          size={30}
          onClick={onBack}
        />
        <div className="ml-auto flex space-x-4">
          <FaTrashAlt
            size={25}
            className="cursor-pointer"
            onClick={deleteResident}
          />
        </div>
      </div>

      <div className="bg-primary rounded-lg p-4">
        <div className="relative bottom-20 flex flex-col justify-center items-center space-y-4 mb-10">
          <div className="w-32 h-32 bg-primary rounded-full border-4 border-green flex justify-center items-center text-white text-4xl shadow-xl">
            <span className="font-bold">{firstname[0]}</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">
            {formatFullName(firstname, middlename, lastname)}
          </h2>
          <p className="text-lg text-greyGreen italic">{roleType}</p>
        </div>

        <div className="w-full max-w-5xl relative bottom-24">
          <div className="p-8 rounded-2xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* NAME */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Full Name
                </label>
                <div className="bg-mutedGreen rounded-md p-5 text-black text-center">
                  {formatFullName(firstname, middlename, lastname)}
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Contact Number
                </label>
                <div className="bg-mutedGreen rounded-md p-5 text-black text-center">
                  {contactNum}
                </div>
              </div>

              {/* AGE AND GENDER */}
              <div className="flex space-x-10">
                {/* AGE */}
                <div>
                  <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                    Age
                  </label>
                  <div className="bg-mutedGreen rounded-md w-52 p-5 text-black text-center">
                    {age}
                  </div>
                </div>

                {/* GENDER */}
                <div>
                  <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                    Gender
                  </label>
                  <div className="bg-mutedGreen rounded-md w-52 p-5 text-black text-center">
                    {sex}
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Email Address
                </label>
                <div className="bg-mutedGreen rounded-md p-5 text-black text-center">
                  {email}
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Address
                </label>
                <div className="bg-mutedGreen rounded-md p-5 text-black text-center">{`${block} ${lot}`}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* BIRTHDAY */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Birthday
                </label>
                <div className="bg-mutedGreen p-4 rounded-md text-center text-black">
                  {birthdate}
                </div>
              </div>

              {/* FACEBOOK */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Facebook URL
                </label>
                <div className="bg-mutedGreen p-4 rounded-md text-center text-black">
                  {facebook}
                </div>
              </div>

              {/* OCCUPATION */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Occupation
                </label>
                <div className="bg-mutedGreen p-4 rounded-md text-center text-black">
                  {occupation}
                </div>
              </div>

              {/* CIVIL STATUS */}
              <div>
                <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                  Civil Status
                </label>
                <div className="bg-mutedGreen p-4 rounded-md text-center text-black">
                  {civilStatus}
                </div>
              </div>
            </div>

            <div>
              <label className="bg-mutedGreen rounded-t-md p-4 text-black font-bold">
                MEMBERS
              </label>
              <div className="bg-mutedGreen p-4 rounded-md text-center text-black h-16">
                {familyMembers}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={saveEdit}
            className="flex items-center justify-center gap-x-3 bg-mutedGreen text-black rounded-md p-3 px-8 hover:bg-secondary transition-all duration-200 transform hover:scale-105"
          >
            <FaEdit className="w-6 h-6" /> {/* Use the React Icon here */}
            <p className="font-semibold text-lg">Save Edit</p>
          </button>
        </div>
      </div>

      <ResidentHistoryDetails />
    </div>
  );
};

export default ResidentDetails;
