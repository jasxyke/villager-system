import React, { useState } from "react";
import SelectInput from "../../components/forms/SelectInput";
import TextInput from "../../components/forms/TextInput";
import {
  CIVIL_STATUSES,
  HouseTypes,
  OCCUPATION_STATUSES,
  SEX_TYPES,
} from "../../data/contants";

const AddHouse = ({ onAdd, onClose, loading, blocks }) => {
  const [blockNumber, setBlockNumber] = useState(blocks[0]);
  const [lotNumber, setLotNumber] = useState("");
  const [houseType, setHouseType] = useState(HouseTypes[0].value);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState(SEX_TYPES[0].value);
  const [civilStatus, setCivilStatus] = useState(CIVIL_STATUSES[0].value);
  const [facebook, setFacebook] = useState("");
  const [occupation, setOccupation] = useState(OCCUPATION_STATUSES[0].value);

  // State for error messages
  const [errors, setErrors] = useState({});

  const handleLotNumberChange = (e) => {
    const value = e.target.value;

    // Ensure the value is a number, and it's less than or equal to 99
    if (/^\d*$/.test(value) && value.length <= 2) {
      setLotNumber(value);
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!lotNumber || isNaN(lotNumber) || lotNumber <= 0 || lotNumber > 99) {
      newErrors.lotNumber = "Please enter a valid lot number between 1 and 99.";
    }

    if (!lastname.trim()) {
      newErrors.lastname = "Last name is required.";
    }

    if (!firstname.trim()) {
      newErrors.firstname = "First name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!contactNum.trim()) {
      newErrors.contactNum = "Contact number is required.";
    } else if (!/^\d{10,15}$/.test(contactNum)) {
      newErrors.contactNum = "Contact number should be 10 to 15 digits long.";
    }

    if (!birthdate.trim()) {
      newErrors.birthdate = "Birthdate is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleAddHouse = () => {
    if (!validateInputs()) {
      return;
    }

    const houseData = {
      block: blockNumber,
      lot: Number(lotNumber),
      houseType: houseType,
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      birthdate: birthdate,
      sex: sex,
      civilStatus: civilStatus,
      facebook: facebook,
      occupation: occupation,
      email: email,
      contactNumber: contactNum,
    };

    console.log(houseData);

    onAdd(houseData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-[50%] h-[95%] overflow-y-auto">
        <h2 className="pb-2 text-xl font-semibold mb-4 border-black border-b-2">
          Add New House
        </h2>
        <div className="grid gap-x-6 grid-cols-2">
          <div className="">
            <label className="block text-sm font-medium mb-1">
              Block Number:
            </label>
            <select
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              {blocks.map((block) => (
                <option key={block} value={block}>
                  Block {block}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-1">
              Lot Number:
            </label>
            <input
              type="number"
              value={lotNumber}
              onChange={handleLotNumberChange}
              placeholder="Enter a number between 1 and 99"
              className={`w-full border p-2 rounded ${
                errors.lotNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lotNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.lotNumber}</p>
            )}
          </div>
          <SelectInput
            label={"House type"}
            value={houseType}
            onChangeValue={setHouseType}
            list={HouseTypes}
          />
        </div>

        <div className="mb-4 mt-5">
          <h2 className="text-lg font-semibold pb-2 border-b-2 border-black mb-3">
            Home Owner
          </h2>
          <div className="grid grid-cols-2 gap-x-6">
            <TextInput
              label={"Last Name"}
              value={lastname}
              changeText={setLastname}
              error={errors.lastname}
            />
            <TextInput
              label={"First Name"}
              value={firstname}
              changeText={setFirstname}
              error={errors.firstname}
            />
            <TextInput
              label={"Middle Name"}
              value={middlename}
              changeText={setMiddlename}
            />
            <TextInput
              label={"Email"}
              value={email}
              changeText={setEmail}
              error={errors.email}
            />
            <TextInput
              label={"Contact Number"}
              value={contactNum}
              changeText={setContactNum}
              error={errors.contactNum}
            />
            <div className="mb-2">
              <p className="text-black mb-1">Birthdate</p>
              <input
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                type="date"
                className={`border w-full rounded-md p-2 bg-white text-black ${
                  errors.birthdate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
              )}
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
            <TextInput
              label={"Facebook"}
              value={facebook}
              changeText={setFacebook}
            />
            <SelectInput
              label={"Occupation Status"}
              value={occupation}
              onChangeValue={setOccupation}
              list={OCCUPATION_STATUSES}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleAddHouse}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add House
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHouse;
