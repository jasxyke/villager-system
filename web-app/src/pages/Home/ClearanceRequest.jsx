import React from "react";

const ClearanceRequest = () => {
  const requests = [
    {
      id: 1,
      requester: "John Doe",
      date: "2024-11-20",
      status: "Pending",
      actions: "View/Edit",
    },
    {
      id: 2,
      requester: "Jane Smith",
      date: "2024-11-22",
      status: "Approved",
      actions: "View",
    },
    {
      id: 3,
      requester: "Mark Wilson",
      date: "2024-11-23",
      status: "Rejected",
      actions: "View",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
        Clearance Requests
      </h2>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full bg-green rounded-lg shadow-lg">
          <div className="flex bg-green text-white text-sm font-semibold p-3">
            <div className="w-1/4 text-center">Requester</div>
            <div className="w-1/4 text-center">Date Requested</div>
            <div className="w-1/4 text-center">Status</div>
            <div className="w-1/4 text-center">Actions</div>
          </div>

          {/* Render table rows */}
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex p-3 border-t bg-white text-black border-gray-300"
            >
              <div className="w-1/4 text-center">{request.requester}</div>
              <div className="w-1/4 text-center">{request.date}</div>
              <div
                className={`w-1/4 text-center font-semibold ${
                  request.status === "Approved"
                    ? "text-green-600"
                    : request.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {request.status}
              </div>
              <div className="w-1/4 text-center">
                <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600">
                  {request.actions}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClearanceRequest;
