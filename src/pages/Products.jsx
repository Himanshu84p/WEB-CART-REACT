// // src/pages/ProductList.jsx
// import React, { useEffect } from "react";
// import ProductCard from "../components/product/ProductCard";
// import axios from "axios";

// const ProductList = () => {
//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import ProductCard from "../components/product/ProductCard";
import { fetchProducts } from "../api/Services/product.api.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
