// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/products"; // Replace with your actual API endpoint

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    // console.log("products data >>>",response)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchOneProduct = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log("product data >>>",response)
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
