import React, { useState } from "react";

const AddHouse = ({ onAdd, onClose }) => {
  const [blockNumber, setBlockNumber] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [resident, setResident] = useState("");
  //const [ownerStatus, setOwnerStatus] = useState("OWNER");

  const [blockNumberError, setBlockNumberError] = useState("");
  const [lotNumberError, setLotNumberError] = useState("");

  const handleLotNumberChange = (e) => {
    const value = e.target.value;

    // Ensure the value is a number, and it's less than or equal to 99
    if (/^\d*$/.test(value) && value.length <= 2) {
      setLotNumber(value);
    }
  };

  const isLotNumberExisting = (blockNum, lotNum) => {
    return existingLots.some(
      (lot) => lot.blockNumber === blockNum && lot.lotNumber === lotNum
    );
  };

  const handleAddHouse = () => {
    const blockNum = parseInt(blockNumber, 10);
    const lotNum = parseInt(lotNumber, 10);
    let hasError = false;

    /*if (blockNum <= 0 || blockNum > 10) {
      setBlockNumberError("Please enter a block number between 1 and 10.");
      hasError = true;
    } else {
      setBlockNumberError("");
    }

    if (lotNum <= 0 || lotNum > 999) {
      setLotNumberError("Please enter a lot number between 1 and 999.");
      hasError = true;
    } else {
      setLotNumberError("");
    }*/

    if (hasError) return;

    if (resident.trim() && blockNumber.trim() && lotNumber.trim()) {
      const newHouse = {
        name: `Block ${blockNum}`,
        lots: [
          {
            lot: `${lotNum}`,
            resident,
            //ownerStatus,
            members: [],
          },
        ],
      };
      onAdd(newHouse);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-[50%]">
        <h2 className="text-xl font-semibold mb-4">Add New House</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Block Number:
          </label>
          <select
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Block {i + 1}
              </option>
            ))}
          </select>
          {/*<input
            type="number"
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
            min="1"
            max="10"
            className={`w-full border p-2 rounded ${
              blockNumberError ? "border-red-500" : "border-gray-300"
            }`}
          />*/}
          {/*blockNumberError && (
            <p className="text-red-500 text-sm mt-1">{blockNumberError}</p>
          )*/}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Lot Number:</label>
          <input
            type="number"
            value={lotNumber}
            //onChange={(e) => setLotNumber(e.target.value)}\
            //min="1"
            //max="999"
            onChange={handleLotNumberChange}
            maxLength="2"
            placeholder="Enter a number between 1 and 99"
            className={`w-full border p-2 rounded ${
              lotNumberError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {/*lotNumberError && (
            <p className="text-red-500 text-sm mt-1">{lotNumberError}</p>
          )*/}
        </div>
        <div className="mb-4">
          {/*<label className="block text-sm font-medium mb-1">Resident:</label>*/}
          <label className="block text-sm font-medium mb-1">Owner:</label>
          <input
            type="text"
            value={resident}
            onChange={(e) => setResident(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/*<div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Owner Status:
          </label>
          <select
            value={ownerStatus}
            onChange={(e) => setOwnerStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="OWNER">Owner</option>
            <option value="RENTER">Renter</option>
          </select>}
        </div>*/}
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
