import React, { useState } from "react";
import backArrow from "../../../assets/icons/arrow-left.png";
import editICon from "../../../assets/icons/edit.png";
import trashIcon from "../../../assets/icons/trash.png";
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

const ResidentDetails = ({
  resident,
  onBack,
  editResident,
  updateResident,
}) => {
  const [lastname, setLastname] = useState(resident.lastname);
  const [firstname, setFirstname] = useState(resident.firstname);
  const [middlename, setMiddlename] = useState(resident.middlename);
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

  const onSuccess = (msg, editedResident) => {
    alert(msg);
    updateResident(editedResident);
    return;

    setLastname(editedResident.lastname);
    setFirstname(editedResident.firstname);
    setMiddlename(editedResident.middlename);
    setAge(calculateAge(editedResident.resident.birthdate));
    setBirthdate(editedResident.resident.birthdate);
    setCivilStatus(editedResident.resident.civil_status);
    setFacebook(editedResident.resident.fb_name);
    setOccupation(editedResident.resident.occupcation_status);
    setEmail(resident.email);
    setRoleType(editedResident.role_type);
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
    };

    console.log(editedResident);

    editResident(resident.id, editedResident, onSuccess, onError);
  };

  const deleteResident = () => {
    //
  };
  return (
    <div className="w-full bg-green text-white rounded-lg p-6 shadow-lg rounded-s-xl">
      <div className="mb-6 flex items-center space-x-4 justify-between rounded-s-xl">
        <IoMdArrowRoundBack
          className="cursor-pointer"
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
      <div className="flex flex-wrap gap-x-10 gap-y-2 mb-5">
        <ResidentDetail
          label={"Last name"}
          value={lastname}
          changeText={setLastname}
        />
        <ResidentDetail
          label={"First name"}
          value={firstname}
          changeText={setFirstname}
        />
        <ResidentDetail
          label={"Middle name"}
          value={middlename}
          changeText={setMiddlename}
        />
        <ResidentDetail
          label={"Age"}
          value={age}
          disabled={true}
          width={"100px"}
        />
        <ResidentDetail
          label={"Block"}
          value={block}
          changeText={setBlock}
          width={"100px"}
          disabled={true}
        />
        <ResidentDetail
          label={"Lot"}
          value={lot}
          changeText={setLot}
          width={"100px"}
          disabled={true}
        />
        <div>
          <p className="text-white mb-1">Birthdate</p>
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            className="rounded-md text-center py-2 px-3 bg-greyGreen text-black"
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <SelectOptions
          list={SEX_TYPES}
          value={sex}
          label={"Sex"}
          onChangeValue={setSex}
        />
        <SelectOptions
          list={CIVIL_STATUSES}
          value={civilStatus}
          label={"Civil status"}
          onChangeValue={setCivilStatus}
        />
        <ResidentDetail
          label={"Facebook"}
          value={facebook}
          onChangeValue={setFacebook}
        />
        <SelectOptions
          list={OCCUPATION_STATUSES}
          value={occupation}
          label={"Occupation"}
          onChangeValue={setOccupation}
        />
        <ResidentDetail
          label={"Email"}
          value={email}
          onChangeValue={setEmail}
        />
        <SelectOptions
          list={ROLE_TYPES_RESIDENT}
          value={roleType}
          onChangeValue={setRoleType}
          label={"Resident Type"}
        />
      </div>
      <div className="flex justify-end">
        <button
          value={"Save"}
          onClick={saveEdit}
          className="rounded-md bg-paleGreen p-2 px-10 flex justify-center gap-x-3"
        >
          <img
            src={editICon}
            alt="Edit"
            className="text-2xl cursor-pointer hover:text-secondary transition-colors w-6 h-6"
          />
          <p>Save Edit</p>
        </button>
      </div>
      {/* check ko kung kakailanganin pa to */}
      {/* <div className="bg-[var(--darkerGreen)] p-10 rounded-b-lg">
        <div className="text-xl font-semibold mb-4">MEMBERS IN HOUSEHOLD:</div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-greyGreen text-black p-4 rounded-lg shadow-md">
            <span className="text-lg">john</span>
          </div>
          <div className="flex justify-between items-center bg-greyGreen text-black p-4 rounded-lg shadow-md">
            <span className="text-lg">jehn</span>
          </div>
          <div className="flex justify-between items-center bg-greyGreen text-black p-4 rounded-lg shadow-md">
            <span className="text-lg">jihn</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ResidentDetails;
