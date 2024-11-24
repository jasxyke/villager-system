import React from "react";

const AmenitiesSchedule = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
        Amenities Schedule
      </h2>

      {/* Basketball Court Schedule */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black mb-4">
          Basketball Court
        </h3>
        <div className="overflow-x-auto bg-green rounded-lg shadow-lg">
          <div className="flex bg-green-500 text-white text-sm font-semibold p-3">
            <div className="w-1/4 text-center">Day</div>
            <div className="w-1/4 text-center">Time</div>
            <div className="w-1/4 text-center">Status</div>
          </div>
          <div className="flex p-3 border-t border-gray-300">
            <div className="w-1/4 text-center">Monday - Friday</div>
            <div className="w-1/4 text-center">6:00 AM - 10:00 PM</div>
            <div className="w-1/4 text-center text-green-600">Available</div>
          </div>
          <div className="flex p-3 border-t border-gray-300">
            <div className="w-1/4 text-center">Saturday</div>
            <div className="w-1/4 text-center">8:00 AM - 6:00 PM</div>
            <div className="w-1/4 text-center text-green-600">Available</div>
          </div>
          <div className="flex p-3 border-t border-gray-300">
            <div className="w-1/4 text-center">Sunday</div>
            <div className="w-1/4 text-center">Closed</div>
            <div className="w-1/4 text-center text-red-600">Not Available</div>
          </div>
        </div>
      </div>

      {/* Multi-Purpose Hall Schedule */}
      <div>
        <h3 className="text-xl font-semibold text-black mb-4">
          Multi-Purpose Hall
        </h3>
        <div className="overflow-x-auto bg-green rounded-lg shadow-lg">
          <div className="flex bg-green-500 text-white text-sm font-semibold p-3">
            <div className="w-1/4 text-center">Day</div>
            <div className="w-1/4 text-center">Time</div>
            <div className="w-1/4 text-center">Status</div>
          </div>
          <div className="flex p-3 border-t border-gray-300">
            <div className="w-1/4 text-center">Monday - Friday</div>
            <div className="w-1/4 text-center">8:00 AM - 8:00 PM</div>
            <div className="w-1/4 text-center text-green-600">Available</div>
          </div>
          <div className="flex p-3 border-t border-gray-300">
            <div className="w-1/4 text-center">Saturday</div>
            <div className="w-1/4 text-center">10:00 AM - 5:00 PM</div>
            <div className="w-1/4 text-center text-green-600">Available</div>
          </div>
          <div className="flex p-3 border-t border-gray-300">
            <div className="w-1/4 text-center">Sunday</div>
            <div className="w-1/4 text-center">Closed</div>
            <div className="w-1/4 text-center text-red-600">Not Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSchedule;
