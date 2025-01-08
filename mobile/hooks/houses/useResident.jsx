import { useState } from "react";
import axiosClient from "../../utils/axios";

const useResident = () => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch a resident by their ID
  const fetchResident = async (residentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/residents/${residentId}`);
      const data = response.data;

      console.log(data);

      setResident(data.resident);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    resident,
    loading,
    error,
    fetchResident,
  };
};

export default useResident;
