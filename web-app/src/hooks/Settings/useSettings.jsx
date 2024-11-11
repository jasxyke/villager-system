// src/hooks/useSettings.js
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";
import { useAuthContext } from "../../contexts/AuthContext";

const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loggedIn } = useAuthContext();

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
    if (loggedIn) {
      fetchSettings();
    }
  }, []);

  return { settings, loading, error, updateSettings };
};

export default useSettings;
