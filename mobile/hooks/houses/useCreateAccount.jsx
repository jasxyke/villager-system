import { useState } from "react";
import axiosClient from "../../utils/axios";

const useCreateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const createAccount = async ({
    email,
    houseId,
    userId,
    permissions = [],
  }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axiosClient.post("/household/create-account", {
        email,
        house_id: houseId,
        user_id: userId,
        permissions,
      });

      // Handle success response
      setSuccessMessage(response.data.message);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "An error occurred while creating or updating the account."
      );
      throw new Error(
        err.response?.data?.message ||
          "An error occurred while creating or updating the account."
      );
    } finally {
      setLoading(false);
    }
  };

  return { createAccount, loading, error, successMessage };
};

export default useCreateAccount;
