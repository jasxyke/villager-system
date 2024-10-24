import { useState } from "react";
import axiosClient from "../../utils/axios";

const useStickerPayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to add a payment for a car sticker request
  const addStickerPayment = async (stickerRequestId, residentId, amount) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Prepare the data payload
      const data = {
        sticker_request_id: stickerRequestId,
        resident_id: residentId,
        amount: amount,
        payment_status: "completed",
      };

      // Make the API request to add the payment
      const response = await axiosClient.post(
        "/sticker-payments/add-payment",
        data
      );

      // Handle success response
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error(err);
      setError("Failed to add payment.");
    } finally {
      setLoading(false);
    }
  };

  return {
    addStickerPayment,
    loading,
    error,
    success,
  };
};

export default useStickerPayments;
