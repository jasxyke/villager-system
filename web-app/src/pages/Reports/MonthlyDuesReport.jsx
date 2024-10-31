import React, { useEffect } from "react";
import { FiPrinter } from "react-icons/fi";
import useMonthsBehindReports from "../../hooks/Reports/useMonthsBehindReports";

const MonthlyDuesReport = () => {
  const {
    loading,
    error,
    monthsBehindData,
    fetchMonthsBehindReport,
    fetchMonthsBehindData,
  } = useMonthsBehindReports();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchMonthsBehindData();
  }, []);

  const handlePrintClick = async () => {
    await fetchMonthsBehindReport();
  };

  console.log(monthsBehindData);

  return (
    <div className="flex w-full h-full">
      <div
        className="bg-oliveGreen flex-grow p-4 overflow-auto"
        style={{ maxHeight: "500px" }}
      >
        <h1 className="text-center p-2 font-bold text-white text-2xl">
          MONTHLY DUE PENDING SUMMARY
        </h1>

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full shadow-lg">
            <div className="flex items-center justify-between font-medium rounded-t-lg bg-mutedGreen p-4 text-center">
              <div className="flex-1">Name</div>
              <div className="flex-1">Address</div>
              <div className="flex-1">Months Behind</div>
              <div className="flex-1">Amount</div>
            </div>
            <div className="overflow-y-auto max-h-60">
              {" "}
              {/* Add scrollable area for data */}
              {monthsBehindData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 p-3 border text-white mb-2"
                >
                  <div className="text-center">{item.name}</div>
                  <div className="text-center">{item.address}</div>
                  <div className="text-center">{item.monthsBehind}</div>
                  <div className="text-center">{item.amount}</div>
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

export default MonthlyDuesReport;
