// importing React components
import React, { useState, createContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import ProductDetails from "../Components/ProductDetails";
import { useParams, useLocation } from "react-router-dom";
//import { useSelector} from 'react-redux'

// importing custom components 
import ProductDescription from "../Components/productInformation/ProductDescription.jsx";
import AdditionalInformation from "../Components/productInformation/AdditionalInformation.jsx";
import Rating from "../Components/productInformation/Rating.jsx";
import {useGetProductByIDQuery} from '../ApiSlice/ProductApiSlice.js'

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();


const ProductDetailsScreen = () => {
   const location = useLocation();
  const params = useParams();
  const id = params.id;
  //console.log(id);
  //const [product, setProduct] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description')

  const {data: product, isLoading, isError} = useGetProductByIDQuery(id);
  console.log(product);
  console.log(isLoading);
  console.log(isError);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await API.get(`/api/products/${id}`);
  //       //console.log(response);
  //       const product = response.data.data;
  //       //console.log(product);
  //       setProduct(product);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       console.log(`Error: {error.message}`);
  //     }
  //   };

  //   fetchProducts();
  //   //  if (isNaN(id)) {
  //   //     fetchProducts();
  //   //   } else {
  //   //     setError('Invalid product ID');
  //   //     setLoading(false);
  //   //   }
  // }, [id]);

   useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);

  if (isLoading)
    return (
      <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>
    );
  if (isError) return <div>Unable to fetch data.</div>;

  return (
<>
  <ProductContext.Provider value={{ product, isLoading }}>
   <div className="overflow-x-auto m-6 bg-gray-50/50">
  <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-rows-2 gap-8">
    
    {/* Left Column - Product Details */}
    <div>
      <ProductDetails/>
    </div>

    {/* Right Column - Tabs Section */}
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
        <button
          className={`font-semibold text-base sm:text-lg text-gray-500 px-3 py-2 border-b-2 transition duration-200 ${
            activeTab === "description"
              ? "border-green-700 text-green-700"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`font-semibold text-base sm:text-lg text-gray-500 px-3 py-2 border-b-2 transition duration-200 ${
            activeTab === "additional"
              ? "border-green-700 text-green-700"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("additional")}
        >
          Additional Info
        </button>
        <button
          className={`font-semibold text-base sm:text-lg text-gray-500 px-3 py-2 border-b-2 transition duration-200 ${
            activeTab === "rating"
              ? "border-green-700 text-green-700"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("rating")}
        >
          Rating
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "description" && <ProductDescription />}
        {activeTab === "additional" && <AdditionalInformation />}
        {activeTab === "rating" && <Rating />}
      </div>
    </div>
  </div>
</div>

  </ProductContext.Provider>
</>

  );
};

export default ProductDetailsScreen;
