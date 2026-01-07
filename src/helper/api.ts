// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_URL,
// });


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//  INTERCEPTOR – Add Token Automatically

axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      token = token.replace(/"/g, "");
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
