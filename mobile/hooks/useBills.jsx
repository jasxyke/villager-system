import React, { useState, useEffect } from "react";
import axiosClient from "../utils/axios";

const useBills = () => {
  const [bills, setBills] = useState([]);
  const [totalBalance, setTotalBalance] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBills = async (residentId) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/bills/resident/${residentId}`);
      console.log(response.data.bills);

      setBills(response.data.bills);

      // Format totalBalance to two decimal places
      const formattedBalance = parseFloat(response.data.total_balance).toFixed(
        2
      );
      setTotalBalance(formattedBalance);
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { bills, totalBalance, loading, error, refetch: fetchBills };
};

export default useBills;
