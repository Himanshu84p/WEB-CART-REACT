// src/api/api.js
import axios from "axios";


// const axiosClient = axios.create({
//   baseURL: "http://localhost:8080/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to headers
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
