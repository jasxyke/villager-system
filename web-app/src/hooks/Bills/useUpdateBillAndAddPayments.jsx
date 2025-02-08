import { useState } from "react";
import axiosClient from "../../utils/axios";

const useUpdateBillAndAddPayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBillAndAddPayment = async (data, onSuccess) => {
    setLoading(true);
    try {
      // Make the API call to update the bill and add payment
      const response = await axiosClient.post("/bills/pay-edit-bills", data);

      // Check if the API call was successful
      if (response.data.success) {
        // Trigger onSuccess callback if the API call was successful
        onSuccess();
      }
      return response.data.success;
    } catch (err) {
      console.log(err);

      setError(err);
      throw err; // Propagate the error if necessary
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateBillAndAddPayment,
  };
};

export default useUpdateBillAndAddPayments;
