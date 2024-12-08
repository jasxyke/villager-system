import React from "react";

const IncomeModal = ({
  isOpen,
  onClose,
  incomes,
  loading,
  error,
  incomeType,
}) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (incomeType) {
      case "Total Income":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Total Income
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? (
                <span className="text-lg text-gray-500">Loading...</span>
              ) : incomes.total_income ? (
                `₱${incomes.total_income}`
              ) : (
                "₱0.00"
              )}
            </p>
          </div>
        );
      case "Monthly Dues":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Monthly Dues Income
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? (
                <span className="text-lg text-gray-500">Loading...</span>
              ) : incomes.bills ? (
                `₱${incomes.bills}`
              ) : (
                "₱0.00"
              )}
            </p>
          </div>
        );
      case "Clearance Income":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Clearance Income
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? (
                <span className="text-lg text-gray-500">Loading...</span>
              ) : incomes.permits ? (
                `₱${incomes.permits}`
              ) : (
                "₱0.00"
              )}
            </p>
          </div>
        );
      case "Amenities Income":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Amenities Income
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? (
                <span className="text-lg text-gray-500">Loading...</span>
              ) : incomes.bookings ? (
                `₱${incomes.bookings}`
              ) : (
                "₱0.00"
              )}
            </p>
          </div>
        );
      case "Stickers Income":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Stickers Income
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? (
                <span className="text-lg text-gray-500">Loading...</span>
              ) : incomes.car_stickers ? (
                `₱${incomes.car_stickers}`
              ) : (
                "₱0.00"
              )}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 max-w-full relative transform transition-all duration-300 ease-in-out">
        {/* Close button with new design */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 bg-gray-100 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal content */}
        <div className="text-center">{renderContent()}</div>
      </div>
    </div>
  );
};

export default IncomeModal;
