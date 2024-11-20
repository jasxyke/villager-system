import React, { useEffect } from "react";
import { FiPrinter } from "react-icons/fi";
import useResidentProfileReports from "../../hooks/Reports/useResidentProfileReports";

const ResidentProfileReport = () => {
  const {
    loading,
    error,
    residentData,
    fetchResidentProfileReport,
    fetchResidentProfileData,
  } = useResidentProfileReports();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchResidentProfileData();
  }, []);

  const handlePrintClick = async () => {
    await fetchResidentProfileReport();
  };

  console.log(residentData);
  console.log(typeof residentData);
  console.log(typeof []);

  if (loading || residentData)
    return (
      <div className="flex w-full h-full">
        <div
          className="bg-oliveGreen flex-grow p-4 overflow-auto"
          style={{ maxHeight: "500px" }}
        >
          <h1 className="text-center p-2 font-bold text-white text-2xl">
            RESIDENT PROFILE REPORT
          </h1>

          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : residentData.length === 0 ? (
            <p className="text-center text-white">No data</p>
          ) : (
            <div className="w-full shadow-lg">
              <div className="flex items-center justify-between font-medium rounded-t-lg bg-mutedGreen p-4 text-center">
                <div className="flex-1">Name</div>
                <div className="flex-1">Address</div>
                <div className="flex-1">Birthdate</div>
                <div className="flex-1">Sex</div>
                <div className="flex-1">Civil Status</div>
                <div className="flex-1">Occupation Status</div>
                <div className="flex-1">FB Name</div>
              </div>
              <div className="overflow-y-auto max-h-60">
                {/* Add scrollable area for data */}
                {residentData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 p-3 border text-white mb-2"
                  >
                    <div className="text-center">{item.name}</div>
                    <div className="text-center">{item.address}</div>
                    <div className="text-center">{item.birthdate}</div>
                    <div className="text-center">{item.sex}</div>
                    <div className="text-center">{item.civil_status}</div>
                    <div className="text-center">{item.occupation_status}</div>
                    <div className="text-center">{item.fb_name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              className="bg-secondary p-3 flex items-center space-x-2 rounded-md hover:bg-mutedGreen"
              onClick={handlePrintClick}
            >
              <FiPrinter className="text-2xl mr-2" />
              Print to Pdf
            </button>
          </div>
        </div>
      </div>
    );
};

export default ResidentProfileReport;
