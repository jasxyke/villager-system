import React from "react";
import useTopResidentsWithUnpaidBills from "../../hooks/Dashboard/useTopResidentsWithUnpaidBills"; // Adjust the path as needed
import LoadingElement from "../../components/LoadingScreen/LoadingElement"; // Ensure you import this component

const MostUnpaid = () => {
  const { residents, loading, error } = useTopResidentsWithUnpaidBills();

  return (
    <div className="border w-full sm:w-5/12 border bg-gradient-to-r from-green to-green rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="p-4 rounded-xl">
        <div className="bg-oliveGreen p-4 rounded-t-md text-white font-semibold text-lg">
          Most Unpaid Residents
        </div>
        <div className="rounded-b-md min-h-auto max-h-[300px] overflow-y-auto overflow-x-hidden">
          {/* Loading state */}
          {loading && (
            <div className="pt-5 pb-5">
              <LoadingElement color="green" hasMargin={true} />
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="p-4 text-center text-red-500">
              Error: {error.message}
            </div>
          )}

          {/* If residents list is empty */}
          {!loading && !error && residents.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No residents with unpaid bills.
            </div>
          )}
          {!loading &&
            !error &&
            residents.length > 0 &&
            residents.map((resident) => (
              <div
                key={resident.id}
                className="flex items-center gap-6 p-4 bg-white hover:bg-gray-200 cursor-pointer shadow-md transition-transform duration-300 transform hover:scale-105"
              >
                <div className="flex flex-1 flex-col">
                  <div className="text-lg font-semibold text-gray-900">
                    {resident.user.firstname} {resident.user.lastname}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-500">
                      {resident.house
                        ? `BLK ${resident.house.block} LOT ${resident.house.lot}`
                        : "Unknown House"}
                    </div>
                    {/* <div className="text-sm text-red-500 font-semibold">
                      {resident.bills_count} overdue bills
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MostUnpaid;
