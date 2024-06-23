import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../../api/Services/product.api";
import Rating from "./Rating";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("id", id);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProduct(id) {
      const res = await fetchOneProduct(id);
      console.log("res.data", res[0]);
      setProduct(res[0]);
      setLoading(false);
    }
    getProduct(id);
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <section className="overflow-hidden shadow-2xl rounded-lg">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={product.image}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h6 className="my-4 text-3xl font-semibold text-black">
              {product.name}
            </h6>
            <p className="leading-relaxed">{product.description}</p>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                <Rating value={product.rating} />
                <span className="ml-3 inline-block text-xs font-semibold">
                  4 Reviews
                </span>
              </span>
            </div>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                <span className="mr-3 text-sm font-semibold">Color</span>
                <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-green-200 focus:outline-none"></button>
              </div>
            </div>
            <p className="leading-relaxed">
              {product.stock ? "Stocks available" : "Not available"}
            </p>
            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">
                ${product.price}
              </span>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetails;