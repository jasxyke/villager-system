import React, { useContext, useEffect, useState } from "react";
import axiosClient, { guestAxios } from "../utils/axios";
import { router } from "expo-router";
import { deleteItem, deleteItemAsync, setItemAsync } from "expo-secure-store";
// import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

// const storage = new MMKVLoader().initialize();

const AuthContext = React.createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (email, password, onError) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/login", {
        email: email,
        password: password,
      });

      //sets the bearer token
      // axiosClient.defaults.headers.Authorization =
      //   "Bearer " + res.data.access_token;

      setItemAsync("API_TOKEN", res.data.access_token);

      //route to home after succesful login
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace("../home");
      //sets the logged in bool for disable routing options
      setLoggedIn(true);
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
    } catch (error) {
      console.log(error.response.data.message);
      onError(error.response.data.message);
    }
  };

  const logout = async (onSuccess, onError) => {
    try {
      const res = await axiosClient.post("/logout");
      await deleteItemAsync("API_TOKEN");
      onSuccess(res.data.message);
    } catch (error) {
      onError(error.response.data.message);
    }
  };

  const value = {
    loading,
    user,
    login,
    getUser,
    loggedIn,
    setUser,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
