import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";

const useComplaintsByStatus = (status) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch complaints by status
  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/get-complaints/${status}`);
      setComplaints(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Function to solve a complaint
  const solveComplaint = async (complaintId) => {
    try {
      // API request to mark complaint as solved
      await axiosClient.patch(`/complaints/${complaintId}/solve`);

      // Update complaints list to remove the solved complaint
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint.id !== complaintId)
      );
    } catch (err) {
      console.error("Error solving complaint:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while solving the complaint"
      );
    }
  };

  useEffect(() => {
    if (status) {
      fetchComplaints();
    }
  }, [status]);

  return {
    complaints,
    loading,
    error,
    solveComplaint, // Return the function for solving a complaint
    fetchComplaints, // Expose fetchComplaints in case you need to manually trigger a refresh
  };
};

export default useComplaintsByStatus;
