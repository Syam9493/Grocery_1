import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Vegetables from "../Components/Vegetables";
//import axios from 'axios';
import API from "../server/api";

const VegetableScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [VisibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API("/api/products");
        const Vegetables = response.data.data;
        const Veg = Vegetables.filter((veg) => veg.category === "vegetables");
        setProducts(Veg);
        setLoading(false);
        //console.log("Full API response:", Vegetables);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const loadMoreProductshandler = () => {
    setVisibleProducts((prevCount) => prevCount + 6);
  };

  const decresMoreProductshandler = () => {
    setVisibleProducts(6);
  };

  const visibeProducts = products.slice(0, VisibleProducts);

  if (loading)
    return (
      <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!products.length) return <div>No products found</div>;

  return (
    <>
      <div className="grid grid-cols-1 place-items-center  md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 gap-4 p-6">
        {visibeProducts.map((product) => (
          <Vegetables key={product._id} product={product} />
        ))}
      </div>
      <div className="m-7 flex items-center justify-center">
        {VisibleProducts < products.length ? (
          <button
            className=" w-60  bg-green-700 rounded-2xl font-sans font-semibold text-[1rem] text-white px-4 py-3"
            onClick={loadMoreProductshandler}
          >
            Load Products
          </button>
        ) : (
          <button
            className=" w-60  bg-green-700 rounded-2xl font-sans font-semibold text-[1rem] text-white px-4 py-3"
            onClick={decresMoreProductshandler}
          >
            Remove Products
          </button>
        )}
      </div>
    </>
  );
};

export default VegetableScreen;
