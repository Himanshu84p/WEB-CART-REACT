
import React, { useState, useEffect } from "react";
import ProductCard from "../components/product/ProductCard";
import { fetchProducts } from "../api/Services/product.api.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    minPrice: "",
    maxPrice: "",
    sortByPrice: "",
    sortByRating: "",
    minStock: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts({
      ...filterOptions,
      searchTerm: event.target.value,
    });
  };

  // Function to handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
    filterProducts({
      ...filterOptions,
      [name]: value,
      searchTerm,
    });
  };

  // Function to filter products based on search term and filter options
  const filterProducts = ({
    searchTerm,
    minPrice,
    maxPrice,
    sortByPrice,
    sortByRating,
    minStock,
  }) => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    } else if (minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    } else if (maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    if (sortByPrice === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortByRating === "lowToHigh") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortByRating === "highToLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (minStock) {
      filtered = filtered.filter(
        (product) => product.stock >= parseInt(minStock)
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 p-2 rounded-lg mb-4"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          name="sortByPrice"
          value={filterOptions.sortByPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        <select
          name="sortByRating"
          value={filterOptions.sortByRating}
          onChange={handleFilterChange}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="">Sort by Rating</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
