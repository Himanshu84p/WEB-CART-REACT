// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users"; // Replace with your actual API endpoint

export const getCurrUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("user data >>>", response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("user data >>>", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
