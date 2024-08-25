import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";

const useAnnouncement = () => {
  const [announcements, setAnnouncements] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAnnouncements = async (onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/announcements");
      setAnnouncements(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      onError(error.response.data.message);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);
  return { announcements, getAnnouncements, loading };
};

export default useAnnouncement;
