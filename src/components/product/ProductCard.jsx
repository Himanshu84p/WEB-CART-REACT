import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const viewProduct = (productId) => {
    console.log('productId', productId)
    navigate(`/products/${productId}`);
  };

  

  return (
    <div
      key={product.id}
      className="bg-blue-100 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 lg:h-52 md:h-60 object-cover mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold text-left">{product.name}</h3>
      <p className="text-gray-600 text-left">${product.price}</p>
      <Rating value={product.rating} />
      <div className="flex gap-2  justify-between">
        {console.log('product.id', product._id)}
        <button
          onClick={() => viewProduct(product._id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-normal py-2 px-4 rounded-full mt-4 focus:outline-none active:bg-red-900"
        >
          View Product
        </button>
        <button
          onClick={() => addToCart(product)}
          className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-normal py-2 px-4 rounded-full mt-4 focus:outline-none active:bg-gray-900"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};



export default ProductCard;
