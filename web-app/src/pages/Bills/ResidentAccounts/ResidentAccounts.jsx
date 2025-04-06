import React, { useEffect, useState } from "react";
import { formatUserName } from "../../../utils/DataFormatter";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import OverdueViewDetails from "../OverdueViewDetails";
import useHomeowners from "../../../hooks/Residents/useHomeowners";

const ResidentAccounts = () => {
  const { homeowners, fetchHomeowners, loading, error, currentPage, lastPage } =
    useHomeowners(); // Use useHomeowners instead of useResidents
  const [selectedResident, setSelectedResident] = useState(null);

  useEffect(() => {
    fetchHomeowners(currentPage); // Fetch homeowners when component mounts
  }, [currentPage]);

  const handleViewClick = (resident) => setSelectedResident(resident);
  const handleBack = () => setSelectedResident(null);

  const handleSuccess = () => {
    fetchHomeowners(currentPage); // Re-fetch homeowners after a successful action
  };

  if (selectedResident) {
    return (
      <OverdueViewDetails
        resident={selectedResident}
        onBack={handleBack}
        onSucess={handleSuccess}
      />
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {/* Header row */}
        <div className="grid grid-cols-4 bg-oliveGreen text-white font-semibold p-4">
          <div className="text-center px-2">Homeowners</div>
          <div className="text-center px-2">Block</div>
          <div className="text-center px-2">Lot</div>
          <div className="text-center px-2">Action</div>
        </div>

        {/* Data rows */}
        <div className="divide-y">
          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <LoadingContainer color="green" size={50} />
            </div>
          ) : homeowners.length > 0 ? (
            homeowners.map((homeowner, index) => (
              <div
                key={homeowner.id}
                className={`grid grid-cols-4 p-2 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-100 items-center`}
              >
                <div className="text-center p-2 truncate max-w-xs">
                  {formatUserName(homeowner.resident, true)}{" "}
                  {/* Adjusted to work with homeowner */}
                </div>
                <div className="text-center p-2">
                  {homeowner.resident.house.block}{" "}
                  {/* Adjusted to access house block */}
                </div>
                <div className="text-center p-2">
                  {homeowner.resident.house.lot}{" "}
                  {/* Adjusted to access house lot */}
                </div>
                <div className="text-center">
                  <button
                    className="bg-green p-2 text-white rounded-lg hover:bg-secondary w-20"
                    onClick={() => handleViewClick(homeowner)} // Passing homeowner
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-2">No homeowners found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentAccounts;
