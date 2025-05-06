import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : process.env.REACT_APP_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("L&D_ADMIN"); // L&D_ADMIN

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

