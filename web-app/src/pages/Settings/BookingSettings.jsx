import React, { useState } from "react";
import EditTable from "./EditTable";

const BookingSettings = () => {
  const [minHoursBasketball, setMinHoursBasketball] = useState(1);
  const [minHoursMultiPurpose, setMinHoursMultiPurpose] = useState(1);

  const editBookingSettings = () => {
    // Your edit logic here
  };

  return (
    <EditTable title={"Booking Settings"} handleSave={editBookingSettings}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
        {/* Minimum Hours of Reservation for Basketball Court */}
        <label htmlFor="minHoursBasketball" className="text-white">
          Min Hours (Basketball Court)
        </label>
        <input
          type="number"
          id="minHoursBasketball"
          value={minHoursBasketball}
          onChange={(e) => setMinHoursBasketball(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Minimum Hours of Reservation for Multi-Purpose Hall */}
        <label htmlFor="minHoursMultiPurpose" className="text-white">
          Min Hours (Multi-Purpose Hall)
        </label>
        <input
          type="number"
          id="minHoursMultiPurpose"
          value={minHoursMultiPurpose}
          onChange={(e) => setMinHoursMultiPurpose(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />
      </div>
    </EditTable>
  );
};

export default BookingSettings;
