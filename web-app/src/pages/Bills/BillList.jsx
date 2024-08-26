import React, { useState, useEffect } from "react";
import useBills from "../../hooks/useBills";
import EditBillModal from "./EditBillModal";

const BillList = () => {
  const { bills, fetchBills, loading, error } = useBills();
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch bills when component mounts or updates
    fetchBills();
  }, []);

  const openModal = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBill(null);
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-xl font-bold mb-4 text-white">Date: August 2024</div>
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white border rounded-lg shadow-lg">
          <div className="grid grid-cols-6 gap-4 p-2 bg-oliveGreen text-white font-semibold">
            <div>Homeowner</div>
            <div>Address</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          {bills.length > 0 ? (
            bills.map((bill, index) => (
              <div
                key={bill.id} // Use a unique key if available, like bill.id
                className={`grid grid-cols-6 gap-4 p-2 text-black ${
                  index > 0 ? "border-t border-greyGreen" : ""
                }`}
              >
                <div>{bill.name}</div>
                <div>{bill.address}</div>
                <div>{bill.date}</div>
                <div>{bill.amount}</div>
                <div>{bill.status}</div>
                <div>
                  <button
                    onClick={() => openModal(bill)}
                    className="text-white bg-oliveGreen rounded-xl w-28 p-2 hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">No bills available</div>
          )}
        </div>
      </div>

      {selectedBill && (
        <EditBillModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          bill={selectedBill}
        />
      )}
    </>
  );
};

export default BillList;
