import React from "react";
import { useSettings } from "../../../contexts/SettingsContext";
import { formatToReadableDate } from "../../../utils/DataFormatter";

const OverdueDetails = ({ residentBill }) => {
  const { settings } = useSettings();
  // Get the last payment date based on the latest transaction_date
  const lastPaymentDate =
    residentBill.resident.transactions.length > 0
      ? residentBill.resident.transactions
          .map((transaction) => new Date(transaction.transaction_date))
          .sort((a, b) => b - a)[0]
          .toLocaleDateString()
      : "No Payments Yet";

  // Determine Resident Status based on overdue months
  const overdueMonths = residentBill.numOverdueMonths;
  let residentStatus = "All Paid!";
  if (overdueMonths > 0 && overdueMonths <= 4) {
    residentStatus = "Overdue";
  } else if (overdueMonths >= 5) {
    residentStatus = "Overdue (Extreme)";
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <div className="text-black">Monthly Dues:</div>
          <div className="text-black">
            ₱{parseFloat(settings.bill_amount_per_month).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="text-black">Number of Overdue Months:</div>
          <div className="text-black">{overdueMonths} months</div>
        </div>

        <div className="flex justify-between text-sm">
          <div className="text-black">Resident Status:</div>
          <div
            className={`text-${
              residentStatus === "All Paid!" ? "green" : "red"
            }-500`}
          >
            {residentStatus}
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div className="text-black">Last Payment Date:</div>
          <div className="text-black">
            {formatToReadableDate(lastPaymentDate)}
          </div>
        </div>

        <div className="flex justify-between text-sm pt-4 border-t-2 border-b-2 pb-4 pl-2">
          <div className="text-black font-bold">Total Amount to Pay:</div>
          <div className="font-bold text-black">
            ₱{parseFloat(residentBill.totalAmount).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueDetails;
