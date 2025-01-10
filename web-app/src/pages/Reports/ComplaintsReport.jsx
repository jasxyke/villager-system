import React, { useEffect } from "react";
import { FiPrinter } from "react-icons/fi";
import useComplaintsReports from "../../hooks/Reports/useComplaintsReports";
import { formatUserName } from "../../utils/DataFormatter";

const ComplaintsReport = () => {
  const {
    loading,
    error,
    complaintsData,
    fetchComplaintsReport,
    fetchComplaintsData,
  } = useComplaintsReports();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchComplaintsData();
  }, []);

  const handlePrintClick = async () => {
    await fetchComplaintsReport();
  };

  if (loading || complaintsData)
    return (
      <div className="flex w-full h-full">
        <div
          className="bg-oliveGreen flex-grow p-4 overflow-auto"
          style={{ maxHeight: "500px" }}
        >
          <h1 className="text-center p-2 font-bold text-white text-2xl">
            COMPLAINTS REPORT
          </h1>

          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : complaintsData.length === 0 ? (
            <p className="text-center text-white">No data</p>
          ) : (
            <div className="w-full shadow-lg">
              <div className="flex items-center justify-between font-medium rounded-t-lg bg-mutedGreen p-4 text-center">
                <div className="flex-1">Resident Name</div>
                <div className="flex-1">Complaint Type</div>
                <div className="flex-1">Date Sent</div>
                <div className="flex-1">Status</div>
                <div className="flex-1">Message</div>
                <div className="flex-1">Remarks</div>
              </div>
              <div className="overflow-y-auto max-h-60">
                {/* Add scrollable area for data */}
                {complaintsData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 p-3 border text-white mb-2"
                  >
                    <div className="text-center">
                      {formatUserName(item.resident.user, false)}
                    </div>
                    <div className="text-center">{item.type}</div>
                    <div className="text-center">{item.date_sent}</div>
                    <div className="text-center">{item.status}</div>
                    <div className="text-center">{item.message}</div>
                    <div className="text-center">{item.remarks}</div>
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

export default ComplaintsReport;
