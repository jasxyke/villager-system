import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useOverdueBills = () => {
  const [overdueCount, setOverdueCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch overdue residents count
  const fetchOverdueCount = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/overdue-bills-count");
      setOverdueCount(response.data.overdue_bills_count);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch overdue monthly dues count");
      setLoading(false);
    }
  };

  // useEffect to fetch count on component mount
  useEffect(() => {
    fetchOverdueCount();
  }, []);

  return { overdueCount, loading, error, fetchOverdueCount };
};

export default useOverdueBills;
