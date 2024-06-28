// src/components/Checkout.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../store/cartSlice";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import axiosClient from "../api/api";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.paymentMethod)
      errors.paymentMethod = "Payment Method is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOrderSubmitted(true);
    }
  };

  const handleConfirmOrder = async () => {
    const cartId = cart?._id;
    const response = await axiosClient.post("/cart/order", { cartId });
    console.log(">>>>>>>>>>>>>>>>>>>>>>,order response", response);
    if (response.data.success) {
      //delete cart
      //navigate to dahboard
      toast.success("Order Placed Successfully!", {
        position: "top-right",
        autoClose: 500, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      deleteCart(dispatch);
      navigate("/");
    } else {
      toast.error("Error in order place!", {
        position: "top-right",
        autoClose: 500, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">{`Order ID: ${cart?.items[0]?.productId?._id}`}</p>
            <p className="text-gray-600">
              {new Date(cart?.createdAt).toLocaleDateString()}
            </p>
          </div>
          {cart?.items?.map((item) => (
            <div
              key={item.productId?._id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId.name}
                  className="h-12 w-12 object-cover rounded"
                />
                <div>
                  <p className="text-lg font-semibold">{item.productId.name}</p>
                  <p className="text-gray-600">{item.productId.description}</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-600">{`Quantity: ${item.quantity}`}</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Total Price: ${(cart?.totalPrice - 10).toFixed(2)}
            </p>
          </div>
        </div>
        <Typography variant="body2" className="pt-2 text-green-700">
          You will save $10 on this order
        </Typography>
        <button
          onClick={() => handleConfirmOrder()}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Confirm Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              formErrors.address ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
          {formErrors.address && (
            <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              formErrors.paymentMethod ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          {formErrors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.paymentMethod}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Proceed to Summary
        </button>
      </form>
    </div>
  );
};

export default Checkout;
