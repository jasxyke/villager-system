import { useState } from "react";
import axiosClient from "../../utils/axios";

const useFetchPaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // Added state for messages

  const fetchPaymentHistory = async (residentId) => {
    setLoading(true);
    setError(null);
    setMessage(null); // Reset message state
    try {
      const response = await axiosClient.get(
        `/payments/resident/${residentId}`
      );

      // Check if the payments array is empty
      if (response.data.payments.length === 0) {
        setMessage(response.data.message || "No payment history found."); // Set message if no payments
      } else {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching payment history"
      );
    } finally {
      setLoading(false);
    }
  };

  return { payments, loading, error, message, refetch: fetchPaymentHistory }; // Return message state
};

export default useFetchPaymentHistory;
