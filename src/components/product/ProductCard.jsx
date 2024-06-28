import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewProduct = (productId) => {
    console.log("productId", productId);
    navigate(`/products/${productId}`);
  };

  const addToCart = (product) => {
    let productInCart = cart?.items.find(
      (item) => item.productId._id === product._id
    );
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", productInCart);
    if (productInCart) {
      if (productInCart.quantity === product.stock) {
        toast.warn(`${product.name} Stock exceed the limit!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (productInCart?.quantity === 10) {
          toast.warn(`${product.name} max quantity already in cart!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          dispatch(addItemToCart(product._id, 1));
          toast.success(`${product.name} added to cart!`, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else {
      if (productInCart?.quantity === 10) {
        toast.warn(`${product.name} max quantity already in cart!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch(addItemToCart(product._id, 1));
        toast.success(`${product.name} added to cart!`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    console.log("added", product, product._id);
  };

  return (
    <div
      key={product.id}
      className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 lg:h-52 md:h-60 object-cover mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold text-left">{product.name}</h3>
      <p className="text-gray-900 text-xl text-left">${product.price}</p>
      <span className="bg-red-300 rounded-md">
        {product.stock > 0 ? "" : "Out of Stock"}
      </span>
      <Rating value={product.rating} />
      <div className="flex gap-2  justify-between">
        <button
          onClick={() => viewProduct(product._id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-normal py-2 px-4 rounded-full mt-4 focus:outline-none active:bg-red-900"
        >
          View Product
        </button>
        <button
          onClick={() => addToCart(product)}
          className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-normal py-2 px-4 rounded-full mt-4 focus:outline-none active:bg-gray-900 disabled:bg-gray-400"
          disabled={product.stock <= 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
