// src/hooks/useSettings.js
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch settings from the API
  const fetchSettings = async () => {
    try {
      const response = await axiosClient.get("/settings");
      setSettings(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update settings via the API
  const updateSettings = async (newSettings) => {
    try {
      const response = await axiosClient.post("/settings", newSettings);
      setSettings(newSettings);
      console.log(response.data.message);

      return response.data.message;
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, updateSettings };
};

export default useSettings;
