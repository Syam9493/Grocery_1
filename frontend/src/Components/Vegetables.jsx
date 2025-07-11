import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { addingToCart } from '../Slice/cartSlice';

const Vegetables = ({ product }) => {
  const navigate = useNavigate();

  const addToCartHandler = (id) => {
    navigate(`/productDetailsPage/${id}`);
  };

  return (
    <>
      <div className="w-80 md:w-64 h-5xl bg-white rounded-xl shadow-xl p-3">
        <div className="flex flex-row justify-between">
          <p className="bg-green-700 px-3 py-1.5 font-semibold text-md/1 text-white text-center rounded-r-full">
            25% off
          </p>
          <div className="bg-gray-100 p-2 shadow-2xl rounded-full">
            <button className="size-6" onClick={addToCartHandler}>
              ❤️
            </button>
          </div>
        </div>
        <Link to={`/productDetailsPage` + "/" + product._id}>
          <div className="w-full h-48 flex items-center justify-center p-2">
            <img
              src={product.image || "/Fruits/Apple.jpeg"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        <div className="mt-6 flex flex-row justify-between">
          <h1 className="font-sans font-bold text-[1.1rem] text-md/1 text-green-700">
            {product.category || "Fresh Product"}
          </h1>
          <h3>
            ⭐ <span className="font-bold"> {product.rating || 5.0}</span>
          </h3>
        </div>
        <div>
          <h2 className="mt-0.5 font-sans font-semibold text-[1.1rem] font-stretch-normal text-start">
            <Link to={`/productDetailsPage` + "/" + product._id}>
              {product.name}
            </Link>
          </h2>
        </div>
        <div>
          <p className="mt-4 text-sm/1 text-gray-400">
            {product.weight || "500g"}
          </p>
        </div>
        <div className="mt-5 flex flex-row justify-between">
          <h3 className="font-sans text-base font-semibold">
            ₹{product.price || "11.75"}
          </h3>
          <button
            className="bg-green-200 rounded-2xl font-semibold text-md/1 text-green-700 px-2 py-1"
            onClick={() => addToCartHandler(product._id)}
          >
            <span className="mr-1">👜</span>Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Vegetables;
