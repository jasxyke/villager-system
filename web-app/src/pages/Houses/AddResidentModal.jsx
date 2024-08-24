import React, { useState } from "react";
import {
  CIVIL_STATUSES,
  OCCUPATION_STATUSES,
  ROLE_TYPES_RESIDENT,
  SEX_TYPES,
} from "../../data/contants";
import TextInput from "../../components/forms/TextInput";
import SelectInput from "../../components/forms/SelectInput";

const AddResidentModal = ({ isModalOpen, onModalClose, onAddMember }) => {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [roleType, setRoleType] = useState(ROLE_TYPES_RESIDENT[0].value);
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState(SEX_TYPES[0].value);
  const [civilStatus, setCivilStatus] = useState(CIVIL_STATUSES[0].value);
  const [facebook, setFacebook] = useState("");
  const [occupation, setOccupation] = useState(OCCUPATION_STATUSES[0].value);

  const handleAddMember = () => {
    const residentData = {
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      birthdate: birthdate,
      sex: sex,
      civilStatus: civilStatus,
      facebook: facebook,
      occupation: occupation,
      email: email,
      contactNum: contactNum,
      roleType: roleType,
    };

    onAddMember(residentData);
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Add New Member
            </h2>
            <div className="grid grid-cols-2 gap-x-6">
              <TextInput
                label={"Last Name"}
                value={lastname}
                changeText={setLastname}
              />
              <TextInput
                label={"First Name"}
                value={firstname}
                changeText={setFirstname}
              />
              <TextInput
                label={"Middle Name"}
                value={middlename}
                changeText={setMiddlename}
              />
              <TextInput label={"Email"} value={email} changeText={setEmail} />
              <TextInput
                label={"Contact Number"}
                value={contactNum}
                changeText={setContactNum}
              />
              <div className="mb-2">
                <p className="text-black mb-1">Birthdte</p>
                <input
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  type="date"
                  className="border w-full rounded-md p-2 bg-white text-black"
                />
              </div>
              <SelectInput
                label={"Sex"}
                value={sex}
                onChangeValue={setSex}
                list={SEX_TYPES}
              />
              <SelectInput
                label={"Civil Status"}
                value={civilStatus}
                onChangeValue={setCivilStatus}
                list={CIVIL_STATUSES}
              />
              <SelectInput
                label={"Occupation Status"}
                value={occupation}
                onChangeValue={setOccupation}
                list={OCCUPATION_STATUSES}
              />
              <SelectInput
                label={"Resident type"}
                value={roleType}
                onChangeValue={setRoleType}
                list={ROLE_TYPES_RESIDENT}
              />
            </div>
            <TextInput
              label={"Facebook"}
              value={facebook}
              changeText={setFacebook}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddMember}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                Add
              </button>
              <button
                onClick={onModalClose}
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

export default AddResidentModal;
