import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const DOMAIN = "http://192.168.58.213:8000";

// export const DOMAIN = "http://127.0.0.1:8000";

// export const DOMAIN = `${process.env.REACT_APP_API_URL}`;
console.log(DOMAIN);

const axiosClient = axios.create({
  baseURL: DOMAIN + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  let token = localStorage.getItem("API_TOKEN");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status == 401) {
      localStorage.clear();
      return err;
    }
    throw err;
  }
);

export const guestAxios = axios.create({
  baseURL: DOMAIN + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
