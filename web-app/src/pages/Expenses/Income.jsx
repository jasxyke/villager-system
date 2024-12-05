import React, { useState } from "react";
import MonthlyDuesIncome from "./Incomes/MonthlyDuesIncome";
import ClearanceIncome from "./Incomes/ClearanceIncome";
import AmenitiesIncome from "./Incomes/AmenitiesIncome";
import StickersIncome from "./Incomes/StickersIncome";
import DateRangeSelector from "./Incomes/DateRangeSelector";

const Income = () => {
  const currentDate = new Date();
  const [selectedStartDay, setSelectedStartDay] = useState(
    currentDate.getDate()
  );
  const [selectedStartMonth, setSelectedStartMonth] = useState(
    currentDate.getMonth()
  );
  const [selectedStartYear, setSelectedStartYear] = useState(
    currentDate.getFullYear()
  );

  const [selectedEndDay, setSelectedEndDay] = useState(currentDate.getDate());
  const [selectedEndMonth, setSelectedEndMonth] = useState(
    currentDate.getMonth()
  );
  const [selectedEndYear, setSelectedEndYear] = useState(
    currentDate.getFullYear()
  );

  const handleStartDayChange = (event) =>
    setSelectedStartDay(event.target.value);
  const handleStartMonthChange = (event) =>
    setSelectedStartMonth(event.target.value);
  const handleStartYearChange = (event) =>
    setSelectedStartYear(event.target.value);

  const handleEndDayChange = (event) => setSelectedEndDay(event.target.value);
  const handleEndMonthChange = (event) =>
    setSelectedEndMonth(event.target.value);
  const handleEndYearChange = (event) => setSelectedEndYear(event.target.value);

  const getDateRange = () => {
    const startDate = new Date(
      selectedStartYear,
      selectedStartMonth,
      selectedStartDay
    );
    const endDate = new Date(selectedEndYear, selectedEndMonth, selectedEndDay);
    return `${startDate.toLocaleDateString(
      "en-US"
    )} to ${endDate.toLocaleDateString("en-US")}`;
  };

  return (
    <div className="bg-mutedGreen rounded-2xl shadow-xl mb-2">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="text-xl text-white font-semibold">
            TOTAL INCOME: ₱{"10999999999.00"}
          </div>

          {/* Date Range */}
          <div className="text-md text-white">{`Date: ${getDateRange()}`}</div>
        </div>
      </div>

      {/* LINE */}
      <div>
        <hr className="border-2 border-black" />
      </div>

      {/* Date Range Selector Component */}
      <div className="p-6">
        <DateRangeSelector
          selectedStartDay={selectedStartDay}
          selectedStartMonth={selectedStartMonth}
          selectedStartYear={selectedStartYear}
          selectedEndDay={selectedEndDay}
          selectedEndMonth={selectedEndMonth}
          selectedEndYear={selectedEndYear}
          onStartDayChange={handleStartDayChange}
          onStartMonthChange={handleStartMonthChange}
          onStartYearChange={handleStartYearChange}
          onEndDayChange={handleEndDayChange}
          onEndMonthChange={handleEndMonthChange}
          onEndYearChange={handleEndYearChange}
        />
      </div>

      {/* INCOME COMPONENTS */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Monthly Dues */}
          <div className="p-2">
            <MonthlyDuesIncome />
          </div>

          {/* Clearance Income */}
          <div className="p-2">
            <ClearanceIncome />
          </div>

          {/* Amenities Income */}
          <div className="p-2">
            <AmenitiesIncome />
          </div>

          {/* Stickers Income */}
          <div className="p-2">
            <StickersIncome />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
