import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

axios.defaults.withCredentials = true;

export const DOMAIN = `${process.env.EXPO_PUBLIC_API_URL}`;
// export const DOMAIN = `https://api.dvillager.com`;

console.log(`DOMAIN: ${DOMAIN}`);

const axiosClient = axios.create({
  baseURL: DOMAIN + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  let token = await SecureStore.getItemAsync("API_TOKEN");
  if (token != null) config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status == 401) {
      SecureStore.deleteItemAsync("API_TOKEN");
      return err;
    }
    throw err;
  }
);

export default axiosClient;
