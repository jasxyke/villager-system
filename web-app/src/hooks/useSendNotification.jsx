import { useState } from "react";
import axiosClient from "../utils/axios";

const useSendNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        alert(response.data.message);
      }
    } catch (err) {
      setError(err.response.data.message);
      alert(err.response.data.message);
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
        alert(response.data.message);
      }
      console.log("Sucessfuly sent a notification.");
    } catch (err) {
      setError(err.response.data.message);
      alert(err.response.data.message);
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
