import { useState } from "react";
import axiosClient from "../../utils/axios";

const useComplaints = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to submit a new complaint
  const submitComplaint = async (complaintDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.post("/complaints", complaintDetails);
      console.log(response);

      setSuccess(response.data.message);
      return response.data.message;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      return err.response?.data?.message;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitComplaint,
    loading,
    error,
    success,
  };
};

export default useComplaints;
