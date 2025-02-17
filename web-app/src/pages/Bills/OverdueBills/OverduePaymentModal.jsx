import React, { useEffect, useState } from "react";
import useUpdateBillAndAddPayments from "../../../hooks/Bills/useUpdateBillAndAddPayments";
import { useAlert } from "../../../contexts/AlertBox/AlertContext";

const OverduePaymentModal = ({ onClose, overdues, onSucess }) => {
  // Map overdues into a format suitable for rendering
  const monthlyData = overdues.map((due) => ({
    id: due.id,
    month: new Date(due.due_date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
    amount: `₱${parseFloat(due.amount).toFixed(2)}`,
  }));

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectAll, setSelectAll] = useState(false);

  const { showAlert } = useAlert();

  const { loading, error, updateBillAndAddPayment } =
    useUpdateBillAndAddPayments(); // Use the hook

  // Update selectAll checkbox based on selectedMonths
  useEffect(() => {
    setSelectAll(selectedMonths.length === monthlyData.length);
  }, [selectedMonths]);

  // Calculate the total amount due for selected months
  const totalAmountDue = selectedMonths.reduce((sum, monthId) => {
    const month = monthlyData.find((item) => item.id === monthId);
    return sum + parseFloat(month.amount.replace("₱", "").replace(",", ""));
  }, 0);

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    if (!paymentAmount || selectedMonths.length === 0) {
      showAlert(
        "Please enter a payment amount and select at least one month.",
        true
      );
      return;
    }

    // Validate that the payment amount matches the total amount due
    if (parseFloat(paymentAmount) !== totalAmountDue) {
      showAlert(
        `Payment amount must be equal to the total amount due: ₱${totalAmountDue.toLocaleString()}`,
        true
      );
      return;
    }

    // Prepare data for API call
    const billIds = selectedMonths;
    const paymentData = {
      bill_ids: billIds,
      payment_amount: parseFloat(paymentAmount),
      payment_method: paymentMethod,
    };

    try {
      // Call the custom hook to update the bill and add payment
      const success = await updateBillAndAddPayment(paymentData, onClose);
      if (success) {
        showAlert(
          `Payment of ₱${paymentAmount} (${paymentMethod}) has been processed for the selected months.`,
          false
        );
        onClose(); // Close the modal after payment
        onSucess();
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      showAlert(err.response.data.message);
    }
  };

  // Toggle selection of a month
  const toggleMonthSelection = (monthId) => {
    setSelectedMonths((prevSelectedMonths) =>
      prevSelectedMonths.includes(monthId)
        ? prevSelectedMonths.filter((id) => id !== monthId)
        : [...prevSelectedMonths, monthId]
    );
  };

  // Select/Deselect all months
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedMonths([]); // Deselect all if already selected
    } else {
      setSelectedMonths(monthlyData.map((month) => month.id)); // Select all
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl animate-fadeIn transform transition-all">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 text-black">
          <h3 className="text-2xl font-bold">Make Payment</h3>
          <button onClick={onClose} className="text-black hover:text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Unpaid Dues Breakdown */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-black mb-4">
            Unpaid Months
          </div>

          <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
            <div className="text-center bg-green text-white">
              <div className="p-2 text-sm font-semibold">
                <div className="grid grid-cols-3 gap-4 px-4 items-center">
                  {/* Select All Checkbox */}
                  <button
                    className="flex items-center justify-center text-white cursor-pointer"
                    onClick={toggleSelectAll}
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                    <span className="text-md">Select All</span>
                  </button>
                  <div>Month</div>
                  <div>Amount</div>
                </div>
              </div>
            </div>

            {/* Data Rows */}
            {monthlyData.map((row, index) => (
              <div
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-colors`}
              >
                <div className="grid grid-cols-3 gap-4 px-2 py-2 text-gray-700">
                  {/* Checkbox in the first column */}
                  <div className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedMonths.includes(row.id)}
                      onChange={() => toggleMonthSelection(row.id)}
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                  </div>
                  <div className="text-center">{row.month}</div>
                  <div className="text-center">{row.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Amount Due */}
        <div className="mb-6 flex gap-3 justify-end mr-4">
          <div className="text-lg font-semibold text-black mb-2">
            Total Amount Due:
          </div>
          <div className="text-xl text-black">
            ₱{totalAmountDue.toLocaleString()}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-2">
          <label
            htmlFor="payment-method"
            className="block text-md font-semibold text-black"
          >
            Payment Method:
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="cash">Cash</option>
            <option value="e-wallet">E-wallet</option>
          </select>
        </div>
        {/* Payment Form */}
        <div className="mb-2">
          <label
            htmlFor="payment"
            className="block text-md font-semibold text-black"
          >
            Enter Payment Amount:
          </label>
          <input
            type="number"
            id="payment"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter amount to pay"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-black py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePaymentSubmit}
            className="bg-green text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            {loading ? "Adding Payment..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverduePaymentModal;
