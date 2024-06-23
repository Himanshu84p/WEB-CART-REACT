// src/api.js
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8080/api/v1/users"; // Replace with your actual API endpoint

export const getCurrUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("user data >>>", response);
    return response.data.data;
  } catch (error) {
    console.error("Getting curr user failed:", error);
    toast.error(`${error.response.data.message}`, {
      position: "top-right",
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("user data >>>", response);
    return response.data;
  } catch (error) {
    console.log("Error in sign in:", error);
    toast.error(`${error.response.data.message}`, {
      position: "top-right",
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  }
};
