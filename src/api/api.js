// src/api/api.js
import axios from "axios";
const token = localStorage.getItem("token");
console.log("toekn", token);

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosClient;
