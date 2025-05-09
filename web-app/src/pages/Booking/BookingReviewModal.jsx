// src/components/BookingReviewModal.jsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { calculatePrice } from "./CalculatePrice";
import useBookings from "../../hooks/Bookings/useBookings";
import { formatTime } from "../../utils/DataFormatter";
import { useConfirmDialog } from "../../components/ConfirmDialog/useConfirmDialog";
import { useAlert } from "../../contexts/AlertBox/AlertContext";
Modal.setAppElement("#root");

const BookingReviewModal = ({ isOpen, onRequestClose, booking, onUpdate }) => {
  const [updatedBooking, setUpdatedBooking] = useState(booking);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [payments, setPayments] = useState(booking.booking_payments);
  const { showAlert } = useAlert();
  // const [isGuest, setIsGuest] = useState(booking.is_guest);
  const [error, setError] = useState("");

  const { confirm, ConfirmDialogComponent } = useConfirmDialog(
    "Notify Confirmation",
    "Do you want to notify the resident?"
  );

  useEffect(() => {
    setUpdatedBooking(booking);
    if (booking.booking_payments.length > 0) {
      setPayments(booking.booking_payments);
    } else {
      setPayments([]);
    }
    setPaymentAmount("");
    setPaymentDate("");
  }, [booking]);

  useEffect(() => {
    const totalPaid = payments.reduce(
      (sum, payment) => sum + parseFloat(payment.amount || 0),
      0
    );
    const totalPrice = calculatePrice(
      updatedBooking.amenity,
      updatedBooking.start_time,
      updatedBooking.end_time,
      updatedBooking.num_of_resident,
      updatedBooking.num_of_guest,
      updatedBooking.is_guest
    );

    if (totalPrice === totalPaid) {
      setUpdatedBooking((prev) => ({
        ...prev,
        payment_status: "paid",
      }));
    } else if (totalPaid > 0) {
      setUpdatedBooking((prev) => ({
        ...prev,
        payment_status: "partial",
      }));
    } else {
      setUpdatedBooking((prev) => ({
        ...prev,
        payment_status: "pending",
      }));
    }
  }, [
    payments,
    updatedBooking.start_time,
    updatedBooking.end_time,
    updatedBooking.is_guest,
    booking.amenity,
  ]);

  const { updateBooking, loading } = useBookings();

  const handleSave = async () => {
    let notifyResident = await confirm();
    console.log(notifyResident);

    const finalBooking = { ...updatedBooking, notify: notifyResident };
    try {
      const success = await updateBooking(finalBooking, payments);
      showAlert(success, false);
      onUpdate();
      onRequestClose();
      setError("");
    } catch (err) {
      setError(err);
    }
  };

  const addPayment = () => {
    if (paymentAmount && paymentAmount > 0 && paymentDate) {
      const newPayment = {
        amount: paymentAmount,
        payment_date: paymentDate,
      };
      setPayments([...payments, newPayment]);
      setPaymentAmount("");
      setPaymentDate("");
      setError("");
    } else {
      setError("Please enter a valid payment amount and date.");
    }
  };

  const deletePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  if (!booking) {
    return null;
  }

  const totalPrice = calculatePrice(
    updatedBooking.amenity,
    updatedBooking.start_time,
    updatedBooking.end_time,
    updatedBooking.num_of_resident,
    updatedBooking.num_of_guest,
    updatedBooking.is_guest
  );

  const totalPaid = payments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount || 0),
    0
  );
  const totalAmountDue = totalPrice - totalPaid;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative w-full max-w-5xl mx-auto bg-white p-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="h-[90vh] overflow-y-auto p-3">
        <h2 className="text-2xl font-semibold mb-4">Review Booking</h2>
        <div className="flex">
          {/* Left Column */}
          <div className="w-1/2 pr-4">
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={updatedBooking.full_name || ""}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    full_name: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={updatedBooking.email || ""}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    email: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Contact Number</label>
              <input
                type="text"
                value={updatedBooking.contact_number || ""}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    contact_number: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Booking Date</label>
              <input
                type="date"
                value={updatedBooking.booking_date || ""}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    booking_date: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Booking Status</label>
              <select
                value={updatedBooking.booking_status || "for_approval"}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    booking_status: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              >
                <option value="for_approval">For Approval</option>
                <option value="reserved">Reserved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">
                Resident or Guest
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="residentGuest"
                    value="resident"
                    checked={!updatedBooking.is_guest}
                    onChange={() =>
                      setUpdatedBooking({
                        ...updatedBooking,
                        is_guest: false,
                      })
                    }
                    className="mr-2"
                  />
                  Resident
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="residentGuest"
                    value="guest"
                    checked={updatedBooking.is_guest}
                    onChange={() =>
                      setUpdatedBooking({
                        ...updatedBooking,
                        is_guest: true,
                      })
                    }
                    className="mr-2"
                  />
                  Guest
                </label>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={updatedBooking.start_time || ""}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    start_time: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={updatedBooking.end_time || ""}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    end_time: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="w-1/2 pl-4">
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Payment Status</label>
              <select
                value={updatedBooking.payment_status || "pending"}
                onChange={(e) =>
                  setUpdatedBooking({
                    ...updatedBooking,
                    payment_status: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              >
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            {!updatedBooking.amenity.is_per_group && (
              <>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium mb-1">
                    Number of Residents
                  </label>
                  <input
                    type="number"
                    value={updatedBooking.num_of_resident || ""}
                    onChange={(e) =>
                      setUpdatedBooking({
                        ...updatedBooking,
                        num_of_resident: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium mb-1">
                    Number of Outsiders
                  </label>
                  <input
                    type="number"
                    value={updatedBooking.num_of_guest || ""}
                    onChange={(e) =>
                      setUpdatedBooking({
                        ...updatedBooking,
                        num_of_guest: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              </>
            )}
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Total Price</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                PHP {totalPrice.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Total Paid</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                PHP {totalPaid.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Amount Due</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">
                PHP {totalAmountDue.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Add Payment</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Amount"
                />
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Date"
                />
                <button
                  onClick={addPayment}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {payments.length > 0 && (
              <p className="text-sm font-medium mb-1">Payments</p>
            )}
            {payments.map((payment, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <div className="p-2 border border-gray-300 rounded bg-gray-100 flex-1">
                  PHP {parseFloat(payment.amount).toFixed(2)} on{" "}
                  {payment.payment_date}
                </div>
                <button
                  onClick={() => deletePayment(index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onRequestClose}
            className="p-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-green-500 text-white rounded bg-secondary"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      {ConfirmDialogComponent}
    </Modal>
  );
};

export default BookingReviewModal;
