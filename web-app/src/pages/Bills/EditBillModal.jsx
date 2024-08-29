import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useBills from "../../hooks/useBills";
import styles from "./EditBillsModal.module.css"; // Import CSS Module

Modal.setAppElement("#root"); // Ensure that screen readers can work with the modal

const EditBillModal = ({ isOpen, onRequestClose, bill, onSucess }) => {
  const { updateBillAndAddPayment } = useBills();
  const [formData, setFormData] = useState({
    amount: "",
    transaction_date: "",
    payment_amount: "",
    new_amount: "",
    new_status: bill.status,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bill) {
      setFormData({
        amount: bill.amount,
        transaction_date: "",
        payment_amount: "",
        new_amount: "",
        new_status: bill.status,
      });
    }
  }, [bill]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({ ...formData, transaction_date: today });
  };

  const validateInputs = () => {
    const newErrors = {};
    const currentAmount = parseFloat(formData.amount);
    const paymentAmount = parseFloat(formData.payment_amount);
    const newAmount = parseFloat(formData.new_amount);

    if (isNaN(paymentAmount) || paymentAmount < 0) {
      newErrors.payment_amount = "Payment amount cannot be negative or empty.";
    } else if (paymentAmount > currentAmount) {
      newErrors.payment_amount =
        "Payment amount cannot exceed the current amount.";
    }

    if (newAmount && (isNaN(newAmount) || newAmount < 0)) {
      newErrors.new_amount = "New amount must be a positive number.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = {
        bill_id: bill.id,
        amount: formData.amount,
        transaction_date: formData.transaction_date,
        payment_amount: formData.payment_amount,
        new_amount: formData.new_amount,
        new_status: formData.new_status,
      };
      await updateBillAndAddPayment(data, onSucess);
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
      <h2 className="text-2xl font-bold border-b-2 border-black mb-4">
        Edit Bill
      </h2>
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
          {errors.new_amount && (
            <span className={styles.error}>{errors.new_amount}</span>
          )}
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
            <option value="pending">Pending</option>
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
          {errors.payment_amount && (
            <span className={styles.error}>{errors.payment_amount}</span>
          )}
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={setTodayDate}
              className={`${styles.today}`}
            >
              Set to Today
            </button>
          </div>
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
