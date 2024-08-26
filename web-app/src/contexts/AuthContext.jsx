import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { useNavigate } from "react-router-dom";
// import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

// const storage = new MMKVLoader().initialize();

const AuthContext = React.createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const login = async (email, password, onError) => {
    setLoading(true);
    try {
      console.log(email);

      const res = await axiosClient.post("/login", {
        email: email,
        password: password,
      });

      //sets the bearer token
      localStorage.setItem("API_TOKEN", res.data.access_token);
      console.log(res.data.access_token);

      navigate("/homepage");
      //sets the logged in bool for disable routing options
      setLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      //gets user after loggin in
      getUser();
    } catch (error) {
      onError(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const getUser = async () => {
    try {
      const res = await axiosClient.get("/me");
      const responseUser = res.data;
      if (responseUser !== null) setLoggedIn(true);
      setUser(responseUser);
      console.log(responseUser);
    } catch (error) {
      console.log(error);

      console.log(error.response.data.message);
      onError(error.response.data.message);
    }
  };

  const logout = async (onSuccess, onError) => {
    try {
      const res = await axiosClient.post("/logout");
      localStorage.removeItem("API_TOKEN");
      localStorage.removeItem("isLoggedIn");
      setLoggedIn(false);
      onSuccess(res.data.message);
      navigate("/");
    } catch (error) {
      onError(error.response.data.message);
    }
  };

  const isLoggedIn = () => {
    const loggedInBa = localStorage.getItem("isLoggedIn");
    return JSON.parse(loggedInBa);
  };

  const value = {
    loading,
    user,
    login,
    getUser,
    loggedIn,
    setUser,
    logout,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
