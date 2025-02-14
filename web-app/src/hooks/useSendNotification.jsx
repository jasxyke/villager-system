import { useState } from "react";
import axiosClient from "../utils/axios";
import { useAlert } from "../contexts/AlertBox/AlertContext";

const useSendNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { showAlert } = useAlert();

  const sendNotificationToAll = async (title, body) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosClient.post("/send-notification-to-all", {
        title,
        body,
      });

      if (response.status === 200) {
        setSuccess(true);
        showAlert(response.data.message, false);
      }
    } catch (err) {
      setError(err.response.data.message);
      showAlert(err.response.data.message, true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendNotificationToUser = async (userId, title, body) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosClient.post("/send-notification-to-user", {
        user_id: userId,
        title,
        body,
      });

      if (response.status === 200) {
        setSuccess(true);
        showAlert(response.data.message, false);
      }
      console.log("Sucessfuly sent a notification.");
    } catch (err) {
      setError(err.response.data.message);
      showAlert(err.response.data.message, true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    sendNotificationToAll,
    sendNotificationToUser,
  };
};

export default useSendNotification;
