import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useBills from "../hooks/useBills";
import styles from "./EditBillModal.module.css"; // Import CSS Module

Modal.setAppElement("#root"); // Ensure that screen readers can work with the modal

const EditBillModal = ({ isOpen, onRequestClose, bill }) => {
  const { updateBillAndAddPayment } = useBills(); // Import your custom hook
  const [formData, setFormData] = useState({
    amount: "",
    transaction_date: "",
    payment_amount: "",
    new_amount: "",
    new_status: "",
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        amount: bill.amount,
        transaction_date: "",
        payment_amount: "",
        new_amount: "",
        new_status: "",
      });
    }
  }, [bill]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        bill_id: bill.id,
        amount: formData.amount,
        transaction_date: formData.transaction_date,
        payment_amount: formData.payment_amount,
        new_amount: formData.new_amount,
        new_status: formData.new_status,
      };
      await updateBillAndAddPayment(data);
      onRequestClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update bill and add payment:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Bill Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Edit Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Current Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className={styles.input}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>New Amount:</label>
          <input
            type="number"
            name="new_amount"
            value={formData.new_amount}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>New Status:</label>
          <select
            name="new_status"
            value={formData.new_status}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="">Select Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Payment Amount:</label>
          <input
            type="number"
            name="payment_amount"
            value={formData.payment_amount}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Transaction Date:</label>
          <input
            type="date"
            name="transaction_date"
            value={formData.transaction_date}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={`${styles.button} ${styles.submit}`}>
          Update Bill
        </button>
        <button
          type="button"
          onClick={onRequestClose}
          className={`${styles.button} ${styles.cancel}`}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default EditBillModal;
