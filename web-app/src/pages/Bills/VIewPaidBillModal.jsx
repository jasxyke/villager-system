import React from "react";
import Modal from "react-modal";
import styles from "./EditBillsModal.module.css"; // Import CSS Module for styling

Modal.setAppElement("#root"); // Ensure that screen readers can work with the modal

const ViewPaidBillModal = ({ isOpen, onRequestClose, bill }) => {
  if (!bill) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Paid Bill Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className="text-2xl font-bold border-b-2 border-black mb-6">
        Paid Bill Details
      </h2>
      <div className={styles.detailsContainer}>
        {[
          {
            label: "Resident",
            value: `${bill.resident?.user?.firstname} ${bill.resident?.user?.lastname}`,
          },
          {
            label: "Address",
            value: `BLK ${bill.resident?.house?.block} LOT ${bill.resident?.house?.lot}`,
          },
          { label: "Issue Date", value: bill.issue_date },
          { label: "Due Date", value: bill.due_date },
          { label: "Paid Date", value: bill.transactions[0].transaction_date },
          { label: "Paid Amount", value: bill.transactions[0].amount },
        ].map(({ label, value }, index) => (
          <div key={index} className={`${styles.formGroup} flex items-center`}>
            <label className={styles.label} style={{ width: "30%" }}>
              {label}:
            </label>
            <input
              type="text"
              className={`${styles.input} bg-gray-100 cursor-not-allowed`}
              value={value || "N/A"}
              disabled
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onRequestClose}
          className={`${styles.button} ${styles.closeButton} text-white bg-red-500 hover:bg-red-600`}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewPaidBillModal;
