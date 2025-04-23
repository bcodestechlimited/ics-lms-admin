import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("L&D_ADMIN"); // L&D_ADMIN

export const axiosInstance = axios.create({
  baseURL,
  // timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       localStorage.removeItem(APP_CONFIG.TOKEN);
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
