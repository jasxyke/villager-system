import React, { useContext, useEffect, useState } from "react";
import axiosClient, { guestAxios } from "../utils/axios";
import { router } from "expo-router";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
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

  const login = async (email, password, onError) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/login", {
        email: email,
        password: password,
      });

      console.log("res login: " + res);

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
      console.log(error);
      console.log(error.response.data.message);
      const token = await getItemAsync("API_TOKEN");
      if (token) await deleteItemAsync("API_TOKEN");
      onError(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const register = async (
    lastName,
    firstName,
    middleName,
    email,
    password,
    confirmPassword,
    contactNumber,
    onSuccess,
    onError
  ) => {
    setLoading(true);
    try {
      const formData = {
        lastname: lastName,
        firstname: firstName,
        middlename: middleName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        contact_number: contactNumber,
      };
      const res = await axiosClient.post("/register", formData);
      console.log(`access token: ${res.data.access_token}`);
      await setItemAsync("API_TOKEN", res.data.access_token);
      //route to home after succesful login
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace("../home");
      //sets the logged in bool for disable routing options
      setLoggedIn(true);
      //gets user after loggin in
      getUser();
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      onError(error?.response.data.message);
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosClient.get("/me");
      const responseUser = res.data;
      if (responseUser !== null) setLoggedIn(true);
      setUser(responseUser);
      console.log("response user: " + responseUser);
    } catch (error) {
      console.log("user error");

      await deleteItemAsync("API_TOKEN");
      router.navigate("../sign-in");
      console.log(error?.response?.data?.message);
      onError(error?.response?.data?.message);
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
    register,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
