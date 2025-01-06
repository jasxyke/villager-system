import { useState } from "react";
import axiosClient from "../../utils/axios";

const useNotifications = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Send a notification to all users.
   * @param {Object} notificationForm - The notification data (title and body).
   * @param {Function} onSuccess - Callback for successful operation.
   * @param {Function} onError - Callback for handling errors.
   */
  const sendNotificationToAll = async (
    notificationForm,
    onSuccess,
    onError
  ) => {
    try {
      setLoading(true);
      const res = await axiosClient.post(
        "/send-notification-to-all",
        notificationForm
      );
      onSuccess &&
        onSuccess(res.data.message || "Notification sent to all users!");
    } catch (error) {
      console.error(error);
      onError &&
        onError(
          error.response?.data?.message ||
            "An error occurred while sending notifications."
        );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a notification to a specific user.
   * @param {Object} notificationForm - The notification data (user_id, title, and body).
   * @param {Function} onSuccess - Callback for successful operation.
   * @param {Function} onError - Callback for handling errors.
   */
  const sendNotificationToUser = async (
    notificationForm,
    onSuccess,
    onError
  ) => {
    try {
      setLoading(true);
      const res = await axiosClient.post(
        "/send-notification-to-user",
        notificationForm
      );
      onSuccess &&
        onSuccess(res.data.message || "Notification sent to the user!");
    } catch (error) {
      console.error(error);
      onError &&
        onError(
          error.response?.data?.message ||
            "An error occurred while sending notifications."
        );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendNotificationToAll,
    sendNotificationToUser,
  };
};

export default useNotifications;
