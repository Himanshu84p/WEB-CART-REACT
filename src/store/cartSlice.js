import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../api/api";

// Define initial state for the cart
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

// Define the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    fetchCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addItemToCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    addItemToCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    addItemToCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateCartItemSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    updateCartItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeItemFromCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    removeItemFromCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    removeItemFromCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearCart(state) {
      state.cart = null;
    },
  },
});

// Export actions
export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addItemToCartStart,
  addItemToCartSuccess,
  addItemToCartFailure,
  updateCartItemStart,
  updateCartItemSuccess,
  updateCartItemFailure,
  removeItemFromCartStart,
  removeItemFromCartSuccess,
  removeItemFromCartFailure,
  clearCart,
} = cartSlice.actions;

const API_URL = "http://localhost:8080/api/v1";

export const fetchCart = async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const response = await axiosClient.get(`/cart`);
    console.log("cart details", response);
    dispatch(fetchCartSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchCartFailure(error.message));
  }
};

// Add Item to Cart
export const addItemToCart = (productId, quantity) => async (dispatch) => {
  dispatch(addItemToCartStart());
  try {
    const response = await axiosClient.post(`/cart/add-item`, {
      productId,
      quantity,
    });
    dispatch(addItemToCartSuccess(response.data.data));
  } catch (error) {
    dispatch(addItemToCartFailure(error.message));
  }
};

// Update Cart Item
export const increamentQuantity = (productId, quantity) => async (dispatch) => {
  dispatch(updateCartItemStart());
  try {
    const response = await axiosClient.put(`/cart/update-item`, {
      productId,
      quantity,
    });
    dispatch(updateCartItemSuccess(response.data.data));
  } catch (error) {
    dispatch(updateCartItemFailure(error.message));
  }
};
export const decrementQuantity = (productId, quantity) => async (dispatch) => {
  dispatch(updateCartItemStart());
  try {
    const response = await axiosClient.put(`/cart/update-item`, {
      productId,
      quantity,
    });
    console.log("decreased quantity", response);
    dispatch(updateCartItemSuccess(response.data.data));
  } catch (error) {
    dispatch(updateCartItemFailure(error.message));
  }
};

// Remove Item from Cart
export const removeItemFromCart = (productId) => async (dispatch) => {
  dispatch(removeItemFromCartStart());
  try {
    console.log("remove product id", productId);
    const response = await axiosClient.delete(`/cart/remove-item`, {
      data: {
        productId,
      },
    });
    console.log("response of delete >>>>", response);
    dispatch(removeItemFromCartSuccess(response.data.data));
  } catch (error) {
    dispatch(removeItemFromCartFailure(error.message));
  }
};

//delete cart
export const deleteCart = async (dispatch) => {
  dispatch(clearCart());
  try {
    const response = await axiosClient.delete(`/cart/delete-cart`);
    console.log("response of delete cart  >>>>", response);
    dispatch(fetchCart());
  } catch (error) {
    console.log("error in deleting cart", error);
  }
};

// Export the reducer
export default cartSlice.reducer;
