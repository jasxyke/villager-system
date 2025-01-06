import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch all notifications.
   */
  const getNotifications = async (onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/notifications");
      setNotifications(res.data.data); // Assuming the API returns data in `data`
    } catch (error) {
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new notification.
   */
  const addNotification = async (notificationForm, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/notifications", notificationForm);
      onSuccess && onSuccess(res.data.message);
      setNotifications([...notifications, res.data.data]);
    } catch (error) {
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get a single notification by ID.
   */
  const getNotification = async (id, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/notifications/${id}`);
      onSuccess && onSuccess(res.data.data);
    } catch (error) {
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Edit an existing notification.
   */
  const editNotification = async (id, notificationForm, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.put(
        `/notifications/${id}`,
        notificationForm
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? res.data.data : notification
        )
      );
      onSuccess && onSuccess("Notification updated successfully");
    } catch (error) {
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a notification by ID.
   */
  const deleteNotification = async (id, onSuccess, onError) => {
    try {
      setLoading(true);
      await axiosClient.delete(`/notifications/${id}`);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
      onSuccess && onSuccess("Notification deleted successfully");
    } catch (error) {
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    notifications,
    loading,
    getNotifications,
    addNotification,
    getNotification,
    editNotification,
    deleteNotification,
  };
};

export default useNotifications;
