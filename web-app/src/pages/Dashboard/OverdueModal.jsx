import React from "react";

const OverdueModal = ({
  isOpen,
  onClose,
  overdueResidents,
  loading,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Unpaid Residents</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          {loading ? (
            <p>Loading overdue residents...</p> // Improved message
          ) : error ? (
            <p className="text-red-500">{error}</p> // Error handling
          ) : overdueResidents.length === 0 ? (
            <p>No overdue residents</p>
          ) : (
            <ul>
              {overdueResidents.map((resident, index) => (
                <li key={index} className="flex justify-between py-2">
                  <div>
                    <p className="font-semibold">
                      {resident.resident.user.firstname}{" "}
                      {resident.resident.user.lastname}
                    </p>
                    <p className="text-sm text-gray-500">
                      {resident.resident.house.address}
                    </p>
                  </div>
                  <p className="text-red-500 font-semibold">
                    {resident.amount_due}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#718355] text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverdueModal;
