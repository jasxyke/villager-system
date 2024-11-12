import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useTopResidentsWithUnpaidBills = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopResidentsWithUnpaidBills = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/bills/most-unpaid-residents");
      setResidents(response.data); // Assuming the response contains the top residents
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopResidentsWithUnpaidBills();
  }, []);

  return {
    residents,
    loading,
    error,
    fetchTopResidentsWithUnpaidBills,
  };
};

export default useTopResidentsWithUnpaidBills;
