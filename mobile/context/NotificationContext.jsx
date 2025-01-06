import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { useAuthContext } from "./AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  // Fetch notifications for the authenticated user
  const fetchNotificationsByUser = async (userId) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/notifications/user/${userId}`);
      setNotifications(res.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markNotificationAsRead = async (id) => {
    try {
      await axiosClient.patch(`/notifications/read/${id}`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read_status: "read" }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      console.log(error.response.data.message);
    }
  };

  // Fetch all notifications on component mount
  useEffect(() => {
    if (user?.id) {
      fetchNotificationsByUser(user.id);
    }
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        fetchNotificationsByUser,
        markNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationsContext = () => useContext(NotificationContext);
