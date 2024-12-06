import { useCallback, useState } from "react";
import axiosClient from "../../utils/axios";

const useIncomes = () => {
  const [incomes, setIncomes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIncomes = useCallback(async (year, month) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.post("/income-totals", {
        year,
        month,
      });
      console.log(response.data.data);

      setIncomes(response.data.data);
    } catch (err) {
      console.log(err);
      setError(
        err.data.response.message || "An error occurred while fetching incomes."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    incomes,
    loading,
    error,
    fetchIncomes,
  };
};

export default useIncomes;
