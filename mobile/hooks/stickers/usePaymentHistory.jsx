import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios"; // Ensure the path to your axios client is correct

const useFetchPaymentHistory = (residentId) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/sticker-payments`);
      setPayments(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { payments, loading, error, fetchPayments };
};

export default useFetchPaymentHistory;
