// import React from "react";
// import { ClipLoader } from "react-spinners";
// import Fruits from "../Components/Fruits";
// import API from "../server/api";
// //import {useLocation} from 'react-router-dom';
// import { useState, useEffect } from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from "react-spinners";


import Fruits from "../Components/Fruits";
import { useGetFilteredProductsQuery } from '../ApiSlice/ProductApiSlice';

const FruitScreen = () => {
   const location = useLocation();
  
    const ProductData = location.pathname.substring(1); 
   /// console.log(ProductData);

     useEffect(() => {
            window.scrollTo(0, 0);
        }, [location]);
  
    const { data: response, isLoading, isError, error } = useGetFilteredProductsQuery(ProductData );
  
   if (isLoading) return( <div className="flex justify-center m-20">
        <ClipLoader size={100} />
      </div>);
    if (isError) return <p>Error: {error?.error || 'Something went wrong'}</p>;

    const products = response?.data || [];

  return(
    <>
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
       {products.map((product) => (
           <Fruits key={product._id} product={product} />
       ))}
     </div>
     </>
  )

}
 

// const FruitScreen = () => {
//   //    const params = useLocation();
//   //    const name =  params.pathname;

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API("/api/products/Fruits");
//         const fruits = response.data.data;
//          console.log(fruits);
//         setProducts(fruits);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to fetch products");
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center m-20">
//         <ClipLoader size={100} />
//       </div>
//     );
//   if (error) return <div>{error}</div>;
//   if (!products.length) return <div>No products found</div>;

//   return (
//     <>
//       {/* <div className='grid grid-cols-1 p-7'>
//                 <div className='flex flex-col'>
//             <h2 className='font-bold text-xl/1'>Filter Option</h2>
//                <span className='w-auto mt-4 border-b-2'></span>
//                 </div>
//            <div>

//            </div>
//         </div> */}
//       <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
//         {products.map((product) => (
//           <Fruits key={product._id} product={product} />
//         ))}
//       </div>
//     </>
//   );
// };

export default FruitScreen;
