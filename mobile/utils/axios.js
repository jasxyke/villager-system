import axios from "axios";
import Config from "react-native-config";
import * as SecureStore from "expo-secure-store";
axios.defaults.withCredentials = true;

//export const DOMAIN = `http://192.168.0.30:8081`;
//export const DOMAIN = `http://192.168.43.143:8081`;
//export const DOMAIN = `http://192.168.22.199:8081`;
export const DOMAIN = `http://192.168.92.213:8000`;
//export const DOMAIN = "http://127.0.0.1:8000";

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
