import { useState } from "react";
import axiosClient from "../../utils/axios";

const usePermitPayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to add a payment for a permit request
  const addPermitPayment = async (
    permitRequestId,
    residentId,
    amount,
    transactionId = null
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Prepare the data payload
      const data = {
        permit_request_id: permitRequestId,
        resident_id: residentId,
        amount: amount,
        payment_status: "completed",
        transaction_id: transactionId, // Optional transaction ID
      };

      // Make the API request to add the payment
      const response = await axiosClient.post(
        "/permit-payments/add-payment",
        data
      );

      // Handle success response
      setSuccess(true);
      return response.data.message;
    } catch (err) {
      console.error(err);
      setError("Failed to add payment.");
    } finally {
      setLoading(false);
    }
  };

  return {
    addPermitPayment,
    loading,
    error,
    success,
  };
};

export default usePermitPayments;
