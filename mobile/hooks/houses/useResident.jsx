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

  const addResident = async (residentData, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/residents", residentData);
      onSuccess(res.data.message, res.data.resident);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      onError(error.response.data.message);
    }
  };

  return {
    resident,
    loading,
    error,
    fetchResident,
    addResident,
  };
};

export default useResident;
