// src/context/SettingsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axiosClient from "../utils/axios";
import { useAuthContext } from "./AuthContext";

// Create the context
const SettingsContext = createContext();

// Create the provider component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useAuthContext();

  // Fetch all settings from the API
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

  // Fetch a single setting by key from the API
  const fetchSettingByKey = async (key) => {
    try {
      const response = await axiosClient.get(`/settings/${key}`);
      return response.data[key];
    } catch (err) {
      setError(err.message);
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

  // Load settings once on component mount
  useEffect(() => {
    if (isLoggedIn()) {
      fetchSettings();
    }
  }, [isLoggedIn()]);

  // Provide the settings and functions to children
  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        updateSettings,
        fetchSettingByKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the SettingsContext
export const useSettings = () => {
  return useContext(SettingsContext);
};
