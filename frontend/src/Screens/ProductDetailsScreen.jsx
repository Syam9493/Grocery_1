import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import ProductDetails from "../Components/ProductDetails";
import API from "../server/api.js";
import { useParams } from "react-router-dom";
//import { useSelector} from 'react-redux'

const ProductDetailsScreen = () => {
  const params = useParams();
  const id = params.id;
  //console.log(id);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(`/api/products/${id}`);
        //console.log(response);
        const product = response.data.data;
        //console.log(product);
        setProduct(product);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(`Error: {error.message}`);
      }
    };

    fetchProducts();
    //  if (isNaN(id)) {
    //     fetchProducts();
    //   } else {
    //     setError('Invalid product ID');
    //     setLoading(false);
    //   }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>
    );
  if (error) return <div>Unable to fetch data.</div>;

  return (
    <div className="grid grid-cols-1 grid-row-2 justify-center sm:grid-cols-2 p-10">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsScreen;
