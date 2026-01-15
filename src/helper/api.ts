// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_URL,
// });


import { VITE_BACKEND_URL } from "@/const/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//  INTERCEPTOR – Add Token Automatically
console.log("VITE_BACKEND_URL: ", VITE_BACKEND_URL)

axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      token = token.replace(/"/g, "");
      config.headers.Authorization = `Bearer ${token}`; // Authorization header
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.error === "Invalid or expired token.")
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
