import { useState } from "react";
import axiosClient from "../../utils/axios";

const usePermitReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to approve the permit request
  const approvePermitRequest = async (id, permitFee, processingFee, note) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const data = {
        permit_fee: permitFee,
        processing_fee: processingFee,
        note: note,
      };

      console.log("data:");
      console.log(data);

      // Send the approval request to the API
      await axiosClient.post(`/permit-requests/${id}/approve`, data);

      setSuccess(true);
      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to approve permit request.");
    } finally {
      setLoading(false);
    }
  };

  // Function to reject the permit request
  const rejectPermitRequest = async (id, rejectionNote) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const data = {
        note: rejectionNote,
      };
      console.log("hellow1");
      // Send the rejection request to the API
      const res = await axiosClient.post(`/permit-requests/${id}/reject`, data);
      console.log("hello2");
      console.log(res);

      setSuccess(true);
      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to reject permit request.");
    } finally {
      setLoading(false);
    }
  };

  return {
    approvePermitRequest,
    rejectPermitRequest,
    loading,
    error,
    success,
  };
};

export default usePermitReview;
